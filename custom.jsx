import React from "react";
import {
	HomeOutlined,
	MailOutlined,
	CalendarTodayOutlined,
	GroupOutlined,
	WidgetsOutlined,
	LockOutlined,
	AssignmentOutlined,
	MenuBookOutlined,
	AccountCircle,
	GradingOutlined,
	Settings,
	ClassOutlined,
} from "@mui/icons-material";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

const Sidebar = ({ isMobile, isCollapsed, toggleSidebar }) => {
	const { user, logout } = useAuth(); // Context se user ka data lein

	const handleLogout = () => {
		logout(); // Calls the logout function from context
	};
	return (
		<div
			className={`bg-white shadow text-gray-400 h-screen ${
				isMobile
					? `fixed top-0 left-0 z-50 w-64 transition-transform duration-300 ${
							isCollapsed ? "-translate-x-full" : "translate-x-0"
					  }`
					: `transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`
			}`}
		>
			<div className="flex flex-col p-4">
				{isMobile && (
					<div className="flex items-end justify-end">
						<button
							className="text-gray-400 font-bold text-xl"
							onClick={toggleSidebar}
						>
							✕
						</button>
					</div>
				)}

				{isMobile ? (
					<span className="w-40">
						<img
							className="w-full"
							src="https://mir-s3-cdn-cf.behance.net/projects/404/df812e210053451.Y3JvcCwxNTAwLDExNzMsMCwxNjM.png"
							alt="Logo"
						/>
					</span>
				) : (
					<span className="w-50">
						<img
							className="w-full"
							src="https://mir-s3-cdn-cf.behance.net/projects/404/df812e210053451.Y3JvcCwxNTAwLDExNzMsMCwxNjM.png"
							alt="Logo"
						/>
					</span>
				)}
			</div>
			<ul className="space-y-1 mt-2">
				<li
					className={`flex items-center gap-2 p-3 font-bold text-xl  hover:text-blue-400 hover:scale-105 transition-all cursor-pointer ${
						isCollapsed ? "justify-center" : "justify-start"
					}`}
				>
					<Link to="/teacherdashboard">
						<HomeOutlined fontSize="medium" />
						{!isCollapsed && <span className="ml-4">Overview</span>}
					</Link>
				</li>
				<li
					className={`flex items-center gap-2 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
						isCollapsed ? "justify-center" : "justify-start"
					}`}
				>
					<Link to="/trainerstudent">
						<GroupOutlined fontSize="medium" />
						{!isCollapsed && <span className="ml-4">Students</span>}
					</Link>
				</li>
				<li
					className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
						isCollapsed ? "justify-center" : "justify-start"
					}`}
				>
					<Link to="/trainercourse">
						<MenuBookOutlined fontSize="medium" />
						{!isCollapsed && <span className="ml-4">Courses</span>}
					</Link>
				</li>
				<li
					className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
						isCollapsed ? "justify-center" : "justify-start"
					}`}
				>
					<Link to={"/trainerAssignment"}>
						<AssignmentOutlined fontSize="medium" />
						{!isCollapsed && <span className="ml-4">Assignment</span>}
					</Link>
				</li>

				<li
					className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
						isCollapsed ? "justify-center" : "justify-start"
					}`}
				>
					<Link to={"/trainerClassWork"}>
						<ClassOutlined fontSize="medium" />
						{!isCollapsed && <span className="ml-4">Class Work</span>}
					</Link>
				</li>

				<Link to={"/TrainerAttendence"}>
					<li
						className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
							isCollapsed ? "justify-center" : "justify-start"
						}`}
					>
						<GradingOutlined fontSize="medium" />
						{!isCollapsed && <span>Attendence</span>}
					</li>
				</Link>

				<li
					className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
						isCollapsed ? "justify-center" : "justify-start"
					}`}
				>
					<Settings fontSize="medium" />
					{!isCollapsed && <span>Setting</span>}
				</li>
				<li
					onClick={handleLogout}
					className={`flex items-center gap-4 p-3 hover:text-blue-400 font-bold text-xl cursor-pointer hover:scale-105 transition-all ${
						isCollapsed ? "justify-center" : "justify-start"
					}`}
				>
					<LogOut fontSize="medium" />
					{!isCollapsed && <span>Logout</span>}
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
