import React, { useState } from 'react'
import { useEffect } from 'react'
import { TbReportSearch } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import '../scss/Note.scss';
import {Link,useNavigate} from 'react-router-dom'
import {MdDelete,MdEditDocument } from "react-icons/md";
import axios from 'axios'
import Nav from './Nav.jsx';


const Notes = () => {
  const [note,setNote] = useState([])
  const [title,setTitle] = useState('');
  const [hide ,setHide] = useState(true);
  const navigate = useNavigate();
  let hideClass = hide? 'hide' : 'form-hideClass';
  const fetchCards = async()=>{
    try {
      const response = await axios.get('http://localhost:8000/api/v1/notes/display-note',{withCredentials:true});
       setNote(typeof response.data.data === 'string' ? [] : response.data.data);
      console.log("response is : ",response);
    } catch (error) {
      console.log("error in getting notes is: ",error)
    }
  }

  const handleDelete= async (noteId)=>{
    if(!noteId){
      console.log("delete button did'nt send noteId")
    }
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/notes/delete-note/${noteId}`,{withCredentials:true});
      console.log("result of delete is: ",response);
      fetchCards();
    } catch (error) {
      console.log("Error while deleting is: ",error);
    }
  }
 const handleSearchChange = (e)=>{
  setTitle(e.target.value)
  if(e.target.value===''){
    fetchCards();
  }
 }
  const handleSearch = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/notes/search-note?titleSearch=${title}`,{withCredentials:true});
      console.log("search res is: ",response);
      setNote(typeof response.data.data==='string'? [] : response.data.data);
    } catch (error) {
      console.log("error at search is : ",error);
    }
  }
  useEffect(()=>{ 
    fetchCards();
  },[]);
  return (
    <>
       <div className="container">
       <Nav/>
       <div className='create-button'>
        <button><Link className='link' to={'/createNote'}>Create Note</Link> </button>
        <div className='search' onClick={()=>setHide(!hide)}><TbReportSearch size={'40px'} /></div>
       </div>
        <div className='search-form'>
         
          <form className={hideClass} onSubmit={handleSearch} >
            <input type="text" placeholder='Enter Title to search' onChange={handleSearchChange}/>
            <button className='document-search' type='submit' ><FaSearch size={'20px'} /></button>
          </form> 
        </div>
        <div className="card-box">
      { 
       note.length===0?<h1 className='empty-note-case'>Create Your Note</h1> :(note.map((note,index)=>(
          <div className="card-Contain"  key={note._id}  >
          <div className="note-count">
              <h4 onClick={()=>navigate(`/currentNote/${note._id}`)}>Note:{index+1}</h4> 
              <div className="note-delete-edit">
              <MdDelete color='red' size={'20px'} onClick={()=>handleDelete(note._id)}/> 
              <Link to={`/editNote/${note._id}`}>
              <span className='toggle-edit-on-hover'>
                <MdEditDocument size={'20px'}color='blue'/>
                </span> 
                </Link>
              </div>         
          </div>
          <p onClick={()=>navigate(`/currentNote/${note._id}`)}>Title: {note.title}</p> 
          <div className="detail-container" onClick={()=>navigate(`/currentNote/${note._id}`)}>
          <hr />
          <p>Created At:{new  Date(note.createdAt).toLocaleString('en-Us',{
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })} </p>
          </div>
          </div> 
        ))
      )}
      </div>


      </div>
    </>
  )
}

export default Notes
