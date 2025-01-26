import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AppRoutes } from "@/Constant/Constant";

const SingleCategory = () => {

    const { id } = useParams();


    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const categoryId = `${ id }`;

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${ AppRoutes.getSingleCategories }${ categoryId }`);
                setCategory(response.data.data); // Assuming your API returns category data in data
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch category");
                setLoading(false);
            }
        };

        fetchCategory();
    }, [categoryId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {/* BANNER-1 START */}
            <div className="container-fluid bg py-5">
                <h2 className="pt-5 text-center text-white display-4">
                    {`${category.title}`}
                </h2>
                <h5 className="mt-2 text-center text-white">
                    {`Home - ${category.title}`}
                </h5>
            </div>
            {/* BANNER-1 END */}

            <div >
                <h2>Category Details</h2>
                {category ? (
                    <div >
                        <h3>{category.title}</h3>
                        <p><strong>Description:</strong> {category.description}</p>
                        <p><strong>Max Loan:</strong> {category.maxLoan}</p>
                        <p><strong>Loan Period:</strong> {category.loanPeriod}</p>
                    </div>
                ) : (
                    <p>No category found</p>
                )}
            </div>
        </>
    );
};

export default SingleCategory;