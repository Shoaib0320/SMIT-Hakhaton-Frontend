const devUrl = import.meta.env.VITE_BACKEND_DEV_URL;
const prodUrl = import.meta.env.VITE_BACKEND_PROD_URL

// export const BASE_URL = devUrl;
export const BASE_URL = prodUrl;

export const AppRoutes = {
  signUp: BASE_URL + "users/signup",
  login: BASE_URL + "users/login",
  logout: BASE_URL + "users/logout",
  getUserData: BASE_URL + "users/profile", // New route for getting user data
  // getAllUser: BASE_URL + "users/getAllUsers", // New route for getting user data
  // Categories Routes
  getCategories: BASE_URL + "category",
  addCategory: BASE_URL + "category",
  updateCategory: BASE_URL + "category/",
  deleteCategory: BASE_URL + "category/",

  submitLoan: BASE_URL + "users/submit-loan",
  generateSlip: BASE_URL + "users/generateSlip",
  getLoanRequests: BASE_URL + "users/getLoanRequests",
  getAllLoanRequests: BASE_URL + "admin/getAllLoanRequests",

  updateApplicationStatus: BASE_URL + "admin/update-status",
  createAppointment: BASE_URL + "admin/createAppointment",

  //
  getCategoriesWithSubCategories: BASE_URL + "category/with-subcategories",
  getSingleCategories: BASE_URL + "category/singleCategory/",

   // SubCategories Routes
   getSubCategories: BASE_URL + "subCategory",
   addSubCategory: BASE_URL + "subCategory",
   updateSubCategory: BASE_URL + "subCategory/",
   deleteSubCategory: BASE_URL + "subCategory/",

   addCalculate: BASE_URL + "calculate/calculate",
};
