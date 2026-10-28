import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import './styles.css'
import { Cursor, useSmoothScroll } from './components/common'
import { Contact, Disciplines, Education, Experience, Header, Hero, Intro, Marquee, Work } from './components/sections'

function App() {
  useSmoothScroll()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Marquee />
        <Work />
        <Experience />
        <Disciplines />
        <Education />
      </main>
      <Contact />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
