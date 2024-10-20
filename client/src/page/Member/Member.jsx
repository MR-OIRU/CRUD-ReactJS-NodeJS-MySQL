import React,{ useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'

function Member() {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  axios.defaults.withCredentials = true

  useEffect(()=>{
    axios.get(`${url}member`).then((res) => {
      if(res.data.message === 'Role : None'){
        navigate('/')
      }else if(res.data.message === 'Role : Admin'){
        navigate('/admin')
      }else{
        navigate('/member')
      }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
  },[]);
  return (
    <>
      Member
    </>
  )
}

export default Member