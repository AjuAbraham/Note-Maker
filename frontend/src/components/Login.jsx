import React, { useState } from 'react'
import '../scss/Auth.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const [user ,setUser] = useState({
        email:'',
        password:''
    })
    const handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/log-in',user);
            console.log(response);
            if(response){

            }
        } catch (error) {
            console.log("login error: ",error);
        }
    }
  return (
    <div>
       <div className="outerContainer">
        <div className="innerContainer">
            <div className="head">
                <h1>Log In</h1>
                <p>You Know The Drill 🤷‍♂️</p>
            </div>
            <div className="form-content">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <p>
                        <label htmlFor="email">Email<sup>*</sup></label>
                        <input type="email" name="email" id="email" onChange={handleChange}  placeholder='Enter your email' />
                    </p>
                    <p>
                        <label htmlFor="password">Password<sup>*</sup></label>
                        <input type="password" name="password" id="password" onChange={handleChange}  placeholder='Enter your password' />
                    </p>
                    <p>
                        <button type='submit'  id='submitted'>Login In</button>
                    </p>
                </form>
                <p className='already-haveAccount'>Don't have account? <Link className='link' to={'/register'}>Register</Link></p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login
