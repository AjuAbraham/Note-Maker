import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import '../scss/NoteForm.scss';
import axios from '../axios.jsx'
import Nav from './Nav.jsx';
import {toast} from 'react-toastify'

const NoteForm = () => {
  const navigate = useNavigate();
  const [note,setNote] = useState({
     title:'',
     content:''
  })
  const handleNoteInfo = (e)=>{
      
      let name = e.target.name;
      let value = e.target.value;
      setNote({
        ...note,
        [name]:value
      })
  }
  const handleNewNote = async (e)=>{
    e.preventDefault();
    console.log(note)
    try {
      const response = await axios.post("/notes/create-note",note,{withCredentials:true} );
      navigate('/notes')
    } catch (error) {
      toast.error(`${error.response.data.message}`)
    }
  }
  return (
    <>
    <div className="container">
    <Nav/>

      <div className="createNoteArea">
      <form autoComplete='off' onSubmit={handleNewNote}>
        <label htmlFor="title">Title</label>
        <input type="text" placeholder='Enter a unique Title' id='title' name='title' onChange={handleNoteInfo}/>
        <label htmlFor="content">Body</label>
        <textarea id='content' placeholder='Enter your content' name='content' onChange={handleNoteInfo}/>
       <div className="button-contain">
       <button type='submit'>Save</button>    
       <button className='cancel-Button'><Link className='linkOfCancel' to={'/notes'}>Cancel</Link></button> 
       </div>
      </form>
      </div>   
    </div>
    </>
  )
}

export default NoteForm
