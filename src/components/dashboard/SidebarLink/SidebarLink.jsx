import React from 'react';
import './style.css'
import GridViewIcon from '@mui/icons-material/GridView';
import { Link } from 'react-router-dom';

const SidebarLink = ({title,icon,to}) => {
  return (
    <Link to={to} className='link'>
      {icon}
      <p>{title}</p>
    </Link>
  )
}

export default SidebarLink
