import { useState } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Register from './components/Register.jsx'
import '../src/scss/App.scss'
import Login from './components/Login.jsx'
import Notes from './components/Notes.jsx'
import NoteForm from './components/NoteForm.jsx'
function App() {
 

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/notes' element={ <Notes/> }/>
        <Route path='/createNote' element={ <NoteForm/> }/>
      </Routes>
    </Router>
  )
}

export default App
