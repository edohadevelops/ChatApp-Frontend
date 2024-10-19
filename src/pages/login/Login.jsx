import React,{ useState,useEffect} from 'react'
import './style.css';
import Background from '../../assets/chat-group.svg';
import { Link,useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import { notifyError } from '../../utils/notify';
import axios from 'axios';
import useGlobalState from '../../Global/useGlobalState';


const Login = () => {

    const navigate = useNavigate();
    const {userdetails,setUserDetails} = useGlobalState()

    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const [disabled,setDisabled] = useState(true);

    useEffect(()=>{
        if(username !== "" &&  password !== ""){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    },[username,password])

    const handleSubmit = async() => {
        try{
            const {data} = await axios.post(`${process.env.BASE_API_URL}/api/auth/login`,{email: username,password});
            localStorage.setItem("token",data.token);
            console.log(data)
            navigate("/dashboard/home");

        }catch(error){
            notifyError("Oops Internal server error")
            console.log(error)
        }
    }

  return (
    <div className='login-component'>
        <div className='left-component'>
            <div className='img-container'>
                <img src={Background} />
            </div>
            <p className='heading'>School Chat App</p>
            <p className="description">Never miss a deadline by communicating freely with students and teachers</p>
        </div>
        <div className='right-component'>
            <p className='welcome'>Welcome Back!</p>
            <div className='login-fields'>
                <div className='input-group'>
                    <label htmlFor="username">Username or Email address</label>
                    <input type='text' name='username' value={username} placeholder="example@mail.com" onChange={(e)=> setUserName(e.target.value)} />
                </div>
                <div className='input-group'>
                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' value={password} onChange={(e)=> setPassword(e.target.value)} />
                </div>
                <div className='forgot-password'>
                    <Link to='/'>Forgot Password?</Link>
                </div>
                <button className={`login-btn ${disabled && "disabled-btn"}`} disabled={disabled} onClick={()=>handleSubmit()}>Sign in</button>
                <Divider sx={{width: "100%"}}>or</Divider>
                <div className='create-div'>
                    <p>Are you new? <Link>Create new account</Link></p>
                </div>
            </div>
            

        </div>
    </div>
  )
}

export default Login
