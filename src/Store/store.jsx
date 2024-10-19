import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const initialRoles = [];
const initialCurrentRole = [];
const initialAdmins = [];

const initialStudents = []
const initialUsers = [];
const initialStaff = []

export const Context = createContext();

const Store = ({children}) => {
    const [showMenu,setShowMenu] = useState(false);
    const [allRoles,setAllRoles] = useState(initialRoles);
    const [currentRoleList,setCurrentRoleList] = useState(initialCurrentRole)
    const [admins,setAdmins] = useState(initialAdmins);
    const [students,setStudents] = useState(initialStudents);
    const [staffs,setStaffs] = useState(initialStaff);
    const [userdetails,setUserDetails] = useState({});
    const [allUsers,setAllUsers] = useState(initialUsers);
    const [isAdmin,setIsAdmin] = useState(false);

    
    return (
        <Context.Provider value={[showMenu,setShowMenu,allRoles,setAllRoles,currentRoleList,setCurrentRoleList,admins,setAdmins,students,setStudents,staffs,setStaffs,userdetails,setUserDetails,allUsers,setAllUsers,isAdmin,setIsAdmin]}>
            {children}
        </Context.Provider>
    )
}

export default Store;