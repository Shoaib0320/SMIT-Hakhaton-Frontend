// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/Context/AuthContext";
// import Style from '@/Styles/styles.module.css'
// import Navbar from "@/Components/Navbar/Navbar";
// import HeroSection from "@/Components/HeroSection/HeroSection";

// export default function WelcomeScreen() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//         {/* <AnimatedBackground /> */}
//         {/* <div className="relative text-center p-6 bg-white rounded-lg shadow-lg w-11/12 ">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s"
//             alt="Logo"
//             className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-200 p-2"
//           />

//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
//             Welcome to SMIT Hakhaton
//           </h1>

//           <p className="text-gray-600 text-lg mb-6">
//             Streamline school management, class organization, and add students and
//             faculty. Seamlessly track attendance, assess performance, and provide
//             feedback. Access records, view marks, and communicate effortlessly.
//           </p>

//           {user ? (
//             <>
//               <p className="text-gray-700 text-lg mb-6">
//                 Hello, <strong>{user.name}</strong> (<em>{user.email}</em>)
//               </p>

//               <button
//                 className="text-white bg-red-500 font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
//                 onClick={logout}
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link
//               to={"/login"}
//               className={Style.generelButton}
//             >
//               Login
//             </Link>
//           )}
//         </div> */}
//         <HeroSection />
//       </div>
//     </div>
//   );
// }

import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Home from "./Home";

const categories = [
  {
    name: "Wedding Loans",
    maxLoan: "PKR 5 Lakh",
    loanPeriod: "3 years",
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
  },
  {
    name: "Home Construction Loans",
    maxLoan: "PKR 10 Lakh",
    loanPeriod: "5 years",
    subcategories: ["Structure", "Finishing", "Loan"],
  },
  {
    name: "Business Startup Loans",
    maxLoan: "PKR 10 Lakh",
    loanPeriod: "5 years",
    subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
  },
  {
    name: "Education Loans",
    maxLoan: "Based on requirement",
    loanPeriod: "4 years",
    subcategories: ["University Fees", "Child Fees Loan"],
  },
];

export default function WelcomeScreen() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gray-100 text-gray-800">
        {/* Hero Section */}
        {/* <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-10 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Saylani Microfinance</h1>
          <p className="text-lg mb-6">Empowering lives with easy and accessible financial solutions.</p>
          <Button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100">
            Apply for a Loan
          </Button>
        </header>

      <main className="py-10 px-4 container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Loan Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="rounded-lg shadow-lg bg-white">
                <CardHeader className="p-4 border-b">
                  <h3 className="text-xl font-bold text-blue-600">{category.name}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Maximum Loan:</strong> {category.maxLoan}
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    <strong>Loan Period:</strong> {category.loanPeriod}
                  </p>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="subcategories">
                      <AccordionTrigger className="text-blue-600 font-semibold">
                        View Subcategories
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                          {category.subcategories.map((sub, idx) => (
                            <li key={idx}>{sub}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <div className="p-4">
                  <Button className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700">
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main> */}

        <Home />

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-10">
          <div className="text-center">
            <p>&copy; 2025 Saylani Microfinance. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
