import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import {
  Home,
  About,
  Resume,
  Projects,
  NoPage
} from './pages'

function App() {
  return (
    <div className="App">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='About' element={<About />} />
          <Route path='Resume' element={<Resume />} />
          <Route path='Projects' element={<Projects />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  )
}

export default App
