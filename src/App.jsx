import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
     <Outlet /> {/* Renderiza as rotas filhas */}
    </>
  )
}

export default App
