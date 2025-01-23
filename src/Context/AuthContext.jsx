import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AppRoutes } from "@/Constant/Constant";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [classWorks, setClassWorks] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState({})

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
      if (res.data.user.role === 'student') {
        fetchStudentCourses(res.data.user._id);
        fetchStudentAssignments(res.data.user._id);
        fetchStudentClassWorks(res.data.user._id);
        fetchSubmissionStatus(res.data.user._id)
      }
    } catch (err) {
      console.log("Not logged in");
    }
  };

  const fetchStudentCourses = async (userId) => {
    try {
      const res = await axios.get(`${AppRoutes.getStudentCourses}/${userId}`, { withCredentials: true });
      console.log('Student Courses', res.data);
      setCourses(res.data);
      setStudentData(res.data.student);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  };

  const fetchStudentAssignments = async (userId) => {
    try {
      const res = await axios.get(`${AppRoutes.getStudentAssignments}/${userId}`, { withCredentials: true });
      setAssignments(res.data);
    } catch (error) {
      console.error('Error fetching student assignments:', error);
    }
  };

  // Fetch submission status
  const fetchSubmissionStatus = async () => {
    try {
      const response = await axios.get(AppRoutes.getSubmissionStatus)
      setSubmissionStatus(response.data)
    } catch (error) {
      console.error("Error fetching submission status:", error)
    }
  }


  const fetchStudentClassWorks = async (userId) => {
    try {
      console.log('Fetching class works for user ID:', userId);
      const res = await axios.get(`${AppRoutes.getClassWorksByStudent}/${userId}`, {
        withCredentials: true
      });
      if (Array.isArray(res.data)) {
        setClassWorks(res.data);
      } else {
        console.error('Unexpected response format:', res.data);
        setClassWorks([]);
      }
    } catch (error) {
      console.error('Error fetching student class works:', error.response?.data || error.message);
      setClassWorks([]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setStudentData(null);
    setCourses([]);
    setAssignments([]);
    setClassWorks([]);
    navigate('/');
  };

  const refreshClassWorks = async () => {
    if (user && user.role === 'student') {
      await fetchStudentClassWorks(user._id);
    }
  };

  const refreshAssignments = async () => {
    if (user && user.role === 'student') {
      await fetchStudentAssignments(user._id);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      logout,
      courses,
      assignments,
      refreshAssignments,
      submissionStatus,
      studentData,
      classWorks,
      refreshClassWorks
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
