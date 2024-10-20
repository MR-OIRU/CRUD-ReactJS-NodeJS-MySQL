import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import FormLogin from '../components/Login/FromLogin'

import axios from 'axios'

import '../assets/css/Login/Login.css'

function Login() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  
  useEffect(()=>{
    axios.get(`${url}`).then((res) => {
        if(res.data.message === 'Role : User'){
          navigate('/member')
        }else{
          navigate('/admin')
        }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
  },[]);
  return (
    <>
        <div className="customLogin">
            <FormLogin/>
        </div>
    </>
  )
}

export default Login