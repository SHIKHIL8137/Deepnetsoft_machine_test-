import './App.css'
import { useState,useEffect } from 'react'
import { Routes,Route  } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'sonner'


function App() {
  return (
    <>
     <Toaster richColors position="top-right" style={{ top: "80px" }}/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
    </Routes>  
    </>
  )
}

export default App
