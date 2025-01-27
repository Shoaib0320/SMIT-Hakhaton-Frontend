import React, { useState, useEffect } from "react"
import { Table, Button, Modal, message } from "antd"
import axios from "axios"
import { useAuth } from "@/Context/AuthContext"
import { AppRoutes } from "@/Constant/Constant"

const LoanRequestsPage = () => {
  const [loanRequests, setLoanRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [slipModalOpen, setSlipModalOpen] = useState(false)
  const [currentSlip, setCurrentSlip] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user && user._id) {
      fetchLoanRequests()
    }
  }, [user])

  console.log('User', user._id);
  

  const fetchLoanRequests = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${AppRoutes.getLoanRequests}/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      
      setLoanRequests(response.data.loanRequests)
    } catch (error) {
      console.error("Error fetching loan requests:", error)
      message.error("Failed to fetch loan requests. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const viewSlip = async (loanRequestId) => {
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
      setSlipModalOpen(true)
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
      title: "Subcategory",
      dataIndex: "subcategory",
      key: "subcategory",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Loan Period",
      dataIndex: "loanPeriod",
      key: "loanPeriod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <Button onClick={() => viewSlip(record._id)}>View Slip</Button>,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Your Loan Requests</h2>
      <Table columns={columns} dataSource={loanRequests} loading={loading} rowKey="_id" />

      <Modal
        title="Appointment Slip"
        open={slipModalOpen}
        onOk={() => setSlipModalOpen(false)}
        onCancel={() => setSlipModalOpen(false)}
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

