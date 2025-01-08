import { Box, styled } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Projects from './pages/Projects'
import Resume from './pages/Resume'

const siteMap: SiteMapItem[] = [
  {
    name: 'home',
    route: '/',
    element: Home,
    isIndex: true,
  },
  {
    name: 'resume',
    route: '/resume',
    element: Resume,
    isIndex: false,
  },
  {
    name: 'projects',
    route: '/projects',
    element: Projects,
    isIndex: false,
  },
]

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxWidth: theme.breakpoints.values.md,
  width: '100%',
  flexGrow: 1,
  padding: '0 10px 0 10px',
}))

const LayoutBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  flexDirection: 'column',
  minHeight: '100vh',
  maxWidth: '100vw',
})

function App() {
  return (
    <LayoutBox>
      <BrowserRouter>
        <Header nav={siteMap} />
        <ContentBox>
          <Routes>
            {siteMap.map((page) => (
              <Route
                index={page.isIndex}
                path={page.route}
                element={<page.element />}
                key={page.route}
              />
            ))}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </ContentBox>
        <Footer />
      </BrowserRouter>
    </LayoutBox>
  )
}

export default App

export interface SiteMapItem {
  name: string
  route: string
  element: () => React.JSX.Element
  isIndex: boolean
}
