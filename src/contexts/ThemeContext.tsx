import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type StyleType = 'industrial' | 'obsidian' | 'signal' | 'ember'

interface ThemeContextValue {
  style: StyleType
  setStyle: (style: StyleType) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'hm-landing-theme'
const VALID_THEMES: StyleType[] = ['industrial', 'obsidian', 'signal', 'ember']

function getInitialTheme(): StyleType {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && VALID_THEMES.includes(saved as StyleType)) {
    return saved as StyleType
  }
  return 'industrial'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState<StyleType>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', style)
    localStorage.setItem(STORAGE_KEY, style)
  }, [style])

  return (
    <ThemeContext.Provider value={{ style, setStyle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
