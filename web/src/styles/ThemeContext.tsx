import {
  createTheme,
  Theme,
  type ThemeOptions,
  ThemeProvider,
} from '@mui/material/styles'
import { createContext, useMemo, useState } from 'react'

import BlueGreen from './BlueGreen'
import Midnight from './Midnight'
import Rust from './Rust'

const ThemeMap = new Map<ThemeName, ThemeOptions>([
  ['Blue-Green', BlueGreen],
  ['Midnight', Midnight],
  ['Rust', Rust],
])

const getTheme = (themeName: ThemeName = 'Blue-Green') => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('theme', themeName)
  }

  return createTheme(ThemeMap.get(themeName) ?? Rust)
}

const getInitialTheme = (): ThemeName => {
  return (window.localStorage.getItem('theme') as ThemeName | null) ?? 'Rust'
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

const ThemeContextProvider = (props: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>(getInitialTheme())
  const theme = useMemo(() => getTheme(themeName), [themeName])

  return (
    <ThemeContext.Provider value={{ theme, setThemeName, themeName }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContextProvider as default, ThemeContext, ThemeMap }

export type ThemeName = 'Blue-Green' | 'Midnight' | 'Rust'

interface IThemeContext {
  theme: Theme
  setThemeName: React.Dispatch<React.SetStateAction<ThemeName>>
  themeName: ThemeName
}
