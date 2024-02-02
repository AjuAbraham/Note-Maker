import React, { useState } from 'react'
import '../scss/updateProfile.scss';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState('');
  const [file,setFile] = useState(null)
  const handleSubmit = async (e)=>{
      e.preventDefault();
      const formdata = new FormData();
      if(user!=''){
      formdata.append("username",user);
      }
      if(file!=null){
        formdata.append("avatar",file);

      }
     try {
      const response = await axios.patch("http://localhost:8000/api/v1/users/update-detail",formdata,{withCredentials:true});
      console.log("updated info is:",response.data);
      localStorage.setItem("username",response.data.data.username);
      localStorage.setItem("avatar",response.data.data.avatar);
      navigate('/notes');
     } catch (error) {
        console.log("error is: ",error);
     }
  }
  return (
    <div className='containers'>
      <div className="form-detail">
      <div className='title'>
        <h1>Edit Profile</h1>
        </div>
      <div className='form-container'>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <label htmlFor="newUsername" className='new-detail'>Username</label>
        <input type="text" id='newUsername' className='usernameInput' placeholder='Enter new Username' onChange={(e)=>setUser(e.target.value)}/>
        <label htmlFor="newAvatar" className='newAvatar new-detail'>New Avatar</label>
        <input type="file"  id='newAvatar' onChange={(e)=>setFile(e.target.files[0])}/>
        <div className='buttons'>
        <button className='submit-button' type='submit'>Submit</button>
        <button type='button' className='cancel-button' onClick={()=>navigate('/notes')}>Cancel</button>
        </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default UpdateUserProfile
