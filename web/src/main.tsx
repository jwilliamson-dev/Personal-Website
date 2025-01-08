import { CssBaseline } from '@mui/material'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import App from './App'
import SiteContextProvider from './content/SiteContext'
import ThemeContextProvider from './styles/ThemeContext'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <SiteContextProvider>
        <CssBaseline />
        <App />
      </SiteContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
)
