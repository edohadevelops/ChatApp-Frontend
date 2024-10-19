import React,{useEffect,useRef,useState} from 'react';
import io from 'socket.io-client';
import NoProfile from '../../../assets/ProfileIcon.png'
import Chat from '../../../assets/chat-bg.jpg';
import Message from '../Message/Message';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Placeholder from '../../../assets/chat-group.svg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import useGlobalState from '../../../Global/useGlobalState';
import { notifySuccess } from '../../../utils/notify';
import { sortedConversations } from '../../../utils/sortConvo';

const Messaging = ({messageDetails,setMessageDetails,room,socket,conversations,setConversations,setCount}) => {
  const [messages,setMessages] = useState([]);

  const roomRef = useRef(room);
  const messagesRef = useRef(messages);

  useEffect(() => {
    roomRef.current = room;
    messagesRef.current = messages;
  }, [room,messages]);
  const token = localStorage.getItem("token");
  const {userdetails} = useGlobalState();
  const scrollRef = useRef();
  const axiosQuery = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const updateCoversations = (message) => {
    const convoCopy = [...conversations];
    const indexOfConvo = convoCopy.findIndex((convo)=> convo.roomName === roomRef.current);
    convoCopy[indexOfConvo] = {...convoCopy[indexOfConvo],lastMessage: message};
    const sorted = sortedConversations(convoCopy)
    setConversations(sorted)
  }
  useEffect(()=>{
    const getMessages = async() => {
      try{
        const {data} = await axiosQuery.get(`${process.env.BASE_API_URL}/api/chat/messages/${room && room}`)
        setMessages(data.messages);
        console.log("messages are:",messages)
        console.log(room)
      }catch(error){
        console.log("Error at get messages: ",error)
        console.log("data: ",room)
      }
    }
    getMessages();
  },[room]);
  useEffect(()=>{
    socket.on("newMessage",(message)=>{
      setMessages((prev)=>[...prev,message]);
      updateCoversations(message)
      // if(message.sender_id !== userdetails.id){
      //   notifySuccess(message.message)
      // }
    })
  },[socket])
  useEffect(()=>{
    setMessages([])
  },[room])
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"});
    // console.log(messages)
  },[messages])
  useEffect(()=>{
    const lastMessageFromOtherUser = messages.length > 0 && messages[messages.length - 1].sender_id === messageDetails.id;
    if(lastMessageFromOtherUser){
      socket.emit('markMessagesAsSeen',{
        userId: messageDetails.id,
        roomName: room
      })
    }
    socket.off('messagesSeen');
    socket.on('messagesSeen',({userId,roomName})=>{
      if(roomRef.current === roomName){
        setMessages((prev)=>{
          const updated = prev.map((message)=>{
            if(!message.seen){
              return {...message,seen: true}
            }
              return message;
          });
          return updated;
        })
        setConversations((prev)=>{
          return prev.map(convo => {
            if(convo.roomName === roomName){
              return {...convo,lastMessage: {...convo["lastMessage"],seen: true}}
            }
            return convo;
          })
        })
      }
      

    })
  },[messages,socket,messageDetails,room])

  const [text,setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
        roomName: room,
        senderId: userdetails.id,
        receiverId: messageDetails.id,
        message: text,
    });
    setText("")
  }

  return (
    <>
      {
        !messageDetails.name ?
        <div className='h-full w-full flex flex-col items-center justify-center'>
          <div className='h-[250px] w-[300px] flex items-center justify-center'>
            <img className='w-full h-full' src={Placeholder} alt="message placeholder" />
          </div>
          <p className='font-bold text-[30px] text-[#301530]'>SCHOOL COMMS</p>
          <p>Select a conversation to start messaging</p>

        </div> :
        <div className='h-full bg-chat-pattern'>
          <div className="h-full bg-[#00000010]">
            <div className="message-header h-[70px] px-[10px] bg-[#301530] w-full flex border-b-2">
              <div className='flex flex-[11] gap-2 w-[90%] items-center text-white '>
                  <button onClick={()=>setMessageDetails({})}>
                    <ArrowBackIosIcon />
                  </button>
                  <img className='h-[50px] w-[50px] rounded-full' src={NoProfile} alt="" />
                  <p className=''>{messageDetails.name}</p>
              </div>
              <div className='flex-[1] flex items-center text-white'><MoreVertIcon /></div>
            </div>
            <div className='message-body h-[calc(100%-70px)] w-full'>
              <div className="messages h-[90%] overflow-y-scroll pb-4">
                  {messages.map((message)=>(
                    <div ref={scrollRef}>
                      <Message message={message.message} own={message.sender_id === userdetails.id ? true : false} seen={message?.seen} time={message?.updatedAt} />
                    </div>
                  ))}
              </div>
              <form onSubmit={(e)=>handleSend(e)} className='flex w-full bg-[#301530] text-white h-[10%]'>
                  <input className="p-[10px] outline-none flex-[11] text-wrap text-black" value={text} onChange={(e)=>setText(e.target.value)}/>
                  <button type='submit' className='flex-[1]'><SendIcon /></button>
              </form>
              
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Messaging
