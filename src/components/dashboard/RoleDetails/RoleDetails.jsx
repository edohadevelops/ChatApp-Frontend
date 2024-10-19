import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import useGlobalState from '../../../Global/useGlobalState';
import Table from '../Table/Table';
import { HiPencil } from 'react-icons/hi';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Modal from '../modal/Modal';
import InputGroup from '../../fields/input/Input';
import { notifyError, notifySuccess } from '../../../utils/notify';
import axios from 'axios'
import { useParams } from 'react-router-dom';

const RoleDetails = () => {

  const {currentRoleList,setCurrentRoleList,allRoles} = useGlobalState();
  const columns = ["Name","Username","Email Address"];
  const {roleName} = useParams();
  const [modalOpen,setModalOpen] = useState(false)
  const [actionType,setActionType] = useState("Add");
  const [individualId,setIndividualId] = useState(null);
  const token = localStorage.getItem("token")
  const axiosQuery = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const [formDetails,setFormDetails] = useState({
    Name: "",
    Username: "",
    Phone_Number: "",
    "Email Address": ""
  });

  useEffect(()=>{
    const getRoleList = async() => {
      try{
        const {data} = await axiosQuery.get(`/api/users/${roleName}`);
        const roleList = data.users?.map((teacher)=>{
          return {
            Name: teacher.name,
            "Email Address": teacher.email,
            Username: teacher.username,
            id: teacher.id
          }
        })
        setCurrentRoleList(roleList);
        console.log(data)
      }catch(error){
        notifyError(error.data.response.message);
      }
    }
    getRoleList()
  },[])


  
  const handleAddModal = () => {
    setFormDetails({})
    setModalOpen(true);
    setActionType("Add")
  }
  const handleEdit = async() => {
    const indexOfIndividual = currentRoleList.findIndex(individual => individual.id === individualId);
    if(indexOfIndividual >= 0){
      try{
        const {data} = await axiosQuery.patch(`/api/users/update-user/${individualId}`,{name: formDetails.Name,email: formDetails["Email Address"],role: roleName});
        console.log("The data gotten is: ",data)
        const listUpdate = [...currentRoleList];
        listUpdate[indexOfIndividual] = formDetails;
        setCurrentRoleList(listUpdate);
        setModalOpen(false);
        notifySuccess("Updated field successfully")
      }catch(error){
        notifyError(error?.response?.data?.message);
        console.log(error)
      }
    };
    
  }
  const handleDelete = async() => {
    try{
      const data = await axiosQuery.delete(`/api/users/delete-user/${individualId}`)
      const newRoleList = currentRoleList.filter((person)=> person.id !== individualId);
      setCurrentRoleList(newRoleList);
      setModalOpen(false);
      notifySuccess("Deleted field successfully")
    }catch(error){
      notifyError(error.response.data.message)
    }
  }
  const handleClose = () => {
    setModalOpen(false)
    setIndividualId(null)
  }


  const handleAdd = async() => {
    try{
      const {data} = await axiosQuery.post("/api/users/register",{name: formDetails.Name,username: formDetails.Username,email:formDetails["Email Address"],password: "solz123",role_name: roleName})
      console.log(data)
      setCurrentRoleList((prevList)=>([...prevList,formDetails]));
      setModalOpen(false)
      setFormDetails({});
      notifySuccess(`Added ${roleName} successfully`)
    }catch(error){
      notifyError(error.response.data.message)
    }
  }

  const handleEditModal = (id) => {
    const selectedPerson = currentRoleList.find(person => person.id === id);
    console.log("The initial id is",id)
    if(selectedPerson){
      setFormDetails(selectedPerson);
      setIndividualId(id);
      console.log("Id at the point of modal is:",id)
      setModalOpen(true)
      setActionType("Edit")
    }
  }

  const handleDeleteModal = (id) => {
    setIndividualId(id)
    setModalOpen(true)
    setActionType("Delete")
  }


  const menus = [
    {item: `Edit ${roleName}`,icon: <HiPencil fontSize={20} />,onClick: handleEditModal},
    {item: `Delete ${roleName}`,icon: <DeleteForeverIcon />,onClick: handleDeleteModal},
  ];
  
  const handleInput = (e) => {
    const {name,value} = e.target;
    setFormDetails((prevDetails)=>(
      {...prevDetails,[name]: value}
    ))
  };

  const [modalBtnDiabled,setModalBtnDisabled] = useState(true);

  useEffect(()=>{
    if(formDetails.Name !== "" && formDetails.Username !== "" && formDetails.Phone_Number !== "" && formDetails.Email_Address !== ""){
      setModalBtnDisabled(false)
    }else{
      setModalBtnDisabled(true)
    }
  },[formDetails])


  return (
    <div className='flex flex-col gap-[30px]'>
      <p className='font-semibold text-lg capitalize'>{`${roleName}`} Overview</p>
        <div className='flex gap-[20px] items-end'>
            <Card title={`Total ${roleName}`} value={currentRoleList?.length}/>
            <div className='flex gap-4 w-full h-fit justify-end'>
                <div className='p-4 bg-white'>Search Filter</div>
                <button className='add-btn capitalize' onClick={handleAddModal}>Add {`${roleName}`}</button>
            </div>
        </div>
        
        <div>
          <Table columns={columns} rows={currentRoleList} menus={menus} />
        </div>
        { modalOpen &&
          <Modal
          title={`${actionType} ${roleName}`}
           description={
            actionType === "Add" ? "All fields are required*" :
            actionType === "Edit" ? "Edit the fields you wish to change" : 
            ""} 
           btnAcceptText={actionType} 
           btnCloseText="Close" 
           modalSize="lg" 
           btnColor={actionType === "Delete" ? "#bd0a0a" : "#160716"} 
           onClose={handleClose} 
           dismissible={true} 
           onAccept={
                actionType === "Add" ? handleAdd :
                actionType === "Edit" ? handleEdit :
                handleDelete
            }
           btnDisabled={actionType !== "Delete" && modalBtnDiabled}
           >
              
              {
                actionType === "Delete" ?
                <p>Are you sure you wish to delete <span className='font-semibold'>{currentRoleList?.find(person => person.id === individualId)?.Name}</span> from the database?</p> :
                <div className='flex justify-between gap-2 flex-wrap'>
                  <InputGroup labelText={"Full Name"} width="full">
                    <input className="input-field" name='Name' value={formDetails.Name} onChange={(e)=>handleInput(e)} />
                  </InputGroup>
                  <InputGroup labelText={"Username"}>
                    <input className="input-field" name='Username' value={formDetails.Username} onChange={(e)=>handleInput(e)} />
                  </InputGroup>
                  <InputGroup labelText={"Email Address"}>
                    <input className="input-field" name='Email Address' value={formDetails["Email Address"]} onChange={(e)=>handleInput(e)} />
                  </InputGroup>
                </div>
              }

          </Modal>
        }


    </div>
  )
}

export default RoleDetails
