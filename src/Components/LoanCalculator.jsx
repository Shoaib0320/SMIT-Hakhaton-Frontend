import { Button } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const LoanCalculator = () => {
  const location = useLocation();

  // Mock data for max loan amounts by category
  const categoryMaxLoan = {
    "Wedding Loans": 500000, // Max loan for Wedding Loans
    "Home Construction Loans": 1000000, // Max loan for Home Construction
    "Business Startup Loans": 750000, // Max loan for Business Startup
    "Education Loans": 300000, // Max loan for Education Loans
  };

  const selectedCategory = location.state?.category.name || "Default";
  const maxLoan = categoryMaxLoan[selectedCategory] || 0;

  const [input, setInput] = useState({
    deposit: "",
    loanPeriod: "",
  });

  const [result, setResult] = useState(null);

  const calculateLoan = () => {
    const totalLoan = maxLoan - input.deposit; // Calculate total loan after deposit
    const monthlyInstallment = totalLoan / input.loanPeriod; // Calculate monthly installment
    setResult({ totalLoan, monthlyInstallment });
  };

  return (
    <div className="calculator-page min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Loan Calculator</h2>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Selected Category: {selectedCategory}</h3>
      <p className="text-lg text-gray-600 mb-6">Maximum Loan Amount: <span className="font-bold text-gray-800">{maxLoan} PKR</span></p>

      <div className="form-group w-full max-w-md mb-4">
        <label className="block text-gray-700 mb-2">Enter Initial Deposit (PKR):</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Deposit Amount"
          value={input.deposit}
          onChange={(e) => setInput({ ...input, deposit: Number(e.target.value) })}
        />
      </div>

      <div className="form-group w-full max-w-md mb-6">
        <label className="block text-gray-700 mb-2">Enter Loan Period (Months):</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Loan Period"
          value={input.loanPeriod}
          onChange={(e) => setInput({ ...input, loanPeriod: Number(e.target.value) })}
        />
      </div>

      <button
        onClick={calculateLoan}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Calculate
      </button>

      {result && (
        <div className="result bg-white mt-6 p-6 rounded-lg shadow-md border w-full max-w-md">
          <h4 className="text-xl font-bold text-green-600 mb-4">Loan Calculation Result</h4>
          <p className="text-lg text-gray-700">Total Loan Amount: <span className="font-bold">{result.totalLoan.toFixed(2)} PKR</span></p>
          <p className="text-lg text-gray-700">Monthly Installment: <span className="font-bold">{result.monthlyInstallment.toFixed(2)} PKR</span></p>

          <Button>Procced</Button>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
