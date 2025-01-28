// import React, { useEffect, useState } from "react";
// import { Table, Input, Select, DatePicker, Button, message } from "antd";
// import axios from "axios";
// import { useAuth } from "@/Context/AuthContext";
// import { AppRoutes } from "@/Constant/Constant";
// import SidebarLayout from "../components/Sidebar/SidebarLayout";

// const { Search } = Input;
// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const LoanRequests = () => {
//   const [loanRequests, setLoanRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     status: "",
//     category: "",
//     dateRange: [],
//   });
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user && user.role === "admin") {
//       fetchLoanRequests();
//     }
//   }, [user]);

//   const fetchLoanRequests = async () => {
//     try {
//       const response = await axios.get(AppRoutes.getAllLoanRequests);
//       setLoanRequests(response.data.loanRequests);
//     } catch (error) {
//       console.error("Error fetching loan requests:", error);
//       message.error("Failed to fetch loan requests. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (value) => {
//     console.log("Search value:", value);
//   };

//   const handleFilterChange = (filterType, value) => {
//     setFilters({ ...filters, [filterType]: value });
//   };

//   const handleApplyFilters = () => {
//     console.log("Applied filters:", filters);
//   };

//   const columns = [
//     {
//       title: "User",
//       dataIndex: ["user", "name"],
//       key: "userName",
//       className: "font-medium text-gray-700",
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//       filters: [
//         { text: "Wedding Loans", value: "Wedding Loans" },
//         { text: "Home Construction Loans", value: "Home Construction Loans" },
//         { text: "Business Startup Loans", value: "Business Startup Loans" },
//         { text: "Education Loans", value: "Education Loans" },
//       ],
//       onFilter: (value, record) => record.category === value,
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       key: "amount",
//       render: (amount) => `${amount.toFixed(2)} PKR`,
//       sorter: (a, b) => a.amount - b.amount,
//     },
//     {
//       title: "Loan Period",
//       dataIndex: "loanPeriod",
//       key: "loanPeriod",
//       render: (period) => `${period} months`,
//       sorter: (a, b) => a.loanPeriod - b.loanPeriod,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       filters: [
//         { text: "Pending", value: "pending" },
//         { text: "Approved", value: "approved" },
//         { text: "Rejected", value: "rejected" },
//       ],
//       onFilter: (value, record) => record.status === value,
//     },
//     {
//       title: "Submission Date",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       render: (date) => new Date(date).toLocaleDateString(),
//       sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <button
//           className="bg-[#0d6db7] text-white px-4 py-2 rounded-md"
//           onClick={() => handleViewDetails(record._id)}
//         >
//           View Details
//         </button>
//       ),
//     },
//   ];

//   const handleViewDetails = (loanId) => {
//     console.log("View details for loan:", loanId);
//   };

//   if (!user || user.role !== "admin") {
//     return <div>You do not have permission to access this page.</div>;
//   }

//   return (
//     <div>
//       <SidebarLayout />
//       <div className="min-h-screen bg-white py-12 px-4 lg:ml-20 md:ml-20">
//         <h1 className="text-4xl font-bold text-[#0d6db7] mb-8">
//           Admin Dashboard - Loan Requests
//         </h1>
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <div className="flex flex-wrap gap-4">
//             <Search
//               placeholder="Search by user name or ID"
//               onSearch={handleSearch}
//               className="w-full md:w-1/3"
//             />
//             <Select
//               className="w-full md:w-1/4"
//               placeholder="Filter by status"
//               onChange={(value) => handleFilterChange("status", value)}
//             >
//               <Option value="">All</Option>
//               <Option value="pending">Pending</Option>
//               <Option value="approved">Approved</Option>
//               <Option value="rejected">Rejected</Option>
//             </Select>
//             <Select
//               className="w-full md:w-1/4"
//               placeholder="Filter by category"
//               onChange={(value) => handleFilterChange("category", value)}
//             >
//               <Option value="">All</Option>
//               <Option value="Wedding Loans">Wedding Loans</Option>
//               <Option value="Home Construction Loans">
//                 Home Construction Loans
//               </Option>
//               <Option value="Business Startup Loans">
//                 Business Startup Loans
//               </Option>
//               <Option value="Education Loans">Education Loans</Option>
//             </Select>
//             <RangePicker
//               onChange={(dates) => handleFilterChange("dateRange", dates)}
//               className="w-full md:w-auto"
//             />
//             <button
//               type="primary"
//               className="bg-[#0d6db7] text-white px-4 py-2 rounded-md"
//               onClick={handleApplyFilters}
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//         <Table
//           columns={columns}
//           dataSource={loanRequests}
//           loading={loading}
//           rowKey="_id"
//           className="bg-white shadow-md rounded-lg"
//           scroll={{ x: "max-content" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default LoanRequests;










import React, { useEffect, useState } from "react"
import { Table, Input, Select, DatePicker, Button, message, Modal, Form } from "antd"
import axios from "axios"
import { useAuth } from "@/Context/AuthContext"
import { AppRoutes } from "@/Constant/Constant"
import SidebarLayout from "../components/Sidebar/SidebarLayout"

const { Search } = Input
const { Option } = Select
const { RangePicker } = DatePicker

const LoanRequests = () => {
  const [loanRequests, setLoanRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    dateRange: [],
    country: "",
    city: "",
    userName: "",
  })
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false)
  const [currentLoanRequest, setCurrentLoanRequest] = useState(null)
  const { user } = useAuth()
  const [form] = Form.useForm()

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchLoanRequests()
    }
  }, [user])

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get(AppRoutes.getAllLoanRequests, { params: filters })
      setLoanRequests(response.data.loanRequests)
    } catch (error) {
      console.error("Error fetching loan requests:", error)
      message.error("Failed to fetch loan requests. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setFilters({ ...filters, userName: value })
    fetchLoanRequests()
  }

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value })
  }

  const handleApplyFilters = () => {
    fetchLoanRequests()
  }

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      const response = await axios.put(AppRoutes.updateApplicationStatus, {
        applicationId: loanId,
        status: newStatus,
      })

      if (response.data.application.status === "approved") {
        setCurrentLoanRequest(response.data.application)
        setIsAppointmentModalVisible(true)
      } else {
        message.success("Loan request status updated successfully")
        fetchLoanRequests()
      }
    } catch (error) {
      console.error("Error updating loan request status:", error)
      message.error("Failed to update loan request status. Please try again.")
    }
  }

  const handleAppointmentSubmit = async (values) => {
    try {
      const response = await axios.post(AppRoutes.createAppointment, {
        loanRequestId: currentLoanRequest._id,
        ...values,
      })
      setIsAppointmentModalVisible(false)
      message.success("Appointment scheduled and loan request updated successfully")
      fetchLoanRequests()
    } catch (error) {
      console.error("Error scheduling appointment:", error)
      message.error("Failed to schedule appointment. Please try again.")
    }
  }

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
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select value={status} onChange={(value) => handleStatusChange(record._id, value)} style={{ width: 120 }}>
          <Option value="pending">Pending</Option>
          <Option value="approved">Approved</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
      ),
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
        <Button type="primary" onClick={() => handleViewDetails(record._id)}>
          View Details
        </Button>
      ),
    },
  ]

  const handleViewDetails = (loanId) => {
    console.log("View details for loan:", loanId)
    // Implement view details functionality
  }

  if (!user || user.role !== "admin") {
    return <div>You do not have permission to access this page.</div>
  }

  return (
    <div>
      <SidebarLayout />
      <div className="min-h-screen bg-white py-12 px-4 lg:ml-20 md:ml-20">
        <h1 className="text-4xl font-bold text-[#0d6db7] mb-8">Admin Dashboard - Loan Requests</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex flex-wrap gap-4">
            <Search placeholder="Search by user name" onSearch={handleSearch} className="w-full md:w-1/3" />
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
              <Option value="Home Construction Loans">Home Construction Loans</Option>
              <Option value="Business Startup Loans">Business Startup Loans</Option>
              <Option value="Education Loans">Education Loans</Option>
            </Select>
            <Input
              placeholder="Filter by country"
              onChange={(e) => handleFilterChange("country", e.target.value)}
              className="w-full md:w-1/4"
            />
            <Input
              placeholder="Filter by city"
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="w-full md:w-1/4"
            />
            <RangePicker onChange={(dates) => handleFilterChange("dateRange", dates)} className="w-full md:w-auto" />
            <Button type="primary" onClick={handleApplyFilters} className="bg-[#0d6db7] text-white">
              Apply Filters
            </Button>
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
      <Modal
        title="Schedule Appointment"
        visible={isAppointmentModalVisible}
        onCancel={() => setIsAppointmentModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAppointmentSubmit}>
          <Form.Item
            name="date"
            label="Appointment Date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker
              disabledDate={(current) => current && current < new Date().setHours(0, 0, 0, 0)}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item
            name="time"
            label="Appointment Time"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <DatePicker
              picker="time"
              showTime={{
                format: "hh:mm A",
                use12Hours: true,
              }}
              format="hh:mm A"
            />
          </Form.Item>
          <Form.Item
            name="officeLocation"
            label="Office Location"
            rules={[{ required: true, message: "Please enter the office location" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Schedule Appointment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default LoanRequests

