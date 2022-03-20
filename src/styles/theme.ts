import { createTheme } from '@mui/material/styles'

const theme = {
  palette: {
    primary: {
      main: '#1DACD6',
      dark: '#062630',
      light: '#B2D1EE' 
    },
    secondary: {
      main: '#062630'
    },
    info: {
      main: '#4F6577'
    },
    background: {
      default: '#F0FFFF'
    }
  }
}

export default createTheme(theme)
