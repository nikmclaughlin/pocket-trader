import { createContext } from 'react'

// as const so ts treats these as literals
export const themes = [
  // 'grass',
  'fire',
  'water',
  'lightning',
  // 'psychic',
  // 'fighting,
  // 'darkness',
  // 'metal',
  // 'dragon',
  // 'colorless',
] as const

export type ThemeType = (typeof themes)[number]

type ThemeProviderState = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const initialState: ThemeProviderState = {
  theme: 'fire',
  setTheme: () => null,
}

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState)
