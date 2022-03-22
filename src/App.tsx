import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { Box, styled } from '@mui/material'
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
  text-align: center;
`

const Content = styled(Box)`
  flex-grow: 1;
`

function App() {
  return (
    <Main>
      <Header />
      <Content>
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
