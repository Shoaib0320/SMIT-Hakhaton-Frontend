// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router";
// import { AppRoutes } from "@/Constant/Constant";

// const SingleCategory = () => {

//     const { id } = useParams();

//     const [category, setCategory] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     const categoryId = `${id}`;

//     useEffect(() => {
//         const fetchCategory = async () => {
//             try {
//                 const response = await axios.get(`${AppRoutes.getSingleCategories}${categoryId}`);
//                 setCategory(response.data.data); // Assuming your API returns category data in data
//                 console.log('Response', response.data);
                
//                 setLoading(false);
//             } catch (err) {
//                 setError("Failed to fetch category");
//                 setLoading(false);
//             }
//         };

//         fetchCategory();
//     }, [categoryId]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <>
//             {/* BANNER-1 START */}
//             <div className="container-fluid bg py-5">
//                 <h2 className="pt-5 text-center text-white display-4">
//                     {`${category.title}`}
//                 </h2>
//                 <h5 className="mt-2 text-center text-white">
//                     {`Home - ${category.title}`}
//                 </h5>
//             </div>
//             {/* BANNER-1 END */}

//             <div >
//                 <h2>Category Details</h2>
//                 {category ? (
//                     <div >
//                         <h3>{category.title}</h3>
//                         <p><strong>Description:</strong> {category.description}</p>
//                         <p><strong>Max Loan:</strong> {category.maxLoan}</p>
//                         <p><strong>Loan Period:</strong> {category.loanPeriod}</p>
//                     </div>
//                 ) : (
//                     <p>No category found</p>
//                 )}
//             </div>
//         </>
//     );
// };

// export default SingleCategory;




import React, { useEffect, useState } from "react"
import axios from "axios"
import { AppRoutes } from "@/Constant/Constant"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useParams } from "react-router-dom"

const SingleCategory = () => {
  const { id } = useParams()
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )

  if (error) return <div className="text-center text-red-500 text-lg mt-8">{error}</div>

  if (!category) return <div className="text-center text-lg mt-8">No category found</div>

  return (
    <>
      {/* Banner */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 py-12 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">{category.title}</h1>
          <p className="text-lg md:text-xl">Home - {category.title}</p>
        </div>
      </div>

      {/* Category Details */}
      <div className="container mx-auto px-6 py-12">
        <Card className="bg-white shadow-md rounded-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">{category.title}</CardTitle>
            <CardDescription className="text-gray-600 mt-2">{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-700">Max Loan:</p>
                <p className="text-gray-600">{category.maxLoan}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Loan Period:</p>
                <p className="text-gray-600">{category.loanPeriod}</p>
              </div>
            </div>
            <Button className="mt-6 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white transition duration-200">
              Apply for Loan
            </Button>
          </CardContent>
        </Card>

        {/* Subcategories */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Subcategories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.subcategories.map((subcategory) => (
            <Card key={subcategory._id} className="bg-white shadow-sm rounded-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">{subcategory.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{subcategory.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default SingleCategory
