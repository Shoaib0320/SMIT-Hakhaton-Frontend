// import React from "react";
// import { useNavigate } from "react-router-dom";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   const categories = [
//     { name: "Wedding Loans", subcategories: ["Valima", "Furniture", "Jahez"] },
//     { name: "Home Construction Loans", subcategories: ["Structure", "Finishing"] },
//     { name: "Business Startup Loans", subcategories: ["Buy Stall", "Shop Assets"] },
//     { name: "Education Loans", subcategories: ["University Fees", "Child Fees Loan"] },
//   ];

//   return (
//     <div className="landing-page">
//       <h1>Saylani Microfinance App</h1>
//       <p>Select a loan category to proceed:</p>
//       <div className="categories">
//         {categories.map((category, index) => (
//           <div key={index} className="category-card">
//             <h3>{category.name}</h3>
//             <ul>
//               {category.subcategories.map((sub, i) => (
//                 <li key={i}>{sub}</li>
//               ))}
//             </ul>
//             <button onClick={() => navigate("/calculator", { state: { category } })}>
//               Calculate Loan
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LandingPage;



import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const LandingPage = () => {
    const navigate = useNavigate();

    const categories = [
        { name: "Wedding Loans", subcategories: ["Valima", "Furniture", "Jahez"] },
        { name: "Home Construction Loans", subcategories: ["Structure", "Finishing"] },
        { name: "Business Startup Loans", subcategories: ["Buy Stall", "Shop Assets"] },
        { name: "Education Loans", subcategories: ["University Fees", "Child Fees Loan"] },
    ];

    return (
        <>
            <Navbar />
            <div className="landing-page min-h-screen bg-gray-50 flex flex-col items-center p-6">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">Saylani Microfinance App</h1>
                <p className="text-lg text-gray-700 mb-6">Select a loan category to proceed:</p>
                <div className="categories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="category-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
                        >
                            <h3 className="text-2xl font-semibold text-blue-500 mb-4">{category.name}</h3>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                {category.subcategories.map((sub, i) => (
                                    <li key={i} className="text-sm mb-1">
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                onClick={() => navigate("/calculator", { state: { category } })}
                            >
                                Calculate Loan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LandingPage;
