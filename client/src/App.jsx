import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Auth from './pages/Auth'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home />}/>
      <Route path='/sign-in' element = {<SignIn />}/>
      <Route path='/sign-up' element = {<SignUp />}/>
      <Route path='/about' element = {<About />}/>
      <Route path='/auth' element = {<Auth />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
