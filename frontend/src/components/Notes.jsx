import React, { useState } from 'react'
import { useEffect } from 'react'
import { TbReportSearch } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import '../scss/Note.scss';
import {Link,useNavigate,useParams} from 'react-router-dom'
import {MdDelete,MdEditDocument } from "react-icons/md";
import axios from 'axios'


const Notes = () => {
  const [note,setNote] = useState([])
  const [hide ,setHide] = useState(false);
  const [signout,setsignOut] = useState(false);
  const navigate = useNavigate();
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
  const handleLogOut = async ()=>{
       try {
        const res = await axios.get("http://localhost:8000/api/v1/users/logout",{withCredentials:true});
        navigate('/login')
        console.log("response on logout is: ",res.data.message);
       } catch (error) {
        console.log("Error at logout is: ",error);
       }
  }
  const {username,avatar} = useParams();
  useEffect(()=>{
    
    fetchCards();
  },[]);
  return (
    <>
       <div className="container">
       <div className="nav">
        <div className='logoHead'>
         <h4> {username}</h4>
          </div>
        <div className='profile' onClick={()=>setsignOut(!signout)}>
          <img src={avatar} alt="404" />
        </div>
       </div>
       <div className='create-button'>
        <button><Link className='link' to={'/createNote'}>Create Note</Link> </button>
        <div className='search' onClick={()=>setHide(!hide)}><TbReportSearch size={'40px'} /></div>
       </div>
        <div className='search-form'>
          { hide?
          <form>
            <input type="text" placeholder='Enter Title to search'/>
            <div className='document-search'><FaSearch size={'20px'} /></div>
          </form>  : null
           }
        </div>
        <div className='drop-box'>
         {
          signout?  <button onClick={handleLogOut}>Sign out</button> : null
          
         }
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
          <h4 onClick={()=>navigate(`/currentNote/${note._id}`)}>Title:{note.title}</h4> 
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
