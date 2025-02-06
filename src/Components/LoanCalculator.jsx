import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Form, Select, message, Modal, Spin } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  CalculatorOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  GlobalOutlined,
  BankOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";
import { useAuth } from "@/Context/AuthContext";
import Navbar from "./Navbar/Navbar";

const { Option } = Select;

const LoanCalculatorWithRequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form] = Form.useForm();

  // Configuration objects for each category
  const categoryMaxLoan = {
    "Wedding Loans": 500000, // 5 Lakh
    "Home Construction Loans": 1000000, // 10 Lakh
    "Business Startup Loans": 1000000, // 10 Lakh
    "Education Loans": Infinity, // Based on requirement (no fixed maximum)
  };

  const categoryLoanPeriod = {
    "Wedding Loans": 3,
    "Home Construction Loans": 5,
    "Business Startup Loans": 5,
    "Education Loans": 4,
  };

  // Get the selected category from state passed by the Landing Page.
  const selectedCategory = location.state?.category.name || "Default";
  const allowedMaxLoan = categoryMaxLoan[selectedCategory] || 0;
  const allowedLoanPeriod = categoryLoanPeriod[selectedCategory] || 0;

  // State for calculator inputs
  const [input, setInput] = useState({
    deposit: "",
    requestedAmount: "",
    loanPeriod: "", // in years (will be chosen from a select)
  });

  // State for calculated results including deposit info
  const [result, setResult] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slip, setSlip] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const categoryData = location.state?.category;
    if (categoryData) {
      setSubcategories(categoryData.subcategories || []);
    }
  }, [location.state]);

  // Calculate loan details including deposit and deposit percentage
  const calculateLoan = () => {
    const deposit = Number(input.deposit);
    const requestedAmount = Number(input.requestedAmount);
    const loanPeriodYears = Number(input.loanPeriod);

    // Validate requested amount against allowed maximum (if applicable)
    if (allowedMaxLoan !== Infinity && requestedAmount > allowedMaxLoan) {
      message.error(
        `The requested loan amount exceeds the maximum allowed for ${selectedCategory} (${allowedMaxLoan.toLocaleString()} PKR).`
      );
      return;
    }

    // Validate that the deposit is at least 10% of the requested loan amount
    if (deposit < 0.1 * requestedAmount) {
      message.error("The initial deposit must be at least 10% of the requested loan amount.");
      return;
    }

    // Calculate values:
    // Total Loan granted is the requested amount minus the deposit.
    const totalLoan = requestedAmount - deposit;
    // Loan period in months
    const loanPeriodInMonths = loanPeriodYears * 12;
    // Monthly installment calculation
    const monthlyInstallment = totalLoan / loanPeriodInMonths;
    // Calculate deposit percentage relative to the requested amount
    const depositPercentage = (deposit / requestedAmount) * 100;

    // Set the results (include deposit and depositPercentage)
    setResult({ 
      totalLoan, 
      monthlyInstallment, 
      loanPeriodInMonths, 
      deposit, 
      depositPercentage 
    });
  };

  const handleProceed = () => {
    setShowRequestForm(true);
  };

  const handleSubmit = async (values) => {
    if (!user) {
      message.error("Please log in to submit a loan request.");
      return;
    }

    setLoading(true);
    try {
      // Here, we use the calculated deposit info from `result`
      const loanRequestData = {
        userId: user._id,
        category: selectedCategory,
        subcategory: values.subcategory,
        country: values.country,
        city: values.city,
        amount: result.totalLoan,         // Total loan amount after subtracting deposit
        deposit: result.deposit,            // The deposit amount entered
        depositPercentage: result.depositPercentage, // Deposit percentage
        loanPeriod: result.loanPeriodInMonths,
        personalInfo: {
          address: values.address,
          phoneNumber: values.phoneNumber,
        },
        guarantors: values.guarantors.map((guarantor) => ({
          name: guarantor.name,
          phoneNumber: guarantor.phoneNumber,
        })),
      };

      const response = await axios.post(AppRoutes.submitLoan, loanRequestData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.data.loanRequest) {
        message.success("Loan request submitted successfully");
        // Optionally, generate a slip here if needed:
        // generateSlip(response.data.loanRequest._id)
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting loan request:", error);
      message.error("Failed to submit loan request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // (Optional) generateSlip function is commented out
  // const generateSlip = async (loanRequestId) => {
  //   try {
  //     const response = await axios.post(
  //       AppRoutes.generateSlip,
  //       { loanRequestId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );
  //     setSlip(response.data.slip);
  //   } catch (error) {
  //     console.error("Error generating slip:", error);
  //     message.error("Failed to generate slip. Please try again.");
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
          <h2 className="text-4xl font-bold text-[#0d6db7] mb-6 text-center">Loan Calculator</h2>
          <div className="bg-indigo-100 rounded-lg p-4 mb-6">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-2">
              Selected Category: {selectedCategory}
            </h3>
            <p className="text-lg text-[#0d6db7]">
              Maximum Loan Amount:{" "}
              <span className="font-bold text-indigo-900">
                {allowedMaxLoan === Infinity
                  ? "Based on requirement"
                  : allowedMaxLoan.toLocaleString() + " PKR"}
              </span>
            </p>
            <p className="text-lg text-[#0d6db7]">
              Allowed Loan Period:{" "}
              <span className="font-bold text-indigo-900">
                {allowedLoanPeriod} {allowedLoanPeriod > 1 ? "Years" : "Year"}
              </span>
            </p>
          </div>

          <Form
            layout="vertical"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onFinish={calculateLoan}
          >
            <Form.Item
              label="Total Amount Required (PKR):"
              name="requestedAmount"
              rules={[{ required: true, message: "Please enter the loan amount you require" }]}
            >
              <Input
                type="number"
                placeholder="Enter desired loan amount"
                value={input.requestedAmount}
                onChange={(e) => setInput({ ...input, requestedAmount: e.target.value })}
                prefix={<BankOutlined className="text-indigo-500" />}
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              label="Initial Deposit (PKR):"
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
              label="Select Loan Period (Years):"
              name="loanPeriod"
              rules={[{ required: true, message: "Please select the loan period in years" }]}
            >
              <Select
                placeholder="Select Loan Period"
                value={input.loanPeriod}
                onChange={(value) => setInput({ ...input, loanPeriod: value })}
                className="rounded-md"
              >
                {Array.from({ length: allowedLoanPeriod }, (_, i) => i + 1).map((year) => (
                  <Option key={year} value={year}>
                    {year} {year > 1 ? "Years" : "Year"}
                  </Option>
                ))}
              </Select>
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

          {result && (
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
              <div className="mt-4">
                <p className="text-lg text-[#0d6db7] font-semibold">
                  Deposit: {Number(result.deposit).toLocaleString()} PKR (
                  {result.depositPercentage.toFixed(2)}%)
                </p>
              </div>
              <Button
                type="primary"
                onClick={handleProceed}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 border-none h-12 text-lg font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Proceed to Loan Request
              </Button>
            </div>
          )}

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
                          return Promise.reject(new Error("At least 2 guarantors are required"));
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
        </div>
      </div>
    </>
  );
};

export default LoanCalculatorWithRequestForm;
