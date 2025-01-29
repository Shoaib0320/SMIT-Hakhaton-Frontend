import { useAuth } from "@/Context/AuthContext"
import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Style from "@/Styles/styles.module.css"
import { Avatar } from "antd"
import SidebarMenuItem from "./SidebarMenuItem"
import { Dashboard } from "@mui/icons-material"
import { Home, School, ShoppingCart } from "lucide-react"

const SidebarLayout = () => {
  const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const menuItems = [
    { title: "Dashboard", icon: <Dashboard />, link: "/admin" },
    { title: "Category", icon: <School />, link: "/category" },
    { title: "Requests", icon: <ShoppingCart />, link: "/admin/requests" },
    { title: "Appointments", icon: <Home />, link: "/admin/appointments" },
  ]

  const location = useLocation()
  const currentPath = location.pathname
  const currentPageName = menuItems.find((item) => item.link === currentPath)?.title || "Home"

  return (
    <>
      {/* full tailwind config using javascript */}
      <div className="fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
        <div className="logo ml-12 dark:text-white  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
          Admin Dashboard
        </div>
        {/* SPACER */}
        <div className="grow h-full flex items-center justify-center" />
        <div className="flex-none h-full text-center flex items-center justify-center">
          <div className="flex space-x-3 items-center px-3">
            {user ? (
              <>
                <div className="flex-none flex justify-center">
                  <div className="w-8 h-8 flex ">
                    <Avatar
                      style={{ background: "#000", color: "#0782e0" }}
                      className="flex items-center justify-center rounded-full"
                      //   size={"large"}
                    >
                      {user?.name.slice(0, 2).toUpperCase()}
                    </Avatar>
                  </div>
                </div>
                <div className="hidden md:block text-sm md:text-md text-black dark:text-white font-bold">
                  {user.name}
                </div>
              </>
            ) : (
              <Link to={"/login"} className={Style.generelButton}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <aside
        // className={`w-60 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B] ${isSidebarOpen ? "translate-x-0" : "-translate-x-48"}`}
        className={`w-60 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-48"
        }`}
      >
        {/* open sidebar button */}
        <div className="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B]  absolute top-2 rounded-full h-12"></div>
        <div
          onClick={toggleSidebar}
          className={`-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45 ${isSidebarOpen ? "rotate-45" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
        </div>
        {/* MAX SIDEBAR*/}
        <div className={`mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]`}>
          {menuItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <SidebarMenuItem title={item.title} icon={item.icon} isOpen={isSidebarOpen} />
            </Link>
          ))}
        </div>
        {/* MINI SIDEBAR*/}
        <div
          // className={`mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)] ${isSidebarOpen ? "hidden" : "flex"}`}
          className={`mt-20 ${isSidebarOpen ? "hidden" : "flex flex-col gap-5"}`}
        >
          <SidebarMenuItem
            title="Dashboard"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            }
          />
          <SidebarMenuItem
            title="Products"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            }
          />
          <SidebarMenuItem
            title="Orders"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
            }
          />
          <SidebarMenuItem
            title="Courses"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.875 8.25l-1.5-1.5-4.5 4.5-1.5-1.5-1.5 1.5 4.5 4.5-1.5 1.5 1.5 1.5 4.5-4.5 1.5 1.5 1.5-1.5-4.5-4.5z"
                />
              </svg>
            }
          />
        </div>
      </aside>
      {/* CONTENT */}
      <div className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
        <nav className="flex px-5 py-3 text-gray-700  rounded-lg bg-gray-50 dark:bg-[#1E293B] " aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Admin
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillrule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    cliprule="evenodd"
                  />
                </svg>
                <a
                  href="#"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {currentPageName}
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </>
  )
}

export default SidebarLayout

