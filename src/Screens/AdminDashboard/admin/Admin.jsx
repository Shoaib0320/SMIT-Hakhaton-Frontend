import AdminBannerLeft from "@/Components/Admin/Admin-Banner/admin-banner-Left";
import AdminBannerRight from "@/Components/Admin/Admin-Banner/admin-banner-Right";
import PassPercentageChart from "@/Components/Admin/Admin-Charts/ChartBetween";
import Top5SchoolPerformance from "@/Components/Admin/Admin-Charts/ChartLeft";
import ContentUsage from "@/Components/Admin/Admin-Charts/ChartRight";
import AdminFooterBetween from "@/Components/Admin/Admin-Footer/admin-footer-between";
import AdminFooterLeft from "@/Components/Admin/Admin-Footer/admin-footer-left";
import AdminFooterRight from "@/Components/Admin/Admin-Footer/admin-footer-Right";
import AreaChartComponent from "@/Components/Admin/Admin-Section/AdminSectionBetween";
import PopularCourses from "@/Components/Admin/Admin-Section/AdminSectionLeft";
import BestInstructors from "@/Components/Admin/Admin-Section/AdminSectionRight";
import Layout from "@/Components/Sidebar/Layout";
import React from "react";

export const Admin = () => {
  return (
    <div className="min-h-screen container mx-auto">
      <Layout />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mx-5">
        <div className="col-span-4 ">
          <AdminBannerLeft />
        </div>
        <div className="col-span-2">
          <AdminBannerRight />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 pt-10 mx-5">
        <PopularCourses />
        <AreaChartComponent />
        <BestInstructors />
      </div>
      {/* Section: Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 py-10 mx-5">
        <div className="col-span-2">
          <Top5SchoolPerformance />
        </div>
        <div className="col-span-2">
          <PassPercentageChart />
        </div>
        <div className="col-span-2">
          <ContentUsage />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10  mx-5">
        <AdminFooterLeft />
        <AdminFooterBetween />
        <AdminFooterRight />
      </div>
      {/* Admin Footer */}
      <div className="w-full flex items-center justify-between bg-gray-100 py-5 px-10 rounded-xl my-5">
        <div className="text-gray-500 ">
          <h2 className="text-center">
            <span className="text-xl text-center">&#169;</span> SHOIB TEAM : F
            ♥️
          </h2>
        </div>
        <div className="text-gray-500 ">
          <h2 className="text-center"> 2024 🌏 </h2>
        </div>
      </div>
    </div>
  );
};
