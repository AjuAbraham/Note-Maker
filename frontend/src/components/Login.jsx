import  { useState } from 'react'
import '../scss/Auth.scss'
import { Link,useNavigate} from 'react-router-dom'
import axios from '../axios.jsx'
import {  toast } from 'react-toastify';
const Login = () => {
    const [user ,setUser] = useState({
        email:'',
        password:''
    })
    const [hidden, setHidden] = useState(true);
    const navigate = useNavigate();
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
        setHidden(!hidden);
        try {
            const response = await axios.post('/users/log-in',user,{withCredentials:true});
            const {username,avatar} = response.data.data.user;
            localStorage.setItem("username",username);
            localStorage.setItem("avatar",avatar);
            navigate("/notes")
        } catch (error) {
            toast.error(`${error.response.data.message}`);
        }
    }
    let hiddenClass = hidden===true ? 'loader--hidden': 'loader'
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
                        <button type='submit'  id='submitted'>Log In</button>
                    </p>
                </form>
                <p className='already-haveAccount'>Don't have account? <Link className='link' to={'/register'}>Register</Link></p>
            </div>
            <div className={hiddenClass}></div>
        </div>
    </div>
    </div>
  )
}

export  default Login
