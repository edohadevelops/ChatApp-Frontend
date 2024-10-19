import React from 'react'
import './style.css'
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const Message = ({own,message,seen,time}) => {
  const formattedTime = new Date(time).toLocaleString([],{hour: 'numeric',minute: '2-digit',hour12: true})
  return (
    <div className={`mt-4 flex ${own && 'justify-end'} w-full`}>
      <div className={`message ${own ? 'message-own': 'message-others'}`}>
        <p className='message-text'>{message}</p>
        <div className="message-status">
          <p className="message-time">{formattedTime}</p>
          {
            
            own && !seen ?
            <DoneIcon sx={{fontSize: "20px"}} /> :
            own &&
            <DoneAllIcon sx={{fontSize: "20px",color: "#00a2ff"}}/>
          }
          
        </div>
      </div>
      
    </div>
  )
}

export default Message
