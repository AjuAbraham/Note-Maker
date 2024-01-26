import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import '../scss/NoteForm.scss';
import axios from 'axios'

const navigate = useNavigate
const NoteForm = () => {
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
      const response = await axios.post("http://localhost:8000/api/v1/notes/create-note",note,{withCredentials:true} );
      console.log("res is : ",response);
      navigate('/notes')
    } catch (error) {
      console.log("error at creating note is: ",error)
    }
  }
  return (
    <>
    <div className="container">
    <div className="nav">
        <div className='logoHead'>
         <h4> Note Maker</h4>
          </div>
        <div className='profile'>
          <img src="/profile.jpg" alt="404" />
        </div>
       </div>

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
