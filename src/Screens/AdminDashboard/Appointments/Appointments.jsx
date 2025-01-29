// import React, { useState, useEffect } from "react"
// import axios from "axios"
// import { AppRoutes } from "@/Constant/Constant"
// import SidebarLayout from "../components/Sidebar/SidebarLayout"

// export const Appointments = () => {
//   const [appointments, setAppointments] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get(AppRoutes.getAllAppointments)
//         setAppointments(response.data.appointments)
//         setLoading(false)
//       } catch (err) {
//         setError("Failed to fetch appointments")
//         setLoading(false)
//       }
//     }

//     fetchAppointments()
//   }, [])

//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
//   if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

//   return (
//     <div className="min-h-screen">
//       <SidebarLayout />
//       <div className="bg-white py-12 px-4 lg:ml-20 md:ml-20 sm:hidden">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Appointments</h1>
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Token Number
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date & Time
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Office Location
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     User
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Loan Details
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {appointments.map((appointment) => (
//                   <tr key={appointment._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {appointment.tokenNumber}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <div>{new Date(appointment.date).toLocaleDateString()}</div>
//                       <div>{appointment.time}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.officeLocation}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{appointment.loanRequest.user.name}</div>
//                       <div className="text-sm text-gray-500">{appointment.loanRequest.user.email}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{appointment.loanRequest.category}</div>
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           appointment.loanRequest.status === "Approved"
//                             ? "bg-green-100 text-green-800"
//                             : appointment.loanRequest.status === "Pending"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {appointment.loanRequest.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Responsive card view for mobile */}
//         <div className="mt-4 grid grid-cols-1 gap-4 sm:hidden">
//           {appointments.map((appointment) => (
//             <div key={appointment._id} className="bg-white shadow rounded-lg p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="font-bold text-gray-700">{appointment.tokenNumber}</span>
//                 <span
//                   className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     appointment.loanRequest.status === "Approved"
//                       ? "bg-green-100 text-green-800"
//                       : appointment.loanRequest.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {appointment.loanRequest.status}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600">
//                 {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
//               </p>
//               <p className="text-sm text-gray-600">{appointment.officeLocation}</p>
//               <div className="mt-2">
//                 <p className="text-sm font-medium text-gray-900">{appointment.loanRequest.user.name}</p>
//                 <p className="text-sm text-gray-500">{appointment.loanRequest.user.email}</p>
//               </div>
//               <p className="mt-2 text-sm text-gray-600">Loan Category: {appointment.loanRequest.category}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }





import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";
import SidebarLayout from "../components/Sidebar/SidebarLayout";

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(AppRoutes.getAllAppointments);
        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading)
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
  if (error)
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">{error}</div>;

  return (
    <div className="min-h-screen">
      <SidebarLayout />
      <div className="bg-white py-12 px-4 lg:ml-20 md:ml-20 hidden sm:block rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-[#0d6db7]">Appointments</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-[#0d6db7] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Token Number</th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Office Location</th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Loan Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment.tokenNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div>{new Date(appointment.date).toLocaleDateString()}</div>
                      <div>{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appointment.officeLocation}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{appointment.loanRequest.user.name}</div>
                      <div className="text-sm text-gray-500">{appointment.loanRequest.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.loanRequest.category}</div>
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full shadow-lg ${
                          appointment.loanRequest.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : appointment.loanRequest.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.loanRequest.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile View Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:hidden">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="bg-white shadow-xl rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-gray-800">{appointment.tokenNumber}</span>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  appointment.loanRequest.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : appointment.loanRequest.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {appointment.loanRequest.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
            </p>
            <p className="text-sm text-gray-600">{appointment.officeLocation}</p>
            <div className="mt-3">
              <p className="text-sm font-bold text-gray-900">{appointment.loanRequest.user.name}</p>
              <p className="text-sm text-gray-500">{appointment.loanRequest.user.email}</p>
            </div>
            <p className="mt-3 text-sm text-gray-600">Loan Category: {appointment.loanRequest.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
