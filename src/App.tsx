import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box, Grid, styled } from '@mui/material'
import Footer from './components/Footer'
import Header from './components/Header'
import {
  Home,
  About,
  Resume,
  Projects,
  NoPage
} from './pages'

const Main = styled(Box)`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  max-width: 100vw;
`

const Content = styled(Grid)`
  flex-grow: 1;
`

function App() {
  return (
    <Main>
      <Header />
      <Content container mt={2} justifyContent='center' columnSpacing={3} height='100%'>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='About' element={<About />} />
            <Route path='Resume' element={<Resume />} />
            <Route path='Projects' element={<Projects />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </Content>
      <Footer />
    </Main>
  )
}

export default App
