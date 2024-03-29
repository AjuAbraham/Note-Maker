import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import "../scss/displaynote.scss"
import axios from '../axios.jsx'
const DisplayNote = () => {
    const {noteId} = useParams();
    const [note,setNote] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchCards = async()=>{
          try {
            const response = await axios.get(`/notes/displayA-note/${noteId}`,{withCredentials:true});
             setNote(response.data.data);
          } catch (error) {
            console.log("error in getting notes is: ",error)
          }
        }
        fetchCards();
      },[]);
  return (
    <>
    <div className='note-container'>
    <h1>{note.title}</h1>
    <div className='button-div'>
    <button onClick={()=>navigate('/notes')}>Back</button>
    </div>
     <p>
        <h2>Content</h2>
        <br/>
        <p className='content'>{note.content}</p>
    </p>
    </div>
    </>
  )
}

export default DisplayNote
