import React, { useEffect, useState } from 'react'
import Card from '../../../../components/dashboard/Card/Card'
import useGlobalState from '../../../../Global/useGlobalState';
import Table from '../../../../components/dashboard/Table/Table';
import { HiPencil } from 'react-icons/hi';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '../../../../components/dashboard/modal/Modal';
import InputGroup from '../../../../components/fields/input/Input';
import { notifySuccess } from '../../../../utils/notify';



const Students = () => {
  const {students,setStudents} = useGlobalState();

  const columns = ["Name","Username","Phone_Number","Email_Address"];

  const [modalOpen,setModalOpen] = useState(false)
  const [actionType,setActionType] = useState("Add");
  const [selectedStudentId,setSelectedStudentId] = useState(null)

  const handleAddModal = () => {
    setFormDetails({})
    setModalOpen(true);
    setActionType("Add")
  }

  const handleClose = () => {
    setModalOpen(false)
    setSelectedStudentId(null)
  }


  const handleAdd = () => {
    setStudents((prevStudents)=>([...prevStudents,formDetails]));
    setModalOpen(false)
    setFormDetails({});
    notifySuccess("Added Student successfully")
  }
  const handleEdit = () => {
    const studentUpdate = [...students];
    const indexOfStudent = students.findIndex(student => student.id === selectedStudentId);
    if(indexOfStudent >= 0){
      studentUpdate[indexOfStudent] = formDetails;
    };
    setStudents(studentUpdate);
    setModalOpen(false);
    notifySuccess("Updated field successfully")
  }
  const handleDelete = () => {
    const newStudents = students.filter((student)=> student.id !== selectedStudentId);
    setStudents(newStudents);
    setModalOpen(false);
    notifySuccess("Deleted field successfully")

  }

  const handleEditModal = (id) => {
    const selectedStudent = students.find(student => student.id === id);
    if(selectedStudent){
      setFormDetails(selectedStudent);
      setSelectedStudentId(id);
      setModalOpen(true)
      setActionType("Edit")
    }
  }

  const handleDeleteModal = (id) => {
    setSelectedStudentId(id)
    setModalOpen(true)
    setActionType("Delete")
  }

  const menus = [
    {item: "Edit Student",icon: <HiPencil fontSize={20} />,onClick: handleEditModal},
    {item: "Delete Student",icon: <DeleteForeverIcon />,onClick: handleDeleteModal},
  ];
  const [formDetails,setFormDetails] = useState({
    Name: "",
    Username: "",
    Phone_Number: "",
    Email_Address: ""
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
        <p className='font-semibold text-lg'>Students Overview</p>
        <div className='flex gap-[20px] items-end'>
            <Card title="Total Students" value={students.length}/>
            <div className='flex col gap-4 w-full h-fit justify-end'>
                <div className='p-4 bg-white shadow-sm cursor-pointer'>Search Filter</div>
                <button className='add-btn' onClick={handleAddModal}> Add Student</button>
            </div>
        </div>
        
        <div className=''>
          <Table columns={columns} rows={students} menus={menus} />
        </div>
        { modalOpen &&
          <Modal
          title={`${actionType} Admin`}
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
                <p>Are you sure you wish to delete <span className='font-semibold'>{students?.find(student=> student.id === selectedStudentId)?.Name}</span> from the database?</p> :
                <div className='flex justify-between gap-2 flex-wrap'>
                  <InputGroup labelText={"Full Name"}>
                    <input className="input-field" name='Name' value={formDetails.Name} onChange={(e)=>handleInput(e)} />
                  </InputGroup>
                  <InputGroup labelText={"Username"}>
                    <input className="input-field" name='Username' value={formDetails.Username} onChange={(e)=>handleInput(e)} />
                  </InputGroup>
                  <InputGroup labelText={"Email Address"}>
                    <input className="input-field" name='Email_Address' value={formDetails.Email_Address} onChange={(e)=>handleInput(e)} />
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

export default Students
