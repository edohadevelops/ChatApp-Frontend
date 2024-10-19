import React,{useEffect,useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import useGlobalState from '../../Global/useGlobalState';
import { notifyError } from '../../utils/notify';

const ProtectedRoute = ({component: Component}) => {
  const {userdetails,setUserDetails} = useGlobalState();
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  // const [userType,setUserType] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const {setIsAdmin} = useGlobalState();
  const token = localStorage.getItem("token");
  const axiosQuery = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
    useEffect(()=>{
      const getUserDetails = async() => {
        try{
          const {data} = await axiosQuery.get(`${process.env.BASE_API_URL}/api/auth/user`);
          console.log(data)
          setUserDetails(data?.user);
          setIsAuthenticated(true);
          setIsAdmin(data?.user?.Role.name === "admin" ? true : false)
          setIsLoading(false)

        }catch(error){
          notifyError(error.response?.data?.message);
          setIsLoading(false);
          console.log(error)
        }
      
        if(token){
          setIsAuthenticated(true)
        }
      }
      getUserDetails()
      
    },[])
    
  return (
    <>
      {
        (isLoading) ?
          <p>Loading.....</p> :
        (isAuthenticated) ?
          <Component />:
        <Navigate to="/login" />
        // isAuthenticated ? <Component /> : !token && <Navigate to="/login" />
      }
    </>
  )
}

export default ProtectedRoute;
