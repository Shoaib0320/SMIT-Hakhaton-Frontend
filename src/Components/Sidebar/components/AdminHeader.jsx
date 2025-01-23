import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow text-gray-400 p-4 px-6 flex justify-between items-center">
      <button
        className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all font-bold text-xl"
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </button>
      <h1 className="text-lg font-bold  hover:text-blue-400 hover:scale-110 transition-all cursor-pointer">Dashboard</h1>
    </header>
  );
};

export default AdminHeader;


