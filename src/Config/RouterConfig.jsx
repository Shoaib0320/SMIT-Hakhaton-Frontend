import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import WelcomeScreen from "@/Screens/Welcome-Screen/WelcomeScreen";
import { Login } from "@/Screens/Authentication/Login";
import SignUp from "@/Screens/Authentication/Signup";
import { AuthProvider } from "@/Context/AuthContext";
import LandingPage from "@/Components/LandingPage";
import LoanCalculator from "@/Components/LoanCalculator";
import AdminDashboard from "@/Components/AdminDashboard";
import LoanRequestsPage from "@/Components/LoanRequestPage";
// import Admin from "@/Screens/AdminDashboard/admin/Admin";
// import { Category } from "@/Screens/AdminDashboard/Category/Category";
// import SingleCategory from "@/Screens/Welcome-Screen/SingleCategory";

export const RouterConfig = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				{/* <Routes>
					<Route path="/" element={<WelcomeScreen />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />

					<Route path="/admin" element={<Admin />} />
					<Route path="/category" element={<Category />} />

					<Route path="/category/:id" element={<SingleCategory />} />
				</Routes> */}
				{/* <Router> */}
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/calculator" element={<LoanCalculator />} />
						<Route path="/loan-request" element={<LoanRequestsPage />} />
						<Route path="/admin" element={<AdminDashboard />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
					</Routes>
				{/* </Router> */}

			</AuthProvider>
		</BrowserRouter>
	);
};
