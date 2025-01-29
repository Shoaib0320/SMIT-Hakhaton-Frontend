import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Input, Form, Select, message, Modal, Spin } from "antd"
import {
  PlusOutlined,
  MinusCircleOutlined,
  CalculatorOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  GlobalOutlined,
  BankOutlined,
} from "@ant-design/icons"
import axios from "axios"
import { AppRoutes } from "@/Constant/Constant"
import { useAuth } from "@/Context/AuthContext"
import Navbar from "./Navbar/Navbar"

const { Option } = Select

const LoanCalculatorWithRequestForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [form] = Form.useForm()

  const categoryMaxLoan = {
    "Wedding Loans": 500000,
    "Home Construction Loans": 1000000,
    "Business Startup Loans": 750000,
    "Education Loans": 300000,
  }

  const selectedCategory = location.state?.category.name || "Default"
  const maxLoan = categoryMaxLoan[selectedCategory] || 0

  const [input, setInput] = useState({
    deposit: "",
    loanPeriod: "",
  })

  const [result, setResult] = useState(null)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [slip, setSlip] = useState(null)

  const [subcategories, setSubcategories] = useState([])

  useEffect(() => {
    const categoryData = location.state?.category
    if (categoryData) {
      setSubcategories(categoryData.subcategories || [])
    }
  }, [location.state])

  const calculateLoan = () => {
    const totalLoan = maxLoan - Number(input.deposit)
    const loanPeriodInMonths = Number(input.loanPeriod) * 12
    const monthlyInstallment = totalLoan / loanPeriodInMonths
    setResult({ totalLoan, monthlyInstallment, loanPeriodInMonths })
  }

  const handleProceed = () => {
    setShowRequestForm(true)
  }

  const handleSubmit = async (values) => {
    if (!user) {
      message.error("Please log in to submit a loan request.")
      return
    }

    setLoading(true)
    try {
      const loanRequestData = {
        userId: user._id,
        category: selectedCategory,
        subcategory: values.subcategory,
        country: values.country,
        city: values.city,
        amount: result.totalLoan,
        loanPeriod: result.loanPeriodInMonths,
        personalInfo: {
          address: values.address,
          phoneNumber: values.phoneNumber,
        },
        guarantors: values.guarantors.map((guarantor) => ({
          name: guarantor.name,
          phoneNumber: guarantor.phoneNumber,
        })),
      }

      const response = await axios.post(AppRoutes.submitLoan, loanRequestData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      if (response.data.loanRequest) {
        message.success("Loan request submitted successfully")
        // generateSlip(response.data.loanRequest._id)
        navigate('/dashboard')
      }
    } catch (error) {
      console.error("Error submitting loan request:", error)
      message.error("Failed to submit loan request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // const generateSlip = async (loanRequestId) => {
  //   try {
  //     const response = await axios.post(
  //       AppRoutes.generateSlip,
  //       { loanRequestId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       },
  //     )
  //     setSlip(response.data.slip)
  //   } catch (error) {
  //     console.error("Error generating slip:", error)
  //     message.error("Failed to generate slip. Please try again.")
  //   }
  // }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
          <h2 className="text-4xl font-bold text-[#0d6db7] mb-6 text-center">Loan Calculator</h2>
          <div className="bg-indigo-100 rounded-lg p-4 mb-6">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Selected Category: {selectedCategory}</h3>
            <p className="text-lg text-[#0d6db7]">
              Maximum Loan Amount: <span className="font-bold text-indigo-900">{maxLoan.toLocaleString()} PKR</span>
            </p>
          </div>

          <Form layout="vertical" className="grid grid-cols-1 md:grid-cols-2 gap-6" onFinish={calculateLoan}>
            <Form.Item
              label="Enter Initial Deposit (PKR):"
              name="deposit"
              rules={[{ required: true, message: "Please enter the initial deposit" }]}
            >
              <Input
                type="number"
                placeholder="Deposit Amount"
                value={input.deposit}
                onChange={(e) => setInput({ ...input, deposit: e.target.value })}
                prefix={<BankOutlined className="text-indigo-500" />}
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              label="Enter Loan Period (Years):"
              name="loanPeriod"
              rules={[{ required: true, message: "Please enter the loan period in years" }]}
            >
              <Input
                type="number"
                placeholder="Loan Period in Years"
                value={input.loanPeriod}
                onChange={(e) => setInput({ ...input, loanPeriod: e.target.value })}
                prefix={<CalculatorOutlined className="text-indigo-500" />}
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item className="md:col-span-2">
              <button
                type="primary"
                htmlType="submit"
                className="w-full text-white bg-[#0d6db7] border-none h-12 text-lg font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Calculate
              </button>
            </Form.Item>
          </Form>

          {/* {result && (
            <div className="bg-indigo-50 mt-6 p-6 rounded-lg shadow-md border border-indigo-200">
              <h4 className="text-2xl font-bold text-[#184568] mb-4">Loan Calculation Result</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-lg text-[#0d6db7] font-semibold">Total Loan Amount</p>
                  <p className="text-2xl font-bold text-indigo-900">{result.totalLoan.toLocaleString()} PKR</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-lg text-[#0d6db7] font-semibold">Monthly Installment</p>
                  <p className="text-2xl font-bold text-indigo-900">{result.monthlyInstallment.toLocaleString()} PKR</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-lg text-[#0d6db7] font-semibold">Loan Period</p>
                  <p className="text-2xl font-bold text-indigo-900">{result.loanPeriodInMonths} Months</p>
                </div>
              </div>

              <Button
                type="primary"
                onClick={handleProceed}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 border-none h-12 text-lg font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Proceed to Loan Request
              </Button>
            </div>
          )} */}

          {
            result && (
              <div className="bg-indigo-50 mt-6 p-6 rounded-lg shadow-md border border-indigo-200">
                <h4 className="text-2xl font-bold text-[#184568] mb-4">Loan Calculation Result</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-lg text-[#0d6db7] font-semibold">Total Loan Amount</p>
                    <p className="text-2xl font-bold text-indigo-900">
                      {Math.round(result.totalLoan).toLocaleString()} PKR
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-lg text-[#0d6db7] font-semibold">Monthly Installment</p>
                    <p className="text-2xl font-bold text-indigo-900">
                      {Math.round(result.monthlyInstallment).toLocaleString()} PKR
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-lg text-[#0d6db7] font-semibold">Loan Period</p>
                    <p className="text-2xl font-bold text-indigo-900">{result.loanPeriodInMonths} Months</p>
                  </div>
                </div>

                <Button
                  type="primary"
                  onClick={handleProceed}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 border-none h-12 text-lg font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Proceed to Loan Request
                </Button>
              </div>
            )
          }

          <Modal
            title={<h3 className="text-2xl font-bold text-indigo-700">Loan Request Form</h3>}
            visible={showRequestForm}
            onCancel={() => setShowRequestForm(false)}
            footer={null}
            width={800}
            className="custom-modal"
          >
            <Spin spinning={loading}>
              <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
                <Form.Item
                  name="subcategory"
                  label="Loan Subcategory"
                  rules={[{ required: true, message: "Please select a subcategory" }]}
                >
                  <Select placeholder="Select subcategory" className="rounded-md">
                    {subcategories.map((subcategory, index) => (
                      <Option key={index} value={subcategory}>
                        {subcategory}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.List
                  name="guarantors"
                  initialValue={[{}, {}]}
                  rules={[
                    {
                      validator: async (_, guarantors) => {
                        if (!guarantors || guarantors.length < 2) {
                          return Promise.reject(new Error("At least 2 guarantors are required"))
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item required={false} key={field.key} className="mb-4">
                          <Form.Item {...field} validateTrigger={["onChange", "onBlur"]} noStyle>
                            <Input.Group compact>
                              <Form.Item
                                name={[field.name, "name"]}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  { required: true, message: "Please input guarantor's name or delete this field." },
                                ]}
                                noStyle
                              >
                                <Input
                                  style={{ width: "45%" }}
                                  placeholder="Guarantor Name"
                                  prefix={<UserOutlined className="text-indigo-500" />}
                                  className="rounded-l-md"
                                />
                              </Form.Item>
                              <Form.Item
                                name={[field.name, "phoneNumber"]}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input guarantor's phone number or delete this field.",
                                  },
                                ]}
                                noStyle
                              >
                                <Input
                                  style={{ width: "45%" }}
                                  placeholder="Guarantor Phone"
                                  prefix={<PhoneOutlined className="text-indigo-500" />}
                                  className="rounded-r-md"
                                />
                              </Form.Item>
                              {fields.length > 2 && (
                                <MinusCircleOutlined
                                  className="dynamic-delete-button ml-2 text-red-500 text-xl"
                                  onClick={() => remove(field.name)}
                                />
                              )}
                            </Input.Group>
                          </Form.Item>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                          className="w-full border-indigo-500 text-indigo-500 hover:text-indigo-700 hover:border-indigo-700"
                        >
                          Add Guarantor
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>

                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: "Please enter your address" }]}
                >
                  <Input.TextArea
                    placeholder="Enter your address"
                    className="rounded-md"
                    prefix={<HomeOutlined className="text-indigo-500" />}
                  />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[{ required: true, message: "Please enter your phone number" }]}
                >
                  <Input
                    placeholder="Enter your phone number"
                    prefix={<PhoneOutlined className="text-indigo-500" />}
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: "Please enter your country" }]}
                >
                  <Input
                    placeholder="Enter your Country"
                    prefix={<GlobalOutlined className="text-indigo-500" />}
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item name="city" label="City" rules={[{ required: true, message: "Please enter your city" }]}>
                  <Input
                    placeholder="Enter your city"
                    prefix={<HomeOutlined className="text-indigo-500" />}
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 border-none h-12 text-lg font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Submit Loan Request
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </Modal>

          {/* <Modal
            title={<h3 className="text-2xl font-bold text-indigo-700">Appointment Slip</h3>}
            visible={!!slip}
            onOk={() => {
              setSlip(null)
              navigate("/")
            }}
            onCancel={() => setSlip(null)}
            className="custom-modal"
          >
            {slip && (
              <div className="bg-indigo-50 p-6 rounded-lg">
                <p className="text-lg text-indigo-800 mb-2">
                  <span className="font-semibold">Token Number:</span> {slip.tokenNumber}
                </p>
                <p className="text-lg text-indigo-800 mb-2">
                  <span className="font-semibold">Appointment Date:</span>{" "}
                  {new Date(slip?.appointment?.date).toLocaleDateString()}
                </p>
                <p className="text-lg text-indigo-800 mb-2">
                  <span className="font-semibold">Appointment Time:</span> {slip.appointment?.time}
                </p>
                <div className="flex justify-center mt-4">
                  <img src={slip.qrCode || "/placeholder.svg"} alt="QR Code" className="w-48 h-48" />
                </div>
              </div>
            )}
          </Modal> */}
        </div>
      </div>
    </>
  )
}

export default LoanCalculatorWithRequestForm

