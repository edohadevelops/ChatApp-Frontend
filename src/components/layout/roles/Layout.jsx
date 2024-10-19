import React,{useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import useGlobalState from '../../../Global/useGlobalState';
import axios from 'axios'

const RoleLayout = () => {
  const {allRoles,setAllRoles} = useGlobalState();
  const token = localStorage.getItem("token")
  const axiosQuery = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  useEffect(()=>{
    const getRoles = async() => {
       try{
        const {data} = await axiosQuery.get("/api/role");
        console.log(data.roles)
        setAllRoles(data.roles)
       }catch(error){
        console.log(error)
       }
    }
    getRoles()
},[])
  return (
    <>
      <Outlet />
    </>
  )
}

export default RoleLayout
