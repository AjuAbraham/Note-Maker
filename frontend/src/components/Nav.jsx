import React from 'react'
import '../scss/Note.scss'
import { useParams } from 'react-router-dom'
const Nav = () => {
    const {username,avatar} = useParams();
  return (
    <div className="nav">
    <div className='logoHead'>
     <h4> {username}</h4>
      </div>
    <div className='profile' onClick={()=>setsignOut(!signout)}>
      <img src={avatar} alt="404" />
    </div>
   </div>
  )
}

export default Nav
