import React , { useState,useEffect } from 'react';
import './style.css'
import useGlobalState from '../../../../Global/useGlobalState'
import RoleCard from '../../../../components/dashboard/Card/role/Card';
import Modal from '../../../../components/dashboard/modal/Modal';
import InputGroup from '../../../../components/fields/input/Input';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import axios from 'axios';
// import {axiosRequest} from '../../../../utils/api';
import { useNavigate } from 'react-router-dom';


const Roles = () => {
    const {allRoles,setAllRoles} = useGlobalState();
    const [modalOpen,setModalOpen] = useState(false);
    const [roleName,setRoleName] = useState("");
    const [actionType,setActionType] = useState("Add");
    const [roleId,setRoleId] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const axiosQuery = axios.create({
        baseURL: process.env.BASE_API_URL,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    
    
    const handleClose = () =>{
        setModalOpen(false);
        setRoleName("")
    }
    const handleAddModal = () => {
        setModalOpen(true)
        setActionType("Add")
    }
    const handleDeleteModal = (id) => {
        setActionType("Delete")
        setModalOpen(true)
        setRoleId(id)
    }
    const handleEditModal = (id) => {
        setRoleId(id)
        const roleToEdit = allRoles.find(role=> role.id === id);
        setRoleName(roleToEdit.name)
        setModalOpen(true);
        setActionType("Edit")
    }
    const handleView = (id) => {
        navigate(`/roles/${allRoles.find(role=> role.id === id).name}`);
    }

    const handleAddRole = async() => {
        const roleExists = allRoles.find(role => role.name === roleName);

        if(roleName !== "" && !roleExists){
            try{
                const {data} = await axiosQuery.post("/api/role",{name: roleName})
                setAllRoles([...allRoles,{name: roleName,id: Math.floor(Math.random()*100000)}]);
                notifySuccess("Successfully added role",roleName)
                setTimeout(()=>{
                    setRoleName("")
                },3000)
                setModalOpen(false);

            }catch(error){
                console.log(error)
            }
            
            
        }else if(roleExists){
            notifyError("Cannot add already existing role")
        }
    }

    const handleUpdateRole = async() => {
        const indexOfRole = allRoles.findIndex(role => role.id === roleId);
        if(indexOfRole >= 0){
            try{
                const data = await axiosQuery.put(`/api/role/${roleId}`,{name: roleName});
                console.log("data is: ",data)
                const roleToUpdate = allRoles.find(role => role.name === roleName)
                const newRoles = [...allRoles];
                newRoles[indexOfRole] = {...roleToUpdate,name: roleName}
                setAllRoles(newRoles)
                setModalOpen(false)
                notifySuccess("Role updated successfully",roleName);
                setRoleName("")
            }catch(error){
                notifyError(error.response.data.message)
            }
        }
    }
    const handleDeleteRole = async() => {
        try{
            const {data} = await axiosQuery.delete(`/api/role/${roleId}`)
            const newRoles = allRoles.filter(role => role.id !== roleId);
            setAllRoles(newRoles)
            setActionType("Add");
            setModalOpen(false)
            notifySuccess(data.message)
        }catch(error){
            notifyError(error.response.data.message)
        }
        

    }



  return (
    <div className='flex flex-col gap-[40px]'>
        
        <div className='w-full flex justify-between'>
            <p className='text-[20px] font-semibold'>Roles</p>
            <button className='add-btn' onClick={()=>handleAddModal()}>Add Role</button>
        </div>
        <div className='flex justify-center gap-4 flex-wrap'>
            {allRoles.map(role => (
                <RoleCard title={role.name}>
                    <div className="card-icon rounded-tl-lg" onClick={()=>handleEditModal(role.id)}>
                        <EditIcon sx={{fontSize: 20}} />
                    </div>
                    <div className="card-icon" onClick={()=>handleView(role.id)}>
                        <VisibilityIcon sx={{fontSize: 20}} />
                    </div>
                    <div className="card-icon rounded-bl-lg" onClick={()=>handleDeleteModal(role.id)}>
                        <DeleteForeverIcon sx={{fontSize: 20}} />
                    </div>
                </RoleCard>
            ))

            }
        </div>
        {
            modalOpen &&
            <Modal 
             title={`${actionType} Role`} 
             description={
                actionType === "Add" ? "All fields are required*" :
                actionType === "Edit" ? "Edit the fields you wish to change" : 
                ""} 
             btnAcceptColor="#160716" 
             btnAcceptText={actionType} 
             btnCloseText="Close" 
             modalSize="md" 
             btnColor={actionType === "Delete" ? "#bd0a0a" : "#160716"} 
             onClose={handleClose} 
             dismissible={true} 
             onAccept={
                actionType === "Add" ? handleAddRole :
                actionType === "Edit" ? handleUpdateRole :
                handleDeleteRole
            }>
                {
                    actionType === "Delete" ?
                    <p>Are you sure you want to delete the <span className='font-semibold'>{allRoles.find(role=>role.id === roleId).name}</span> role</p>:
                    <div className="input-fields">
                        <InputGroup labelText="Enter a role" required={true} width={"full"} >
                            <input className='input-field' value={roleName}  placeholder='e.g Admin' onChange={(e)=>setRoleName(e.target.value)} />
                        </InputGroup>
                    </div>
                }
            </Modal>
        }
    </div>
  )
}

export default Roles
