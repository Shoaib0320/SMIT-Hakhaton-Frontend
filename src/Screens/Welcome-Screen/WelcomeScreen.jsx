import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import Style from '@/Styles/styles.module.css'
import Navbar from "@/Components/Navbar/Navbar";

export default function WelcomeScreen() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {/* <AnimatedBackground /> */}
        <div className="relative text-center p-6 bg-white rounded-lg shadow-lg w-11/12 ">
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
    </div>
  );
}
