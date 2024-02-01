import React, { useEffect, useState } from 'react'
import '../scss/Nav.scss'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';


const Nav = () => {
  const navigate = useNavigate();
  const [hidden,setHidden] = useState(true);
  const username = useSelector((state)=> state.nav.username);
  const avatar = useSelector((state)=>state.nav.avatar);
  let classWillBe = hidden? 'isActive' : 'singout-button'; 

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify({username,avatar}));
  },[]);
  const handleLogOut = async ()=>{
    try {
     const res = await axios.get("http://localhost:8000/api/v1/users/logout",{withCredentials:true});
     navigate('/login')
     console.log("response on logout is: ",res.data.message);
    } catch (error) {
     console.log("Error at logout is: ",error);
    }
}
 const userDetail = JSON.parse(localStorage.getItem("user"));
  return (
   <>
     <div className="nav">
    <div className='logoHead'>
     <h4> {userDetail.username}</h4>
      </div>
    <div className='profile'>
      <img src={userDetail.avatar} alt="404"  onClick={()=>setHidden(!hidden)} />
    </div>
   </div>
   <div className='sign-out-container'>
    <button className={classWillBe} onClick={handleLogOut}>Log Out</button>
  </div> 
   </>
   
  )
}

export default Nav
