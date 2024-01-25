import { useState } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Register from './components/Register.jsx'
import '../src/scss/App.scss'
import Login from './components/Login.jsx'
function App() {
 

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
