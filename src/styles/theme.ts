import { createTheme, ThemeOptions } from '@mui/material/styles'

const theme: ThemeOptions = {
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '3.5rem',
      margins: 'none'
    },
    h2: {
      fontSize: '1.8rem',
      margins: 'none',
      fontWeight: 'normal'
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
    body2: {
      marginBottom: '1rem',
      fontSize: '1rem'
    }
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
