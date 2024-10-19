import React, { useState,useEffect } from 'react';
import Conversation from '../../../../components/dashboard/Conversation/conversation'
import Messaging from '../../../../components/dashboard/Messaging/Messaging';
import { sortedConversations } from '../../../../utils/sortConvo';
import axios from 'axios'
import useGlobalState from '../../../../Global/useGlobalState';
import {io} from 'socket.io-client'


const Messages = () => {
  const {allUsers,setAllUsers} = useGlobalState();

  const socket = io.connect(`${process.env.BASE_API_URL}`)

  const [messageDetails,setMessageDetails] = useState({});
  const [query,setQuery] = useState("");
  const token = localStorage.getItem("token");
  const [conversations,setConversations] = useState([]);
  const [room,setRoom] = useState("");
  const [usersFilter,setUsersFilter] = useState([...allUsers]);
  const [messageFilter,setMessageFilter] = useState([]);
  const [count,setCount] = useState(null)


  const axiosQuery = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  useEffect(()=>{
    const getAllUsers = async() => {
      try{
        const {data} = await axiosQuery.get(`${process.env.BASE_API_URL}/api/users/all-users`);
        setAllUsers(data.users);
        console.log(data.users)
      }catch(error){
        console.log(error)
      }
    }
    const getAllChatRooms = async () => {
      try{
        const {data} = await axiosQuery.get(`${process.env.BASE_API_URL}/api/chat/user-chatrooms`);
        const filtered = data.userChatrooms.filter((convo)=>convo.lastMessage)
        const sorted = sortedConversations(filtered);
        setConversations(sorted);
        console.log("Chatrooms is: ",sorted)
      }catch(error){
        console.log(error)
      }
    }
    getAllChatRooms();
    getAllUsers();
  },[]);

  useEffect(()=>{
    if(query !== ""){
      const messageSearch = "";
      const usersSearch = allUsers.filter((user)=>{
        if(user.name.toLowerCase().includes(query.toLowerCase()) || user.username.toLowerCase().includes(query.toLowerCase())){
          return user;
        }
      });
      setUsersFilter(usersSearch)
    }
    

  },[query]);


  return (
    <div className='flex h-full'>
      <div className="conversations-container flex-[5] bg-white">
        <div className='p-4'>
          <p className='mb-4 font-semibold text-[22px]'>Chats</p>
          <input className='w-full rounded-[30px] outline-none bg-[whitesmoke] h-[40px] px-[15px]' placeholder="Search users" value={query} onChange={(e)=>setQuery(e.target.value)} />
        </div>
        {
          (conversations.length === 0  && query === "") ?
          <div className="flex h-[75%] w-full justify-center items-center">
            <p className='w-[80%] text-center'>You have no messages yet, Search for a user to start messaging</p>
          </div> :
          (conversations.length > 0  && query === "") ?
          <>
            <div className="chat-list h-[70%] overflow-y-scroll">
              {
                conversations.map((convo)=>(
                  <Conversation name={convo.user.name} roomName={convo.roomName} id={convo.user.id} setMessageDetails={setMessageDetails} setRoom={setRoom} socket={socket} active={room === convo.roomName ? true : false} chat={true} count={count ? count : convo.unseenCount} time={convo.lastMessage?.updatedAt} lastMessage={convo.lastMessage}/>
                ))
              }
            </div>
          </> :
          <>
            <div className="chat-list h-[70%] overflow-y-scroll">
              <p className='px-4 text-lg font-semibold mb-2'>Users</p>
              {
                usersFilter.map((user)=>(
                  <Conversation id={user.id} name={user.name} setMessageDetails={setMessageDetails} setRoom={setRoom} socket={socket}/>
                ))
              }
            </div>
          </>
        }
      </div>
      <div className="message-display  flex-[7] h-full">
          <Messaging messageDetails={messageDetails} setMessageDetails={setMessageDetails} room={room} socket={socket} conversations={conversations} setConversations={setConversations} setCount={setCount}/>
      </div>
    </div>
  )
}

export default Messages
