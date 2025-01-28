import React, { useEffect, useState } from "react"
import { Table, Button, Modal, message, Tag } from "antd"
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
    } else {
      setLoading(false)
      message.error("Please log in to view your loan requests.")
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

