import React , {useState} from 'react'
import './style.css';
import GroupsIcon from '@mui/icons-material/Groups';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from '../../modal/Modal';
import InputGroup from '../../../fields/input/Input';

const RoleCard = ({title,children}) => {
  const [showIcons,setShowIcons] = useState(false);

  const [modalOpen,setModalOpen] = useState(false);

  const [roleDetails,setRoleDetails] = useState({name: "",number: ""})

  return (
    <div className='role-card' onMouseEnter={()=>setShowIcons(true)} onMouseLeave={()=>setShowIcons(false)}>
      <div className='p-2 bg-gray-100 rounded-full'>
        <div className='p-2 bg-gray-300 rounded-full'>
            <GroupsIcon sx={{fontSize: 40}} />
        </div>
      </div>
      <div>
        <p className='role-card-title capitalize'>{title}</p>
      </div>
      {
        showIcons && 
        <div className='card-icons'>
          {
            children
          }
        </div>
      }

    </div>
  )
}

export default RoleCard
