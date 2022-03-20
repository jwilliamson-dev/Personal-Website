import { createTheme, ThemeOptions } from '@mui/material/styles'

const theme: ThemeOptions = {
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2rem',
      margins: 'none'
    },
    h2: {
      fontSize: '1.8rem',
      margins: 'none'
    },
    h3: {
      fontSize: '1.6rem',
      margins: 'none',
      color: 'InfoText'
    },
    h4: {
      fontSize: '1.4rem',
      margins: 'none',
      color: '#000000'
    },
    h5: {
      fontSize: '1.2rem',
      margins: 'none'
    },
    h6: {
      fontSize: '1rem',
      margins: 'none',
      fontWeight: 'bold'
    },
  },
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
