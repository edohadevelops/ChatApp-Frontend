import React from 'react';
import { Dropdown } from "flowbite-react";
import { HiOutlineDotsVertical,HiPencil } from 'react-icons/hi'

const Table = ({columns,rows,menus}) => {

  return (
    <div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {
                columns.map((column)=>(
                    <th scope="col" className="px-4 py-3">{column}</th>
                ))
            }
            <th>Menu</th>
          </tr>
        </thead>
        <tbody className="py-2">
            {
                rows?.map((row)=>(
                    <tr key={row.name} className="bg-white border-b hover:bg-gray-50">
                        {columns.map((column)=><td className='p-4'>{row[column]}</td>)}
                        <td className="px-4 py-4">
                        <Dropdown
                          label=""
                          renderTrigger={() => (
                            <span>
                              <HiOutlineDotsVertical color="black" size={20} />
                            </span>
                          )}
                          dismissOnClick={true}
                        >
                          {
                            menus?.map((menuitem)=>(
                              <Dropdown.Item onClick={()=>menuitem.onClick(row.id)} icon={()=>(menuitem.icon)}>
                                <button className='px-2 w-full capitalize'>
                                  {menuitem.item}
                                </button>
                              </Dropdown.Item>
                            ))
                          }
                        </Dropdown>
                        </td>
                    </tr>
                    
                ))
            }
            
        </tbody>
      </table>
    </div>
  )
}

export default Table
