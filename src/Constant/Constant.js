const devUrl = import.meta.env.VITE_BACKEND_DEV_URL;
const prodUrl = import.meta.env.VITE_BACKEND_PROD_URL

// export const BASE_URL = devUrl;
export const BASE_URL = prodUrl;

export const AppRoutes = {
  signUp: BASE_URL + "users/signup",
  login: BASE_URL + "users/login",
  logout: BASE_URL + "users/logout",
  getUserData: BASE_URL + "users/profile", // New route for getting user data
  getAllUser: BASE_URL + "users/getAllUsers", // New route for getting user data
  // Course Routes
  getCourses: BASE_URL + "courses",
  addCourse: BASE_URL + "courses",
  updateCourse: BASE_URL + "courses/",
  deleteCourse: BASE_URL + "courses/",
};
