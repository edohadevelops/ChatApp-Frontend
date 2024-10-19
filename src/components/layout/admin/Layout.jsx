import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.css'
import Navbar from '../dashboard/Navbar/Navbar';
import NavMenu from '../dashboard/NavMenu/NavMenu';
import useGlobalState from '../../Global/useGlobalState';
import Sidebar from '../dashboard/Sidebar/Sidebar';

const Layout = () => {
    const {showMenu,setShowMenu} = useGlobalState();

    const handleMenu = (e) => {
        if(!e.target.classList.contains("menu")){
        setShowMenu(false)
        }
    }
  return (
    <div className='relative'>
      <Navbar />
      <div className='main-section' onClick={(e)=>handleMenu(e)}>
        <Sidebar />
        <div className='pageView p-5 h-full w-full'>
            {showMenu && <NavMenu /> }
            <div className='p-10 view w-full h-full'><Outlet /></div>
        </div>
        
      </div>
    </div>
  )
}

export default Layout
