import React, { useEffect, useState } from 'react'
import Card from '../../../../components/dashboard/Card/Card'
import useGlobalState from '../../../../Global/useGlobalState';
import Table from '../../../../components/dashboard/Table/Table';
import { HiPencil } from 'react-icons/hi';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Modal from '../../../../components/dashboard/modal/Modal';
import InputGroup from '../../../../components/fields/input/Input';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import axios from 'axios'

const Staff = () => {
  const {staffs,setStaffs} = useGlobalState();
  const columns = ["Name","Username","Email Address"];

  const [modalOpen,setModalOpen] = useState(false)
  const [actionType,setActionType] = useState("Add");
  const [selectedStaffId,setSelectedStaffId] = useState(null);
  const token = localStorage.getItem("token")
  const axiosQuery = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  useEffect(()=>{
    const getStaffs = async() => {
      const {data} = await axiosQuery.get("/api/users/teachers");

      const newTeachers = data.teachers?.map((teacher)=>{
        return {
          Name: teacher.name,
          "Email Address": teacher.email,
          Username: teacher.username
        }
      })
      setStaffs(newTeachers)
    }
    getStaffs()
  },[])


  
  const handleAddModal = () => {
    setFormDetails({})
    setModalOpen(true);
    setActionType("Add")
  }
  const handleEdit = () => {
    const staffsUpdate = [...staffs];
    const indexOfStaff = staffs.findIndex(staff => staff.id === selectedStaffId);
    if(indexOfStaff >= 0){
      staffsUpdate[indexOfStaff] = formDetails;
    };
    setStaffs(staffsUpdate);
    setModalOpen(false);
    notifySuccess("Updated field successfully")
  }
  const handleDelete = () => {
    const newStaffs = staffs.filter((staff)=> staff.id !== selectedStaffId);
    setStaffs(newStaffs);
    setModalOpen(false);
    notifySuccess("Deleted field successfully")
  }
  const handleClose = () => {
    setModalOpen(false)
    setSelectedStaffId(null)
  }


  const handleAdd = async() => {
    try{
      const {data} = await axiosQuery.post("/api/users/register",{name: formDetails.Name,username: formDetails.Username,email:formDetails["Email Address"],password: "solz123",role_name: "teacher"})
      console.log(data)
      setStaffs((prevStaff)=>([...prevStaff,formDetails]));
      setModalOpen(false)
      setFormDetails({});
      notifySuccess("Added staff successfully")
    }catch(error){
      notifyError(error.response.data.message)
    }
  }

  const handleEditModal = (id) => {
    const selectedStaff = staffs.find(staff => staff.id === id);
    if(selectedStaff){
      setFormDetails(selectedStaff);
      setSelectedStaffId(id);
      setModalOpen(true)
      setActionType("Edit")
    }
  }

  const handleDeleteModal = (id) => {
    setSelectedStaffId(id)
    setModalOpen(true)
    setActionType("Delete")
  }


  const menus = [
    {item: "Edit Staff",icon: <HiPencil fontSize={20} />,onClick: handleEditModal},
    {item: "Delete Staff",icon: <DeleteForeverIcon />,onClick: handleDeleteModal},
  ];
  const [formDetails,setFormDetails] = useState({
    Name: "",
    Username: "",
    Phone_Number: "",
    "Email Address": ""
  });
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
        <p className='font-semibold text-lg'>Staff Overview</p>
        <div className='flex gap-[20px] items-end'>
            <Card title="Total Staff" value={staffs.length}/>
            <div className='flex gap-4 w-full h-fit justify-end'>
                <div className='p-4 bg-white'>Search Filter</div>
                <button className='add-btn' onClick={handleAddModal}>Add Staff</button>
            </div>
        </div>
        
        <div>
          <Table columns={columns} rows={staffs} menus={menus} />
        </div>
        { modalOpen &&
          <Modal
          title={`${actionType} Staff`}
           description={
            actionType === "Add" ? "All fields are required*" :
            actionType === "Edit" ? "Edit the fields you wish to change" : 
            ""} 
           btnAcceptText={actionType} 
           btnCloseText="Close" 
           modalSize="xl" 
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
                <p>Are you sure you wish to delete <span className='font-semibold'>{staffs?.find(staff => staff.id === selectedStaffId)?.Name}</span> from the database?</p> :
                <div className='flex justify-between gap-2 flex-wrap'>
                  <InputGroup labelText={"Full Name"}>
                    <input className="input-field" name='Name' value={formDetails.Name} onChange={(e)=>handleInput(e)} />
                  </InputGroup>
                  <InputGroup labelText={"Username"}>
                    <input className="input-field" name='Username' value={formDetails.Username} onChange={(e)=>handleInput(e)} />
                  </InputGroup>
                  <InputGroup labelText={"Email Address"}>
                    <input className="input-field" name='Email Address' value={formDetails.Email_Address} onChange={(e)=>handleInput(e)} />
                  </InputGroup>
                  <InputGroup labelText={"Phone Number"}>
                    <input className="input-field" name='Phone_Number' value={formDetails.Phone_Number} onChange={(e)=>handleInput(e)}/>
                  </InputGroup>
                </div>
              }

          </Modal>
        }
      
    </div>
  )
}

export default Staff
