// import React, { useEffect, useState } from "react"
// import { Table, Input, Select, DatePicker, Button, message } from "antd"
// import axios from "axios"
// import { useAuth } from "@/Context/AuthContext"
// import { AppRoutes } from "@/Constant/Constant"
// import SidebarLayout from "../components/Sidebar/SidebarLayout"

// const { Search } = Input
// const { Option } = Select
// const { RangePicker } = DatePicker

// const LoanRequests = () => {
//     const [loanRequests, setLoanRequests] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [filters, setFilters] = useState({
//         status: "",
//         category: "",
//         dateRange: [],
//     })
//     const { user } = useAuth()

//     useEffect(() => {
//         if (user && user.role === "admin") {
//             fetchLoanRequests()
//         } else {
//             message.error("You do not have permission to access this page.")
//         }
//     }, [user])

//     const fetchLoanRequests = async () => {
//         try {
//             const response = await axios.get(AppRoutes.getAllLoanRequests)
//             setLoanRequests(response.data.loanRequests)
//         } catch (error) {
//             console.error("Error fetching loan requests:", error)
//             message.error("Failed to fetch loan requests. Please try again.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleSearch = (value) => {
//         // Implement search functionality here
//         console.log("Search value:", value)
//     }

//     const handleFilterChange = (filterType, value) => {
//         setFilters({ ...filters, [filterType]: value })
//     }

//     const handleApplyFilters = () => {
//         // Implement filter application logic here
//         console.log("Applied filters:", filters)
//     }

//     const columns = [
//         {
//             title: "User",
//             dataIndex: ["user", "name"],
//             key: "userName",
//         },
//         {
//             title: "Category",
//             dataIndex: "category",
//             key: "category",
//             filters: [
//                 { text: "Wedding Loans", value: "Wedding Loans" },
//                 { text: "Home Construction Loans", value: "Home Construction Loans" },
//                 { text: "Business Startup Loans", value: "Business Startup Loans" },
//                 { text: "Education Loans", value: "Education Loans" },
//             ],
//             onFilter: (value, record) => record.category === value,
//         },
//         {
//             title: "Amount",
//             dataIndex: "amount",
//             key: "amount",
//             render: (amount) => `${amount.toFixed(2)} PKR`,
//             sorter: (a, b) => a.amount - b.amount,
//         },
//         {
//             title: "Loan Period",
//             dataIndex: "loanPeriod",
//             key: "loanPeriod",
//             render: (period) => `${period} months`,
//             sorter: (a, b) => a.loanPeriod - b.loanPeriod,
//         },
//         {
//             title: "Status",
//             dataIndex: "status",
//             key: "status",
//             filters: [
//                 { text: "Pending", value: "pending" },
//                 { text: "Approved", value: "approved" },
//                 { text: "Rejected", value: "rejected" },
//             ],
//             onFilter: (value, record) => record.status === value,
//         },
//         {
//             title: "Submission Date",
//             dataIndex: "createdAt",
//             key: "createdAt",
//             render: (date) => new Date(date).toLocaleDateString(),
//             sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (_, record) => <Button onClick={() => handleViewDetails(record._id)}>View Details</Button>,
//         },
//     ]

//     const handleViewDetails = (loanId) => {
//         // Implement view details functionality here
//         console.log("View details for loan:", loanId)
//     }

//     if (!user || user.role !== "admin") {
//         return <div>You do not have permission to access this page.</div>
//     }

