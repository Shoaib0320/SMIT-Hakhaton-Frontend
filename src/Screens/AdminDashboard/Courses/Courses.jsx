import React, { useState } from "react";
import { Course } from "@/Components/Course-Pages/Course";
import { Batches } from "@/Components/Course-Pages/Batches";
import { Section } from "@/Components/Course-Pages/Section";
import Layout from "@/Components/Sidebar/Layout";


export const Courses = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    { value: "course", label: "Course", component: <Course /> },
    { value: "batch", label: "Batches", component: <Batches /> },
    { value: "section", label: "Section", component: <Section /> },
  ];

  return (
    
    <div className="min-h-screen">
      <Layout />
      <div className="container mx-auto px-4 py-8">
        {/* Tabs navigation */}
        <div className="mb-4 flex flex-wrap justify-center gap-4">
          {tabs.map((tab, index) => (
            <button
              key={tab.value}
              className={`px-6 py-2 rounded-lg font-medium transition-all text-sm w-full sm:w-auto ${index === activeTabIndex
                  ? "bg-[#0561a6] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        

        {/* Display active tab content without table border */}
        <div
          // className="p-4 bg-gray-50 rounded-lg shadow-lg border-2 border-gray-300 max-w-full mx-auto"
        >
          {/* Content section adjusted for both mobile and desktop */}
          <div className="h-full flex flex-col">
            {tabs[activeTabIndex].component}
          </div>
        </div>
      </div>
      
    </div>
  );
};
