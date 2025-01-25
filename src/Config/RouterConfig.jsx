import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeScreen from "@/Screens/Welcome-Screen/WelcomeScreen";
import { Login } from "@/Screens/Authentication/Login";
import SignUp from "@/Screens/Authentication/Signup";
import { AuthProvider } from "@/Context/AuthContext";
import { Courses } from "@/Screens/AdminDashboard/Courses/Courses";
import Admin from "@/Screens/AdminDashboard/admin/Admin";

export const RouterConfig = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<WelcomeScreen />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />

					<Route path="/admin" element={<Admin />} />
					<Route path="/course" element={<Courses />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};
