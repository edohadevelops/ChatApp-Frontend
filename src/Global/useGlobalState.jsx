import {useState, useContext} from 'react'
import { Context } from "../Store/store";

const useGlobalState = () => {
    const [showMenu,setShowMenu,allRoles,setAllRoles,currentRoleList,setCurrentRoleList,admins,setAdmins,students,setStudents,staffs,setStaffs,userdetails,setUserDetails,allUsers,setAllUsers,isAdmin,setIsAdmin] = useContext(Context);

    return {
        showMenu,
        setShowMenu,
        allRoles,
        setAllRoles,
        currentRoleList,
        setCurrentRoleList,
        admins,
        setAdmins,
        students,
        setStudents,
        staffs,
        setStaffs,
        userdetails,
        setUserDetails,
        allUsers,
        setAllUsers,
        isAdmin,
        setIsAdmin
    }
}

export default useGlobalState