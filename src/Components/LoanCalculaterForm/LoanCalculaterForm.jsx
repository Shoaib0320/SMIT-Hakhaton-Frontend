import React, { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "@/Context/AuthContext"
import { AppRoutes } from "@/Constant/Constant"

const LoanCalculatorForm = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [subcategories, setSubcategories] = useState([])
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [initialDeposit, setInitialDeposit] = useState("")
  const [loanPeriod, setLoanPeriod] = useState("")
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [maxLoanAmount, setMaxLoanAmount] = useState(0)

  const { user } = useAuth()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(AppRoutes.getCategoriesWithSubCategories)
        setCategories(response.data.data)
      } catch (err) {
        console.error("Error fetching categories:", err.message)
        setError("Failed to load categories. Please try again.")
      }
    }
    fetchCategories()
  }, [])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    const category = categories.find((cat) => cat._id === categoryId)
    if (category) {
      setSubcategories(category.subcategories)
      setMaxLoanAmount(category.maxLoan)
    } else {
      setSubcategories([])
      setMaxLoanAmount(0)
    }
  }

  const handleCalculate = async () => {
    try {
      setError("")
      if (!selectedCategory || !selectedSubcategory || !initialDeposit || !loanPeriod) {
        setError("Please fill in all fields.")
        return
      }
      if (isNaN(Number(initialDeposit)) || isNaN(Number(loanPeriod))) {
        setError("Please enter valid numbers for initial deposit and loan period.")
        return
      }
      const response = await axios.post(AppRoutes.addCalculate, {
        userId: user._id,
        categoryId: selectedCategory,
        subcategory: selectedSubcategory,
        initialDeposit: Number(initialDeposit),
        loanPeriod: Number(loanPeriod),
      })
      setResult(response.data)
    } catch (err) {
      console.error("Calculation error:", err)
      setError(err.response?.data?.error || "An error occurred during calculation.")
      setResult(null)
    }
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Loan Calculator</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Select Category</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Select Subcategory</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          <option value="">-- Select Subcategory --</option>
          {subcategories.map((sub, index) => (
            <option key={index} value={sub}>
              {sub.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Initial Deposit (PKR)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={initialDeposit}
          onChange={(e) => setInitialDeposit(e.target.value)}
          placeholder="Enter initial deposit amount"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Loan Period (Years)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={loanPeriod}
          onChange={(e) => setLoanPeriod(e.target.value)}
          placeholder="Enter loan period"
        />
      </div>

      <button onClick={handleCalculate} className="w-full p-2 bg-blue-500 text-white font-bold rounded">
        Calculate
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Loan Breakdown</h3>
          <p>Maximum Loan Amount: PKR {result.maxLoanAmount.toFixed(2)}</p>
          <p>Initial Deposit: PKR {initialDeposit}</p>
          <p>Loan Amount: PKR {result.loanAmount.toFixed(2)}</p>
          <p>Monthly Installment: PKR {result.monthlyInstallment.toFixed(2)}</p>
          <p>Total Payable: PKR {result.totalPayable.toFixed(2)}</p>
          <p>Loan Period: {result.loanPeriod} Years</p>
        </div>
      )}
    </div>
  )
}

export default LoanCalculatorForm

