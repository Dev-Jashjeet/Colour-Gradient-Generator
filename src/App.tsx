import React from "react"
import './App.css'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router";

function App() {
  return(
    <>
    <NavLink className="NavLink text-blue-400" to="/">Home</NavLink>
    <NavLink className="NavLink" to="/about">About</NavLink>
    <NavLink className="NavLink" to="/contact">Contact</NavLink>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}/>
        <Route path="/about" element={<h1>About</h1>}/>
        <Route path="/contact/agam?" element={<h1>Contact</h1>}/>
        {/* <Route path="/*" element={<h2>Page Not Found <hr /> 4O4 Error</h2>}/> */}
        <Route path="/*" element={<Navigate to="/"/>}/>
        <h5></h5>
      </Routes>
    </>
  )
}

export default App;