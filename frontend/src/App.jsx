import { useState } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Register from './components/Register.jsx'
import '../src/scss/App.scss'
import Login from './components/Login.jsx'
import Notes from './components/Notes.jsx'
import NoteForm from './components/NoteForm.jsx'
import EditNote from './components/EditNote.jsx'
import DisplayNote from './components/DisplayNote.jsx'
import UpdateUserProfile from './components/UpdateUserProfile.jsx'

function App() {
 

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Register/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/notes' element={ <Notes/> }/>
        <Route path='/notes' element={ <Notes/> }/>
        <Route path='/update-profile' element={ <UpdateUserProfile/> }/>
        <Route path='/createNote' element={ <NoteForm/> }/>
        <Route path='/editNote/:noteId' element={ <EditNote/> }/>
        <Route path='/currentNote/:noteId' element={ <DisplayNote/> }/>
      </Routes>
    </Router>
  )
}

export default App
