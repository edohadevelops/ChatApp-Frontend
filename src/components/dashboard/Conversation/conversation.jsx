import React,{useState} from 'react'
import NoProfile from '../../../assets/ProfileIcon.png'
import axios from 'axios';
import io from 'socket.io-client';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';




const Conversation = ({name,setMessageDetails,setRoom,id,roomName,socket,active,chat,count,time,lastMessage}) => {
  const formattedTime = new Date(time).toLocaleString([],{hour: 'numeric',minute: '2-digit',hour12: true})
  const token = localStorage.getItem("token");
  const [newCount,setNewCount] = useState(count);
  // const socket = io;

  const axiosQuery = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const handleChat = async() => {
    setMessageDetails({name,id});
    setNewCount(0)
    if(roomName){
      setRoom(roomName);
      socket.emit("joinroom",roomName);
    }else{
      try{
        const {data} = await axiosQuery.post(`${process.env.BASE_API_URL}/api/chat/chatroom`,{receiverId: id})
        setRoom(data.chatroom.name)
        socket.emit("joinroom",data.chatroom.name);
      }catch(error){
        console.log("Error occured in handle chat",error)
      }
    }
  }

  return (
    <div className={`px-4 h-[70px] flex gap-4 items-center cursor-pointer ${active && 'bg-[#e7e7e7]'} hover:bg-[#e7e7e7]`} onClick={()=>handleChat()}>
      <img className='h-[60px] w-[60px] rounded-full' src={NoProfile} alt='no profile image' />
      <div className='flex w-full justify-between'>
        <div>
          <p className='font-semibold text-[17px]'>{name}</p>
          {
            chat &&
            <p className={`text-[14px] ${lastMessage?.sender?.id === id && !lastMessage?.seen ? 'text-gray-800 font-semibold' :'text-gray-600'} flex gap-1`}>
              {
                lastMessage?.sender?.id !== id ?
                <span>
                  { 
                    lastMessage?.seen ?
                    <DoneAllIcon sx={{fontSize: "16px",color: "#00a2ff"}} /> : 
                    <DoneIcon sx={{fontSize: "16px"}} />
                  }
                </span> :
                <span>
                  {name.split(" ")[0]}:
                </span>
              }
              {lastMessage?.message}
            </p>
          }
        </div>
        {
          chat &&
          <div className='flex flex-col items-end'>
            <small>{formattedTime}</small>
            {
              newCount && newCount > 0 ?
              <div className='bg-[#301530] px-2 py-1 rounded-[100%] flex items-center justify-center text-[12px] text-white w-fit'>
                {count}
              </div> :
              ""
            }
          </div>
        }
      </div>
      
    </div>
  )
}

export default Conversation
