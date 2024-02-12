import React from 'react'
import { useState } from 'react'
import '../scss/Auth.scss'
import axios from '../axios.jsx'
import { Link,useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoImagesOutline } from "react-icons/io5";
const Register = () => {
  const [user,setUser]= useState({
    username:'',
    email:'',
    password:'',
  });
  const [file,setFile] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    if (name === "avatar") {
        setFile(e.target.files[0]); 
    } else {
        setUser({
            ...user,
            [name]: value
        });
    }
  }
 const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("username",user.username)
    formData.append("email",user.email)
    formData.append("password",user.password)
    if(file !== 'null'){
        formData.append("avatar",file)
    }
    try {
        const response = await axios.post('/users/register-user',formData)
         navigate('/login')
    } catch (error) {
        toast.error(`${error.response.data.message}`);
    }
 }
  return (
    <div className="outerContainer">
        <div className="innerContainer">
            <div className="head">
                <h1>Sign Up</h1>
                <p>Let's Get Started 👌</p>
            </div>
            <div className="form-content">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <p>
                        <label htmlFor="username">Name<sup>*</sup></label>
                        <input type="text" name="username" id="username" onChange={handleChange}  placeholder='Enter your name'/>
                    </p>
                    <p>
                        <label htmlFor="email">Email<sup>*</sup></label>
                        <input type="email" name="email" id="email" onChange={handleChange}  placeholder='Enter your email' />
                    </p>
                    <p>
                        <label htmlFor="password">Password<sup>*</sup></label>
                        <input type="password" name="password" id="password" onChange={handleChange}  placeholder='Enter your password' />
                        <label htmlFor="avatar" className='profile-picLabel'>Avatar</label>
                    </p>
                    <p>
                        <div className="image-submit-contain">
                        <div className='internal-image-contain'>
                        <label htmlFor="avatar" className='profile-picButton'><IoImagesOutline size={25} />  Choose Avatar Image</label>
                        <input type="file" id='avatar' onChange={(e)=>setFile(e.target.files[0])} />
                        {
                            (file!==null)? <IoMdCheckmarkCircleOutline color='green' size={30} /> :  null
                        }
                        </div>
                        </div>
                    </p>
                    <p>
                        <button type='submit' id='form-submit'>Create an Account</button>
                    </p>
                </form>
                <p className='already-haveAccount'>Already have a account? <Link className='link' to={'/login'} >LogIn</Link> </p>
            </div>
        </div>
    </div>
  )
}

export default Register
