import React,{ useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'

import NavigationBar from '../../components/Admin/NavigationBar';
import Dashboard from '../../components/Admin/Dashboard/Dashboard';

import '../../assets/css/Admin/Admin.css'

function Admin() {
    const url = import.meta.env.VITE_API_URL
    const navigate = useNavigate();
    axios.defaults.withCredentials = true

    useEffect(()=>{
        axios.get(`${url}admin`).then((res) => {
          if(res.data.message === 'Role : None'){
            navigate('/')
          }else if(res.data.message === 'Role : User'){
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
       <div className="LayoutAdmin">
        <NavigationBar/>
        <Dashboard/>
       </div>
    </>
  )
}

export default Admin