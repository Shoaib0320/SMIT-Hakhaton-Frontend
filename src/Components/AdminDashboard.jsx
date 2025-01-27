import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications from API
    setApplications([
      { id: 1, name: "User A", category: "Education Loan", status: "Pending" },
    ]);
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.name}</td>
              <td>{app.category}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
