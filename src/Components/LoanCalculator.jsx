import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Input, Form, Select, message, Modal, Spin } from "antd"
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons"
import axios from "axios"
import { AppRoutes } from "@/Constant/Constant"
import { useAuth } from "@/Context/AuthContext"

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
    const loanPeriodInMonths = Number(input.loanPeriod) * 12  // Convert years to months
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
        loanPeriod: result.loanPeriodInMonths,  // Using loan period in months
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
        generateSlip(response.data.loanRequest._id)
      }
    } catch (error) {
      console.error("Error submitting loan request:", error)
      message.error("Failed to submit loan request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateSlip = async (loanRequestId) => {
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
      setSlip(response.data.slip)
    } catch (error) {
      console.error("Error generating slip:", error)
      message.error("Failed to generate slip. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Loan Calculator</h2>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Selected Category: {selectedCategory}</h3>
      <p className="text-lg text-gray-600 mb-6">
        Maximum Loan Amount: <span className="font-bold text-gray-800">{maxLoan} PKR</span>
      </p>

      <Form layout="vertical" className="w-full max-w-md" onFinish={calculateLoan}>
        <Form.Item
          label="Enter Initial Deposit (PKR):"
          name="deposit"
          rules={[{ required: true, message: "Please enter the initial deposit" }]}>
          <Input
            type="number"
            placeholder="Deposit Amount"
            value={input.deposit}
            onChange={(e) => setInput({ ...input, deposit: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Enter Loan Period (Years):"
          name="loanPeriod"
          rules={[{ required: true, message: "Please enter the loan period in years" }]}>
          <Input
            type="number"
            placeholder="Loan Period in Years"
            value={input.loanPeriod}
            onChange={(e) => setInput({ ...input, loanPeriod: e.target.value })}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Calculate
          </Button>
        </Form.Item>
      </Form>

      {result && (
        <div className="bg-white mt-6 p-6 rounded-lg shadow-md border w-full max-w-md">
          <h4 className="text-xl font-bold text-green-600 mb-4">Loan Calculation Result</h4>
          <p className="text-lg text-gray-700">
            Total Loan Amount: <span className="font-bold">{result.totalLoan.toFixed(2)} PKR</span>
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Monthly Installment: <span className="font-bold">{result.monthlyInstallment.toFixed(2)} PKR</span>
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Loan Period: <span className="font-bold">{result.loanPeriodInMonths} Months</span>
          </p>

          <Button type="primary" onClick={handleProceed} className="w-full">
            Proceed to Loan Request
          </Button>
        </div>
      )}

      <Modal
        title="Loan Request Form"
        visible={showRequestForm}
        onCancel={() => setShowRequestForm(false)}
        footer={null}
        width={800}
      >
        <Spin spinning={loading}>
          <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
            {/* <Form.Item
              name="subcategory"
              label="Loan Subcategory"
              rules={[{ required: true, message: "Please select a subcategory" }]}>
              <Select placeholder="Select subcategory">
                <Option value="subcategory1">Subcategory 1</Option>
                <Option value="subcategory2">Subcategory 2</Option>
                <Option value="subcategory3">Subcategory 3</Option>
              </Select>
            </Form.Item> */}

            {/* other Form.Items here */}
            <Form.Item
              name="subcategory"
              label="Loan Subcategory"
              rules={[{ required: true, message: "Please select a subcategory" }]}
            >
              <Select placeholder="Select subcategory">
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
              ]}>
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key} className="mb-4">
                      <Form.Item {...field} validateTrigger={["onChange", "onBlur"]} noStyle>
                        <Input.Group compact>
                          <Form.Item
                            name={[field.name, "name"]}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[{ required: true, message: "Please input guarantor's name or delete this field." }]}
                            noStyle
                          >
                            <Input style={{ width: "45%" }} placeholder="Guarantor Name" />
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
                            <Input style={{ width: "45%" }} placeholder="Guarantor Phone" />
                          </Form.Item>
                          {fields.length > 2 && (
                            <MinusCircleOutlined
                              className="dynamic-delete-button ml-2"
                              onClick={() => remove(field.name)}
                            />
                          )}
                        </Input.Group>
                      </Form.Item>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} className="w-full">
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
              rules={[{ required: true, message: "Please enter your address" }]}>
              <Input.TextArea placeholder="Enter your address" />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: "Please enter your phone number" }]}>
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: "Please enter your country number" }]}>
              <Input placeholder="Enter your Country" />
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please enter your phone number" }]}>
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Submit Loan Request
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      <Modal
        title="Appointment Slip"
        visible={!!slip}
        onOk={() => {
          setSlip(null)
          navigate("/")
        }}
        onCancel={() => setSlip(null)}
      >
        {slip && (
          <div>
            <p>Token Number: {slip.tokenNumber}</p>
            <p>Appointment Date: {new Date(slip?.appointment?.date).toLocaleDateString()}</p>
            <p>Appointment Time: {slip.appointment?.time}</p>
            <img src={slip.qrCode || "/placeholder.svg"} alt="QR Code" style={{ width: "200px", height: "200px" }} />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default LoanCalculatorWithRequestForm
