import React from 'react'
import { useEffect } from 'react'
import { TbReportSearch } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import '../scss/Note.scss';
import {Link} from 'react-router-dom'
const Notes = () => {
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
        <div className='search'><TbReportSearch size={'40px'} /></div>
       </div>
        <div className='search-form'>
          <form>
            <input type="text" placeholder='Enter Title to search'/>
            <div className='document-search'><FaSearch size={'20px'} /></div>
          </form>
        </div>

       </div>

    </>
  )
}

export default Notes
