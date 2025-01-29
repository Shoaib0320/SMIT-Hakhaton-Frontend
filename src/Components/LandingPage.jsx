import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import HeroSection from "./HeroSection/HeroSection";

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
            <div className="landing-page min-h-screen bg-white flex flex-col items-center p-6">
                <h1 className="text-5xl font-extrabold text-[#0d6db7] mb-6 drop-shadow-md">
                    Saylani Microfinance App
                </h1>
                <HeroSection />
                <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
                    Empowering communities with accessible microfinance solutions. Select a loan category to get started:
                </p>
                <div className="categories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="category-card bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow border border-gray-200 hover:scale-105 transform duration-200"
                        >
                            <h3 className="text-2xl font-bold text-[#0d6db7] mb-4">{category.name}</h3>
                            <ul className="list-none list-inside text-gray-600 mb-6 space-y-2">
                                {category.subcategories.map((sub, i) => (
                                    <li key={i} className="text-base">
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="w-full bg-[#0d6db7] text-white px-6 py-3 rounded-lg font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
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
