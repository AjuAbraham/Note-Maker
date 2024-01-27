import React, { useState } from 'react'
import { useEffect } from 'react'
import { TbReportSearch } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import '../scss/Note.scss';
import {Link} from 'react-router-dom'
import {MdDelete,MdEditDocument } from "react-icons/md";
import axios from 'axios'


const Notes = () => {
  const [note,setNote] = useState([])
  const [hide ,setHide] = useState(false);
  useEffect(()=>{
    const fetchCards = async()=>{
      try {
        const response = await axios.get('http://localhost:8000/api/v1/notes/display-note',{withCredentials:true});
         setNote(response.data.data);
        console.log("response is : ",response);
      } catch (error) {
        console.log("error in getting notes is: ",error)
      }
    }
    fetchCards();
  },[]);
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
        <div className="card-box">
      {
        note.map((note,index)=>(

          <div className="card-Contain"  key={note._id}>
          <div className="note-count">
              <h4>Note:{index+1}</h4> 
              <div className="note-delete-edit">
              <MdDelete color='red' size={'20px'} /> 
              <Link to={`/editNote/${note._id}`}>
              <span className='toggle-edit-on-hover'>
                <MdEditDocument size={'20px'}color='blue'/>
                </span> 
                </Link>
              </div>         
          </div>
          <p><h4>Title:</h4> {note.title}</p>
          <div className="detail-container">
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
      }
      </div>
      </div>
    </>
  )
}

export default Notes
