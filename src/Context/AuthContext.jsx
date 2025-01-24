import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AppRoutes } from "@/Constant/Constant";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    console.log('token in authcontext', token)
    if (token) {
      console.log('REACT_APP_BACKEND_URL', import.meta.env.VITE_REACT_APP_BACKEND_URL)
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {

      const res = await axios.get(AppRoutes.getUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // If you also need cookies for the request
      });
      console.log('res.user', res.data.user)
      setUser(res.data.user);
    } catch (err) {
      console.log("Not logged in");
    }
  };


  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
