import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type StyleType = 'industrial' | 'signal' | 'filtered'

interface ThemeContextValue {
  style: StyleType
  setStyle: (style: StyleType) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getThemeFromURL(): StyleType {
  const path = window.location.pathname
  if (path === '/signal') return 'signal'
  if (path === '/filtered') return 'filtered'
  return 'industrial'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState<StyleType>(getThemeFromURL)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', style)
  }, [style])

  // Listen for URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      setStyle(getThemeFromURL())
    }
    
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

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
