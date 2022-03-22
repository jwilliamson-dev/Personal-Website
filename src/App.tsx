import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { Grid, Box } from '@mui/material'
import {
  Home,
  About,
  Resume,
  Projects,
  NoPage
} from './pages'
import './styles/utility.css'

function App() {
  return (
    <Box className='App'>
      <Header />
      <Box className='Content'>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='About' element={<About />} />
            <Route path='Resume' element={<Resume />} />
            <Route path='Projects' element={<Projects />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
