import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import ProfilePic from '../../../assets/profile.jpg'
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge } from '@mui/material';


const NavMenu = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")

  }
  return (
    <div className="menu">
      <img src={ProfilePic} alt='profile picture' />
      <p>Amen Edoha</p>
      <p>School administrator</p>
      <div className='icons'>
        <div className='icon'>
            <Badge variant="dot" sx={{}}>
                <NotificationsIcon sx={{cursor: "pointer"}} />
            </Badge>
        </div>
        <div className='icon'>
            <SettingsIcon sx={{cursor: "pointer"}} />
        </div>
        <div className='icon' onClick={handleLogout}>
            <LogoutIcon sx={{cursor: "pointer"}} />
        </div>
        
      </div>
      
    </div>
  )
}

export default NavMenu
