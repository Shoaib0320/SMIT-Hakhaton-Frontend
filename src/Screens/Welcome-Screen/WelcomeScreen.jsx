// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/Context/AuthContext";
// import { useEffect } from "react";
// import { AnimatedBackground } from "./AnimatedBackGround";

// export default function WelcomeScreen() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate(); // To navigate to different routes based on the role

//   // useEffect(() => {
//   //   if (user) {
//   //     // Redirect based on user role
//   //     if (user.role === "student") {
//   //       navigate("/studentDashboard"); // Redirect to student dashboard
//   //     } else if (user.role === "teacher") {
//   //       navigate("/teacherDashboard"); // Redirect to teacher dashboard
//   //     } else if (user.role === "admin") {
//   //       navigate("/admin"); // Redirect to admin dashboard
//   //     }
//   //   }
//   // }, [user, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center overflow-hidden">
//       <AnimatedBackground />
//       <div className="relative z-10 text-center px-4">
//         <motion.div
//           initial={{ scale: 0, rotate: -180 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ duration: 1, type: "spring" }}
//           className="mb-8"
//         >
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s"
//             alt="Logo"
//             className="w-32 h-32 mx-auto rounded-full bg-white p-2 shadow-lg"
//           />
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
//         >
//           Welcome to SMIT Portal
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 1 }}
//           className="text-xl sm:text-2xl text-white mb-8 drop-shadow"
//         >
//           Streamline school management, class organization, and add students and
//           faculty. Seamlessly track attendance, assess performance, and provide
//           feedback. Access records, view marks, and communicate effortlessly.
//         </motion.p>

//         {user ? (
//           <>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 1 }}
//               className="text-xl sm:text-2xl text-white mb-8 drop-shadow"
//             >
//               Hello, <strong>{user.name}</strong> (<em>{user.email}</em>)
//             </motion.p>

//             <motion.button
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 1.5 }}
//               className="text-white bg-red-500 font-bold py-3 px-8 rounded-full text-lg sm:text-xl hover:bg-red-600 transition duration-300 shadow-lg"
//               onClick={logout}
//             >
//               Logout
//             </motion.button>
//           </>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.5 }}
//             className="space-x-4"
//           >
//             <Link
//               to={"/login"}
//               className="text-white bg-gradient-to-br from-blue-500 to-green-400 font-bold py-3 px-8 rounded-full text-lg sm:text-xl hover:bg-blue-100 transition duration-300 shadow-lg"
//             >
//               Login
//             </Link>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }










import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import Style from '@/Styles/styles.module.css'

export default function WelcomeScreen() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* <AnimatedBackground /> */}
      <div className="relative z-10 text-center p-6 bg-white rounded-lg shadow-lg w-11/12 ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s"
          alt="Logo"
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-200 p-2"
        />

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Welcome to SMIT Portal
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Streamline school management, class organization, and add students and
          faculty. Seamlessly track attendance, assess performance, and provide
          feedback. Access records, view marks, and communicate effortlessly.
        </p>

        {user ? (
          <>
            <p className="text-gray-700 text-lg mb-6">
              Hello, <strong>{user.name}</strong> (<em>{user.email}</em>)
            </p>

            <button
              className="text-white bg-red-500 font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to={"/login"}
            className={Style.generelButton}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
