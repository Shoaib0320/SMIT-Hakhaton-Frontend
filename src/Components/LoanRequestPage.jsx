// import React, { useEffect, useState } from "react"
// import { Table, Button, Modal, message, Tag, Spin } from "antd"
// import axios from "axios"
// import { useAuth } from "@/Context/AuthContext"
// import { AppRoutes } from "@/Constant/Constant"
// import Navbar from "./Navbar/Navbar"

// const LoanRequestsPage = () => {
//   const [loanRequests, setLoanRequests] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { user } = useAuth()

//   useEffect(() => {
//     if (user) {
//       fetchLoanRequests()
//     }
//   }, [user])

//   const fetchLoanRequests = async () => {
//     try {
//       const response = await axios.get(`${AppRoutes.getLoanRequests}/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       })
//       setLoanRequests(response.data.loanRequests)
//     } catch (error) {
//       console.error("Error fetching loan requests:", error)
//       message.error("Failed to fetch loan requests. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleViewSlip = async (loanRequestId) => {
//     try {
//       const response = await axios.get(`${AppRoutes.generateSlip}/${loanRequestId}`, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//         responseType: "blob",
//       })

//       const url = window.URL.createObjectURL(new Blob([response.data]))
//       const link = document.createElement("a")
//       link.href = url
//       link.setAttribute("download", `loan_slip_${loanRequestId}.png`)
//       document.body.appendChild(link)
//       link.click()
//       link.parentNode.removeChild(link)
//     } catch (error) {
//       console.error("Error generating loan slip:", error)
//       message.error("Failed to generate loan slip. Please try again.")
//     }
//   }

//   const columns = [
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       key: "amount",
//       render: (amount) => `${amount.toFixed(2)} PKR`,
//     },
//     {
//       title: "Loan Period",
//       dataIndex: "loanPeriod",
//       key: "loanPeriod",
//       render: (period) => `${period} months`,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <Tag color={status === "pending" ? "gold" : status === "approved" ? "green" : "red"}>
//           {status.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "Token Number",
//       dataIndex: "tokenNumber",
//       key: "tokenNumber",
//     },
//     {
//       title: "Address",
//       dataIndex: ["personalInfo", "address"],
//       key: "address",
//     },
//     {
//       title: "Phone Number",
//       dataIndex: ["personalInfo", "phoneNumber"],
//       key: "phoneNumber",
//     },
//     {
//       title: "Guarantors",
//       dataIndex: "guarantors",
//       key: "guarantors",
//       render: (guarantors) => (
//         <>
//           {guarantors.map((guarantor, index) => (
//             <div key={index}>
//               {guarantor.name} - {guarantor.phoneNumber}
//             </div>
//           ))}
//         </>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => <Button onClick={() => handleViewSlip(record._id)}>View Loan Slip</Button>,
//     },
//   ]

//   if (!user) {
//     return <div>Please log in to view your loan requests.</div>
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 p-6">
//         <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Loan Requests</h1>
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <Spin size="large" />
//           </div>
//         ) : (
//           <Table
//             columns={columns}
//             dataSource={loanRequests}
//             rowKey="_id"
//             pagination={{ pageSize: 10 }}
//             scroll={{ x: "max-content" }}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default LoanRequestsPage


import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Spin, message } from "antd";
import axios from "axios";
import { useAuth } from "@/Context/AuthContext";
import { AppRoutes } from "@/Constant/Constant";
import Navbar from "./Navbar/Navbar";

const LoanRequestsPage = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchLoanRequests();
    }
  }, [user]);

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get(`${AppRoutes.getLoanRequests}/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setLoanRequests(response.data.loanRequests);
    } catch (error) {
      console.error("Error fetching loan requests:", error);
      message.error("Failed to fetch loan requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewSlip = async (loanRequestId) => {
    try {
      const response = await axios.get(`${AppRoutes.generateSlip}/${loanRequestId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `loan_slip_${loanRequestId}.png`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error generating loan slip:", error);
      message.error("Failed to generate loan slip. Please try again.");
    }
  };

  const columns = [
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Amount", dataIndex: "amount", key: "amount", render: (amount) => `${amount.toFixed(2)} PKR` },
    { title: "Loan Period", dataIndex: "loanPeriod", key: "loanPeriod", render: (period) => `${period} months` },
    // { 
    //   title: "Status", 
    //   dataIndex: "status", 
    //   key: "status", 
    //   render: (status) => (
    //     <Tag color={status === "pending" ? "gold" : status === "approved" ? "green" : "red"} className="font-semibold text-lg px-3 py-1 rounded-lg">
    //       {status.toUpperCase()}
    //     </Tag>
    //   )
    // },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "pending" ? "gold" : status === "approved" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
    { title: "Token Number", dataIndex: "tokenNumber", key: "tokenNumber" },
    // { title: "Address", dataIndex: ["personalInfo", "address"], key: "address" },
    { title: "Phone Number", dataIndex: ["personalInfo", "phoneNumber"], key: "phoneNumber" },
    {
      title: "Guarantors",
      dataIndex: "guarantors",
      key: "guarantors",
      render: (guarantors) => (
        <div className="space-y-1">
          {guarantors.map((guarantor, index) => (
            <div key={index} className="text-gray-700 font-medium">
              {guarantor.name} - {guarantor.phoneNumber}
            </div>
          ))}
        </div>
      )
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition" onClick={() => handleViewSlip(record._id)}>
    //       View Loan Slip
    //     </Button>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        record.status === "approved" ? (
          <Button className="bg-[#0d6db7]  text-white font-semibold px-4 py-2 rounded-lg transition" onClick={() => handleViewSlip(record._id)}>
            View Loan Slip
          </Button>
        ) : null
      ),
    },
  ];

  if (!user) {
    return <div className="text-center text-xl font-semibold text-red-500 mt-10">Please log in to view your loan requests.</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-[#0d6db7]  mb-8">Your Loan Requests</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-6 overflow-auto">
            <Table
              columns={columns}
              dataSource={loanRequests}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: "max-content" }}
            // className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanRequestsPage;
