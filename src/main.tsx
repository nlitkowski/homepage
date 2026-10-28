import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/fira-code'
import './styles.css'
import './i18n'
import { Cursor, useSmoothScroll } from './components/common'
import { ThemeProvider } from './theme'
import { Contact, Education, Experience, Header, Hero, Intro, Marquee, Stack, Work } from './components/sections'

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
        <Stack />
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
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