//     return (
//         <div>
//             <SidebarLayout />
//             <div className="min-h-screen bg-gray-50 py-20 lg:ml-20 md:ml-20 sm:ml-4">
//                 <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard - Loan Requests</h1>
//                 <div className="mb-4 flex space-x-4">
//                     <Search placeholder="Search by user name or ID" onSearch={handleSearch} style={{ width: 300 }} />
//                     <Select
//                         style={{ width: 200 }}
//                         placeholder="Filter by status"
//                         onChange={(value) => handleFilterChange("status", value)}
//                     >
//                         <Option value="">All</Option>
//                         <Option value="pending">Pending</Option>
//                         <Option value="approved">Approved</Option>
//                         <Option value="rejected">Rejected</Option>
//                     </Select>
//                     <Select
//                         style={{ width: 200 }}
//                         placeholder="Filter by category"
//                         onChange={(value) => handleFilterChange("category", value)}
//                     >
//                         <Option value="">All</Option>
//                         <Option value="Wedding Loans">Wedding Loans</Option>
//                         <Option value="Home Construction Loans">Home Construction Loans</Option>
//                         <Option value="Business Startup Loans">Business Startup Loans</Option>
//                         <Option value="Education Loans">Education Loans</Option>
//                     </Select>
//                     <RangePicker onChange={(dates) => handleFilterChange("dateRange", dates)} />
//                     <Button type="primary" onClick={handleApplyFilters}>
//                         Apply Filters
//                     </Button>
//                 </div>
//                 <Table columns={columns} dataSource={loanRequests} loading={loading} rowKey="_id" />
//             </div>
//         </div>
//     )
// }

// export default LoanRequests









import React, { useEffect, useState } from "react";
import { Table, Input, Select, DatePicker, Button, message } from "antd";
import axios from "axios";
import { useAuth } from "@/Context/AuthContext";
import { AppRoutes } from "@/Constant/Constant";
import SidebarLayout from "../components/Sidebar/SidebarLayout";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const LoanRequests = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    dateRange: [],
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchLoanRequests();
    } else {
      message.error("You do not have permission to access this page.");
    }
  }, [user]);

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get(AppRoutes.getAllLoanRequests);
      setLoanRequests(response.data.loanRequests);
    } catch (error) {
      console.error("Error fetching loan requests:", error);
      message.error("Failed to fetch loan requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    console.log("Search value:", value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const handleApplyFilters = () => {
    console.log("Applied filters:", filters);
  };

  const columns = [
    {
      title: "User",
      dataIndex: ["user", "name"],
      key: "userName",
      className: "font-medium text-gray-700",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Wedding Loans", value: "Wedding Loans" },
        { text: "Home Construction Loans", value: "Home Construction Loans" },
        { text: "Business Startup Loans", value: "Business Startup Loans" },
        { text: "Education Loans", value: "Education Loans" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount.toFixed(2)} PKR`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Loan Period",
      dataIndex: "loanPeriod",
      key: "loanPeriod",
      render: (period) => `${period} months`,
      sorter: (a, b) => a.loanPeriod - b.loanPeriod,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Approved", value: "approved" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Submission Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          className="bg-[#0d6db7] text-white px-4 py-2 rounded-md"
          onClick={() => handleViewDetails(record._id)}
        >
          View Details
        </button>
      ),
    },
  ];

  const handleViewDetails = (loanId) => {
    console.log("View details for loan:", loanId);
  };

  if (!user || user.role !== "admin") {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div>
      <SidebarLayout />
      <div className="min-h-screen bg-white py-12 px-4 lg:ml-20 md:ml-20">
        <h1 className="text-4xl font-bold text-[#0d6db7] mb-8">
          Admin Dashboard - Loan Requests
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex flex-wrap gap-4">
            <Search
              placeholder="Search by user name or ID"
              onSearch={handleSearch}
              className="w-full md:w-1/3"
            />
            <Select
              className="w-full md:w-1/4"
              placeholder="Filter by status"
              onChange={(value) => handleFilterChange("status", value)}
            >
              <Option value="">All</Option>
              <Option value="pending">Pending</Option>
              <Option value="approved">Approved</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
            <Select
              className="w-full md:w-1/4"
              placeholder="Filter by category"
              onChange={(value) => handleFilterChange("category", value)}
            >
              <Option value="">All</Option>
              <Option value="Wedding Loans">Wedding Loans</Option>
              <Option value="Home Construction Loans">
                Home Construction Loans
              </Option>
              <Option value="Business Startup Loans">
                Business Startup Loans
              </Option>
              <Option value="Education Loans">Education Loans</Option>
            </Select>
            <RangePicker
              onChange={(dates) => handleFilterChange("dateRange", dates)}
              className="w-full md:w-auto"
            />
            <button
              type="primary"
              className="bg-[#0d6db7] text-white px-4 py-2 rounded-md"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={loanRequests}
          loading={loading}
          rowKey="_id"
          className="bg-white shadow-md rounded-lg"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default LoanRequests;
