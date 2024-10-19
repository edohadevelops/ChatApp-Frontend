import React from 'react';
import './style.css';
import GroupsIcon from '@mui/icons-material/Groups';

const Card = ({title,value,scheme}) => {
  return (
    <div className='card'>
      <div className='p-2 bg-gray-100 rounded-full'>
        <div className='p-2 bg-gray-300 rounded-full'>
            <GroupsIcon sx={{fontSize: 40}} />
        </div>
      </div>
      <div>
        <p className='card-title'>{title}</p>
        <p className='card-value'>{value}</p>
      </div>

    </div>
  )
}

export default Card
