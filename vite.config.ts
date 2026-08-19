import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  /* Project Pages site is served from /Kristina-Furia-site/, not the domain
     root, so every emitted asset URL has to carry that prefix. */
  base: '/Kristina-Furia-site/',
  plugins: [react()],
})
