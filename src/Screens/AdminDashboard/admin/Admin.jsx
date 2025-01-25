import React from "react";
import SidebarLayout from "../components/Sidebar/SidebarLayout";

const Admin = () => {
  return (
    <>
      <SidebarLayout />
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Welcome to Admin Page</h1>
        <p>This is the content for the Admin page.</p>
      </div>
    </>

  );
};

export default Admin;
