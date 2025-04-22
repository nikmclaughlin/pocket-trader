import { useEffect, useState } from 'react'
import { ThemeProviderContext, themes, ThemeType } from './ThemeProviderContext'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ThemeType
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'fire',
  storageKey = 'typed-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(
    () => (localStorage.getItem(storageKey) as ThemeType) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    themes.map((themeClass) => root.classList.remove(themeClass))
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: ThemeType) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
