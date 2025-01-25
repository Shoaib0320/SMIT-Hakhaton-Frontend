import React from "react"


const SidebarMenuItem = ({ title, icon, isOpen }) => {
  return (
    <div className="hover:bg-gray-800 cursor-pointer p-2 rounded-md transition-all duration-200 ease-in-out flex items-center">
      <div className="mr-2 text-white">{icon}</div>
      {isOpen && <span className="text-white">{title}</span>}
    </div>
  )
}

export default SidebarMenuItem

