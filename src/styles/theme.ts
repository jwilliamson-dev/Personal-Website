import { createTheme, ThemeOptions } from '@mui/material/styles'

const theme: ThemeOptions = {
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      marginBottom: '0.5rem'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '500',
      marginBottom: '.5rem'
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: '500',
      marginBottom: '.5rem'
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: '500',
      marginBottom: '.5rem'
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: '500',
      marginBottom: '.5rem'
    },
    h6: {
      fontSize: '1rem',
      fontWeight: '500',
      marginBottom: '.5rem'
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
