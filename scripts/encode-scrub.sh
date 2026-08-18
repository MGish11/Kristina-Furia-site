#!/usr/bin/env bash
# Turn a Higgsfield render into a scrubbable web asset.
#
#   ./scripts/encode-scrub.sh media/breathe-source.mp4
#
# Writes public/breathe.mp4 (all-intra) and public/breathe-poster.jpg.
#
# The -g 1 -keyint_min 1 -sc_threshold 0 trio is the whole point: it
# makes every frame a keyframe so the player can seek anywhere. Without
# it the browser snaps to the nearest keyframe (~2s apart) and scrubbing
# reads as a stutter rather than motion.
set -euo pipefail

SRC="${1:-media/breathe-source.mp4}"
OUT_DIR="public"
WIDTH="${WIDTH:-1920}"   # Full 1080p. 720p was visibly soft full-bleed —
                         # this is a foreground element, not a texture.
CRF="${CRF:-23}"         # 1080p: 20 → 8.4MB, 23 → 5.5MB. 23 is the knee
                         # for smooth ink gradients before banding shows
                         # in the falloff.
FPS="${FPS:-24}"

# Colour grade, measured rather than eyeballed, against the 4K source.
# That render already lands the ink in the muted forest register (the
# palette went into the prompt this time), so unlike the first 1080p
# roll this needs almost no desaturation — 0.60 would flatten it.
# What it does need is a lift: the raw ground reads #D8CDB5.
#
#   brightness +0.11  ground -> #F2E9DA against a --cream target of
#                     #F1E8DC, and lifts the ink core to #2C362F
#   saturation  0.85  a light touch only; the ink is already on-palette
#   colorbalance      this source runs BLUE-deficient where the 1080p one
#                     ran blue-heavy, so bh is positive here. Do not copy
#                     a grade between sources without re-measuring.
#
# Re-measure with a 1x1 scale crop if you change the source.
GRADE="eq=brightness=0.11:saturation=0.85,colorbalance=rh=0.01:bh=0.05"

[ -f "$SRC" ] || { echo "no source at $SRC" >&2; exit 1; }
mkdir -p "$OUT_DIR"

ffmpeg -y -i "$SRC" \
  -an \
  -vf "scale=${WIDTH}:-2:flags=lanczos,fps=${FPS},${GRADE}" \
  -c:v libx264 -preset slow -crf "$CRF" \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart \
  "$OUT_DIR/breathe.mp4"

# Poster is the reduced-motion and pre-load frame. Pulled from ~15% in,
# where the ink has shape but has not filled the frame yet.
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
POSTER_AT=$(awk "BEGIN { printf \"%.2f\", $DUR * 0.15 }")

# -update 1 tells the image2 muxer this is a single file, not a numbered
# sequence. Without it ffmpeg warns and only works by accident.
ffmpeg -y -ss "$POSTER_AT" -i "$SRC" -frames:v 1 -update 1 \
  -vf "scale=${WIDTH}:-2:flags=lanczos,${GRADE}" -q:v 4 \
  "$OUT_DIR/breathe-poster.jpg"

# Mobile variant. A phone decoder seeking 1080p all-intra falls behind
# and the scrub stutters; 720p roughly halves the per-frame decode cost.
# Same all-intra flags — without them this file is useless too.
ffmpeg -y -i "$SRC"   -an   -vf "scale=1280:-2:flags=lanczos,fps=${FPS},${GRADE}"   -c:v libx264 -preset slow -crf "$CRF"   -g 1 -keyint_min 1 -sc_threshold 0   -pix_fmt yuv420p -movflags +faststart   "$OUT_DIR/breathe-mobile.mp4"

echo
echo "wrote:"
ls -lh "$OUT_DIR/breathe.mp4" "$OUT_DIR/breathe-mobile.mp4" "$OUT_DIR/breathe-poster.jpg"
echo
echo "keyframe check (want every frame flagged K):"
for f in "$OUT_DIR/breathe.mp4" "$OUT_DIR/breathe-mobile.mp4"; do
  keys=$(ffprobe -v error -select_streams v -show_entries frame=key_frame     -of csv=p=0 "$f" | tr -d ',' | grep -c '^1$')
  total=$(ffprobe -v error -select_streams v -count_frames     -show_entries stream=nb_read_frames -of csv=p=0 "$f")
  echo "  $(basename "$f"): $keys/$total keyframes"
  [ "$keys" = "$total" ] || echo "  !! NOT all-intra - scrubbing will stutter"
done
