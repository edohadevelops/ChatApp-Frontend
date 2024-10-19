import React,{useEffect} from 'react';
import './style.css'
import useGlobalState from '../../../Global/useGlobalState';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ProfilePic from '../../../assets/profile.jpg'

const Navbar = () => {

  const {showMenu,setShowMenu} = useGlobalState();

  return (
    <div className='navbar'>
      <div className='logo'>
        <p>SCHOOL CHAT</p>
        <MenuIcon sx={{color: "white"}} />
      </div>
      <div>
        <div className="profile" onClick={()=>setShowMenu(!showMenu)}>
          <img src={ProfilePic} alt="profile picture" />
          {
            !showMenu ? 
            <KeyboardArrowDownIcon /> :
            <KeyboardArrowUpIcon />
          }
        </div>
        

      </div>
    </div>
  )
}

export default Navbar
