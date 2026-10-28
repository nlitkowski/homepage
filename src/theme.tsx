import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { setInk } from './components/visuals'

export type Theme = 'light' | 'dark'

const readSaved = (): Theme | null => {
  try {
    const saved = localStorage.getItem('theme')
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

const systemTheme = (): Theme => (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => readSaved() ?? systemTheme())

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    const styles = getComputedStyle(root)
    setInk(styles.getPropertyValue('--ink').trim())
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', styles.getPropertyValue('--bg').trim())
  }, [theme])

  // Follow the OS setting until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => !readSaved() && setTheme(systemTheme())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage unavailable (private mode): the choice just won't persist.
    }
    setTheme(next)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
