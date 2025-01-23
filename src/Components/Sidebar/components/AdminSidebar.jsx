import React from 'react';
import {
  HomeOutlined,
  MailOutlined,
  CalendarTodayOutlined,
  GroupOutlined,
  WidgetsOutlined,
  LockOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ isMobile, isCollapsed, toggleSidebar }) => {
  return (
    <div
      className={`bg-white shadow text-gray-400 h-screen ${
        isMobile
          ? `fixed top-0 left-0 z-50 w-64 transition-transform duration-300 ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}`
          : `transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`
      }`}
    >
      <div className="flex flex-col p-4">
        {isMobile && (
          <div className="flex items-end justify-end">
            <button className="text-gray-400 font-bold text-xl" onClick={toggleSidebar}>
              ✕
            </button>
          </div>
        )}

        {isMobile ? (
          <span className="w-40">
            <img
              className="w-full"
              src="https://mir-s3-cdn-cf.behance.net/projects/404/df812e210053451.Y3JvcCwxNTAwLDExNzMsMCwxNjM.png"
              alt="Logo"
            />
          </span>
        ) : (
          <span className="w-50">
            <img
              className="w-full"
              src="https://mir-s3-cdn-cf.behance.net/projects/404/df812e210053451.Y3JvcCwxNTAwLDExNzMsMCwxNjM.png"
              alt="Logo"
            />
          </span>
        )}
      </div>
      <ul className="space-y-4 mt-4">
        <Link to={'/admin'}>
        <li
          className={`flex items-center gap-4 p-3 font-bold text-xl  hover:text-blue-400 hover:scale-105 transition-all cursor-pointer ${
            isCollapsed ? 'justify-center' : 'justify-start'    
          }`}
        >
          <HomeOutlined fontSize="medium" />
          {!isCollapsed && <span>Dashboard</span>}
        </li>
        </Link>
        <li
          className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <MailOutlined fontSize="medium" />
          {!isCollapsed && <span>Mailbox</span>}
        </li>
        <li
          className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <CalendarTodayOutlined fontSize="medium" />
          {!isCollapsed && <span>Calendar</span>}
        </li>
        <li
          className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <GroupOutlined fontSize="medium" />
          {!isCollapsed && <span>Group Chats</span>}
        </li>
        <li
          className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <WidgetsOutlined fontSize="medium" />
          {!isCollapsed && <span>Widgets</span>}
        </li>
        <li
          className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <LockOutlined fontSize="medium" />
          {!isCollapsed && <span>Authentication</span>}
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

