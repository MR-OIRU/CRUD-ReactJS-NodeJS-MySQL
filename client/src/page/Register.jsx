import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import FormRegister from '../components/Register/FormRegister'

import axios from 'axios'

import '../assets/css/Register/Register.css'

function Register() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  useEffect(()=>{
    axios.get(`${url}register`).then((res) => {
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
      <div className="customRegister">
        <FormRegister/>
      </div>
    </>
  )
}

export default Register