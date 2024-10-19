import React, { useState } from 'react'
import './style.css';
import { getModalSize } from './getModalSize';
import ClearIcon from '@mui/icons-material/Clear';

const Modal = ({ title,description, btnAcceptText,btnCloseText, btnColor, btnAcceptColor, children, modalSize, setModalOpen, onClose, onAccept, onPrevious, dismissible,progressPercent,btnDisabled }) => {
    const modalWidth = getModalSize(modalSize)

    const dismissModal = (e) => {
        (e.target === e.currentTarget) && onClose()
    }
  return (
    
    <div className="modal-container" onClick={(e)=>{ dismissible && dismissModal(e)}}>

            <div style={{maxWidth: `${modalWidth}px`}} className="modal-content">
                <div className="modal-header">
                    <div className="flex flex-col gap-[4px]">
                        <h3 className="text-xl font-semibold text-gray-900 m-0 capitalize">
                            {title}
                        </h3>
                        <p className="m-0 text-[#7C7B7B]">{description}</p>
                    </div>
                    <button type="button" className="absolute top-4 right-4" onClick={onClose}>
                        <ClearIcon />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <div className={`w-full flex flex-row-reverse gap-[12px] ${modalWidth < 800 && " flex-col"}`}>
                        <button type="button" style={{background: btnDisabled ? "#7a5f7a" : btnColor,color: "#fff",width: modalWidth > 800 ? "177px" : "100%",cursor: btnDisabled && "not-allowed"}} className={`modal-btn`} onClick={onAccept} disabled={btnDisabled && true}>{btnAcceptText}</button>
                        <button type="button" style={{width: modalWidth > 800 ? "228px" : "100%"}} className="modal-btn btn-close" onClick={onPrevious? onPrevious : onClose}>{btnCloseText}</button>
                    </div>
                </div>
            </div>
    </div>
            // <div className='modal-container' onClick={(e)=>handleModal(e)}>

            //     <div className={`max-w-${size} max-w-xs min-h-[300px] bg-white`}>
            //         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis temporibus molestiae esse nostrum quis sapiente saepe neque sint atque ipsum. Nihil esse ipsum dicta consequatur cum voluptates tempora maxime optio!</p>
            //     </div>

            //     {/* children */}

            //     <div>
                    
            //     </div>
              
            // </div>
  )
}

export default Modal
