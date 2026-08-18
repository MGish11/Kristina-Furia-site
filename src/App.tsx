import { ScrollController } from './scroll/ScrollController'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Statement } from './sections/Statement'
import { Breathe } from './sections/Breathe'
import { Approach } from './sections/Approach'
import { Work } from './sections/Work'
import { Course } from './sections/Course'
import { Podcast } from './sections/Podcast'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import './styles/sections.css'

export default function App() {
  return (
    <>
      <ScrollController />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Breathe />
        <Approach />
        <Work />
        <Course />
        <Podcast />
        <About />
      </main>
      <Contact />
    </>
  )
}
