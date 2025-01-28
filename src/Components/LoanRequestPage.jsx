import React, { useEffect, useState } from "react"
import { Table, Button, Modal, message, Tag, Spin } from "antd"
import axios from "axios"
import { useAuth } from "@/Context/AuthContext"
import { AppRoutes } from "@/Constant/Constant"

const LoanRequestsPage = () => {
  const [loanRequests, setLoanRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchLoanRequests()
    }
  }, [user])

  const fetchLoanRequests = async () => {
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

  const handleViewSlip = async (loanRequestId) => {
    try {
      const response = await axios.get(`${AppRoutes.generateSlip}/${loanRequestId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        responseType: "blob",
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `loan_slip_${loanRequestId}.png`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    } catch (error) {
      console.error("Error generating loan slip:", error)
      message.error("Failed to generate loan slip. Please try again.")
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
      render: (status) => (
        <Tag color={status === "pending" ? "gold" : status === "approved" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Token Number",
      dataIndex: "tokenNumber",
      key: "tokenNumber",
    },
    {
      title: "Address",
      dataIndex: ["personalInfo", "address"],
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: ["personalInfo", "phoneNumber"],
      key: "phoneNumber",
    },
    {
      title: "Guarantors",
      dataIndex: "guarantors",
      key: "guarantors",
      render: (guarantors) => (
        <>
          {guarantors.map((guarantor, index) => (
            <div key={index}>
              {guarantor.name} - {guarantor.phoneNumber}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <Button onClick={() => handleViewSlip(record._id)}>View Loan Slip</Button>,
    },
  ]

  if (!user) {
    return <div>Please log in to view your loan requests.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Loan Requests</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={loanRequests}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      )}
    </div>
  )
}

export default LoanRequestsPage

