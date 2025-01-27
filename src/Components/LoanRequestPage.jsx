import React, { useEffect, useState } from "react"
import { Table, Button, Modal, message } from "antd"
import axios from "axios"
import { useAuth } from "@/Context/AuthContext"
import { AppRoutes } from "@/Constant/Constant"

const LoanRequestsPage = () => {
  const [loanRequests, setLoanRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [slipModalVisible, setSlipModalVisible] = useState(false)
  const [currentSlip, setCurrentSlip] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchLoanRequests()
    } else {
      setLoading(false)
      message.error("User not authenticated. Please log in.")
    }
  }, [user])

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get(`${AppRoutes.getLoanRequests}/${user._id}`)
      setLoanRequests(response.data)
    } catch (error) {
      console.error("Error fetching loan requests:", error)
      message.error("Failed to fetch loan requests. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleViewSlip = async (loanRequestId) => {
    try {
      const response = await axios.post(
        AppRoutes.generateSlip,
        { loanRequestId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      setCurrentSlip(response.data.slip)
      setSlipModalVisible(true)
    } catch (error) {
      console.error("Error generating slip:", error)
      message.error("Failed to generate slip. Please try again.")
    }
  }

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount.toFixed(2)} PKR`,
    },
    {
      title: "Loan Period",
      dataIndex: "loanPeriod",
      key: "loanPeriod",
      render: (period) => `${period} months`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <Button onClick={() => handleViewSlip(record._id)}>View Slip</Button>,
    },
  ]

  if (!user) {
    return <div>Please log in to view your loan requests.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Loan Requests</h1>
      <Table columns={columns} dataSource={loanRequests} loading={loading} rowKey="_id" />
      <Modal
        title="Appointment Slip"
        open={slipModalVisible}
        onOk={() => setSlipModalVisible(false)}
        onCancel={() => setSlipModalVisible(false)}
      >
        {currentSlip && (
          <div>
            <p>Token Number: {currentSlip.tokenNumber}</p>
            <p>Appointment Date: {new Date(currentSlip.appointment?.date).toLocaleDateString()}</p>
            <p>Appointment Time: {currentSlip.appointment?.time}</p>
            <img
              src={currentSlip.qrCode || "/placeholder.svg"}
              alt="QR Code"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default LoanRequestsPage

