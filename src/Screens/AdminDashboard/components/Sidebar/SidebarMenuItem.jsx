import React from "react"

const SidebarMenuItem = ({ icon, title }) => {
    return (
      <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
        {icon}
        <div>{title}</div>
      </div>
    );
  };
  
  export default SidebarMenuItem;
  

