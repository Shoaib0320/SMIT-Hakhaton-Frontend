import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';


const AdminDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isCollapsed, setIsCollapsed] = useState(true); // Initially, the sidebar is collapsed on mobile

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsCollapsed(false); // Reset the sidebar for larger screens
      } else {
        setIsCollapsed(true); // Hide sidebar for mobile on resize
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex">
      <AdminSidebar
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <div className={`flex-1 ${isMobile && 'ml-0'} transition-all duration-300`}>
        <AdminHeader toggleSidebar={toggleSidebar} />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Welcome to EduLearn Dashboard</h2>
          <p>Add your widgets, charts, or content here.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

