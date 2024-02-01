import { useState,useEffect } from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Nav from './Nav.jsx';

const EditNote = () => {
  const [note,setNote] = useState([]);
  const {noteId} = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchCards = async()=>{
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/notes/displayA-note/${noteId}`,{withCredentials:true});
         setNote(response.data.data);
        console.log("response is : ",response);
      } catch (error) {
        console.log("error in getting notes is: ",error)
      }
    }
    fetchCards();
  },[]);
  const handleChange = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setNote({
      ...note,
       [name]:value
    }
    )
  }
  const handleSubmitting = async (e)=>{
       e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/notes/update-note/${noteId}`,note,{withCredentials:true} );
      console.log("res is : ",response);
      navigate('/notes')
    } catch (error) {
      console.log("error at updating note is: ",error)
    }
  }
  return (
    <>
    <div className="container">
    <Nav/>

      <div className="createNoteArea">
      <form autoComplete='off' onSubmit={handleSubmitting}>
        <label htmlFor="title">Title</label>
        <input type="text" placeholder='Enter a unique Title' id='title' name='title' value={note.title} onChange={handleChange}/>
        <label htmlFor="content">Body</label>
        <textarea id='content' placeholder='Enter your content' name='content' value={note.content} onChange={handleChange}/>
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

export default EditNote
