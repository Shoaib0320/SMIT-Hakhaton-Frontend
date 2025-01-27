import React, { useState } from "react";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnic: "",
  });

  const handleSubmit = () => {
    console.log("User Data:", formData);
    // API call for user registration
  };

  return (
    <div className="registration-page">
      <h2>User Registration</h2>
      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Enter CNIC"
        onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
      />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default UserRegistration;
