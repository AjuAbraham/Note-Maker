import React, { useEffect, useState } from 'react'
import '../scss/Nav.scss'
import { CgProfile } from "react-icons/cg";
import { MdOutlineFollowTheSigns } from "react-icons/md";
import axios from '../axios.jsx'
import {useNavigate} from 'react-router-dom';
import { FaUser } from "react-icons/fa";


const Nav = () => {
  const navigate = useNavigate();
  const [hidden,setHidden] = useState(true);
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  let classWillBe = hidden? 'info-container' : 'info-container open'; 

  const handleLogOut = async ()=>{
    try {
     const res = await axios.get("/users/logout",{withCredentials:true});
     localStorage.removeItem("username");
     localStorage.removeItem("avatar");
     navigate('/login')
    } catch (error) {
     console.log("Error at logout is: ",error);
    }
}
  return (
   <>
     <div className="nav">
    <div className='logoHead'>
     <h4> Note Maker</h4>
      </div>
    <div className='profile'>
      {avatar===''?<FaUser onClick={()=>setHidden(!hidden)} size={30} color='white'/> : <img  src={avatar} alt="404"  onClick={()=>setHidden(!hidden)} />}
    </div>
    <div className={classWillBe}>
      <div className="sub-menu">
        <div className="user-info">
        {avatar===''?<FaUser size={30} color='black'/> : <img  src={avatar} className='sub-img' alt="404" />}
          <h3>{username}</h3>
        </div>
        <hr />
        <div className='update-profile'>
            <CgProfile  size={30} color='blue'/>
            <p onClick={()=>navigate('/update-profile')}>Edit Profile</p>
            <span>{'>'}</span>
        </div>
        <div className='update-profile'>
        <MdOutlineFollowTheSigns size={30} color='red'/>
        <p onClick={handleLogOut}>Log Out</p>
        <span>{'>'}</span>
        </div>
      </div>
  </div> 
   </div>
   </>
   
  )
}

export default Nav
