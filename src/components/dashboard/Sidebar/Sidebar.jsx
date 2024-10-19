import React from 'react';
import './style.css';
import GridViewIcon from '@mui/icons-material/GridView';
import SidebarLink from '../SidebarLink/SidebarLink';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import useGlobalState from '../../../Global/useGlobalState';

const Sidebar = () => {
  const {roles,isAdmin} = useGlobalState()
  return (
    <div className='sidebar'>
      <SidebarLink title="Dashboard" to="/dashboard/home" icon={<GridViewIcon sx={{fontSize: 30}}/>} />
      {
        isAdmin &&
        <SidebarLink title="Roles" icon={<GroupIcon sx={{fontSize: 30}}/>} to="roles"/>
      }
      <SidebarLink title="Notifications" to="notifications" icon={<NotificationsIcon sx={{fontSize: 30}}/>} />
      <SidebarLink title="Messaging" icon={<MessageIcon sx={{fontSize: 30}}/>} to="messages"/>
      <SidebarLink title="Settings" icon={<SettingsIcon sx={{fontSize: 30}}/>} to="settings"/>

      



    </div>
  )
}

export default Sidebar
