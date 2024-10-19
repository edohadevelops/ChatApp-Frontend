import React from 'react'

const InputGroup = ({required,labelText,children,width}) => {
  return (
    <div className='flex flex-col gap-[5px]' style={{width: width === "full" ? "100%" : "48%"}}>
      <label htmlFor="">{labelText} {required && "*"}</label>
      {
        children
      }
    </div>
  )
}

export default InputGroup
