import React,{ useEffect, useState } from 'react'
import Modal from '../../../../components/dashboard/modal/Modal'
import './style.css'
import Card from '../../../../components/dashboard/Card/Card'
import useGlobalState from '../../../../Global/useGlobalState';
import axios from 'axios';
import { notifyError } from '../../../../utils/notify';

const Home = () => {
  const {userdetails,isAdmin} = useGlobalState();
  const [isOpen,setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [numbers,setNumbers] = useState({});
  const axiosQuery = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  useEffect(()=>{
    const getUsers = async() =>{
      try{
        const {data} = await axiosQuery.get("/api/users/all-users");
        console.log(data)
        setNumbers(data.roleCounts)
      }catch(error){
        console.log(error)
      }
    }
    getUsers()
  },[])
  const {roles,admins,staffs,students} = useGlobalState();
  return (
    <div className='home'>
      <p className='greeting'>Hey there, <span className='capitalize'>{userdetails?.name}</span>!</p>
      <p className='page'>Dashboard</p>

      {
        isAdmin &&
        <div className='card-container'>
          <Card title="Admins" value={numbers?.admin} />
          <Card title="Teachers" value={numbers?.teacher} />
          <Card title="Students" value={numbers?.student} />
        </div>
      }
      {/* <button onClick={()=> {
        setIsOpen(true)

      }}>Show modal</button>
      {
        isOpen &&
        <Modal size="md" isOpen={isOpen} setIsOpen={setIsOpen}>

        </Modal>
      } */}

    </div> 
  )
}

export default Home
