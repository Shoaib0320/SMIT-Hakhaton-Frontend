import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Spin, message } from "antd";
import axios from "axios";
import { useAuth } from "@/Context/AuthContext";
import { AppRoutes } from "@/Constant/Constant";

const LoanProgressPage = () => {
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchLoanData();
    }
  }, [user]);

  const fetchLoanData = async () => {
    try {
      const response = await axios.get(`${AppRoutes.getLoanRequests}/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const loanRequests = response.data.loanRequests;

      // Grouping data by date and accumulating status counts
      const groupedData = loanRequests.reduce((acc, request) => {
        const date = new Date(request.createdAt).toLocaleDateString(); // Format: MM/DD/YYYY

        if (!acc[date]) {
          acc[date] = { name: date, pending: 0, approved: 0, rejected: 0 };
        }

        acc[date][request.status]++;
        return acc;
      }, {});

      // Convert grouped data object into array
      const formattedData = Object.values(groupedData);

      setLoanData(formattedData);
    } catch (error) {
      console.error("Error fetching loan requests:", error);
      message.error("Failed to fetch loan data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="text-center text-xl font-semibold text-red-500 mt-10">Please log in to view loan progress.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-6 text-center">
        <h1 className="text-3xl font-bold text-[#0d6db7] mb-6">Loan Request Progress</h1>
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <Spin size="large" />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={loanData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="name" stroke="#0d6db7" />
                <YAxis stroke="#0d6db7" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pending" stroke="#fcb900" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="approved" stroke="#00c49f" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="rejected" stroke="#ff4d4f" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanProgressPage;
