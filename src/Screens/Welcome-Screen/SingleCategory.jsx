import React, { useEffect, useState } from "react"
import axios from "axios"
import { AppRoutes } from "@/Constant/Constant"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import { Button } from "antd"

const SingleCategory = () => {
  const params = useParams()
  const id = params.id 
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${AppRoutes.getSingleCategories}${id}`)
        setCategory(response.data.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch category")
        setLoading(false)
      }
    }

    fetchCategory()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-xl text-gray-800">{error}</p>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <p className="text-xl text-gray-800">No category found</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Subtle Banner */}
      <div className="bg-green-50 py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{category.title}</h1>
          <p className="text-sm text-gray-600">
            Home <ChevronRight className="inline h-4 w-4" /> {category.title}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Category Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden mb-12">
            <CardHeader className="bg-green-500 text-white">
              <CardTitle className="text-2xl font-semibold">{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-gray-600 mb-6">{category.description}</CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-700 mb-1">Max Loan:</p>
                  <p className="text-2xl font-bold text-green-600">{category.maxLoan}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-700 mb-1">Loan Period:</p>
                  <p className="text-2xl font-bold text-green-600">{category.loanPeriod}</p>
                </div>
              </div>
              <Button className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white transition duration-300 ease-in-out transform hover:scale-105">
                Apply for Loan
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subcategories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Subcategories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">{subcategory.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{subcategory.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCategory

