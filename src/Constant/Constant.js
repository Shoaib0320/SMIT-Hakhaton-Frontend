const devUrl = "http://localhost:1222/";
const prodUrl = "https://smit-hakhaton-backend-production.up.railway.app/"

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
  // Batch Routes
  getBatch: BASE_URL + "batches",
  addBatch: BASE_URL + "batches",
  updateBatch: BASE_URL + "batches/",
  deleteBatch: BASE_URL + "batches/", // Add batch ID as needed
  // Sections Routes
  getSections: BASE_URL + "section",
  addSection: BASE_URL + "section",
  updateSection: BASE_URL + "section/", // Add section ID as needed
  deleteSection: BASE_URL + "section/", // Add section ID as needed
  // Campus Routes
  getCampus: BASE_URL + "campus",
  addCampus: BASE_URL + "campus",
  updateCampus: BASE_URL + "campus/", // Add Campus ID as needed
  deleteCampus: BASE_URL + "campus/", // Add Campus ID as needed
  // Trainer Routes
  getTrainer: BASE_URL + "trainers",
  addTrainer: BASE_URL + "trainers",
  updateTrainer: BASE_URL + "trainers/",
  deleteTrainer: BASE_URL + "trainers/",
  // Student Routes
  getStudents: BASE_URL + "student",
  addStudent: BASE_URL + "student",
  updateStudent: BASE_URL + "student",
  deleteStudent: BASE_URL + "student",
  // Assignments Routes
  getAssignments: BASE_URL + "assignment",
  addAssignment: BASE_URL + "assignment/upload",
  // Submit Assignments Routes
  submitAssignment: BASE_URL + "assignmentSubmission/submit",
  getSubmittedAssignments: BASE_URL + "assignmentSubmission/submitted-assignments",
  updateSubmission: BASE_URL + "assignmentSubmission/update",
  deleteSubmission: BASE_URL + "assignmentSubmission/delete",
  getStudentSubmission: BASE_URL + "assignmentSubmission/student-submission",
  // Announcements Routes
  getAnnouncements: BASE_URL + "announcements",
  addAnnouncements: BASE_URL + "announcements",
  getPersonalAnnouncements: BASE_URL + "personalAnnouncements",
  addPersonalAnnouncements: BASE_URL + "personalAnnouncements",
  // Exam Routes
  getExams: BASE_URL + "exam/getExams",
  addExam: BASE_URL + "exam/createExam",
  addStudentComment: BASE_URL + "commentProblem",
  getStudentComment: BASE_URL + "commentProblem",
  getClassWorkComments: BASE_URL + "commentProblem",

  getTeacherAnnouncements: BASE_URL + "teacherAnnouncement/getTeacherAnnouncement",
  addTeacherAnnouncement: BASE_URL + "teacherAnnouncement/add",

  getStudentCourses: BASE_URL + "student/courses",
  // Route for trainer courses
  getTrainerCourses: BASE_URL + "trainers/courses",
  // Courses Outline
  getCoursesOutline: BASE_URL + "module/courseOutline",
  getTrainerCourseOutlines: BASE_URL + "module/course-outlines",
  addCoursesModule: BASE_URL + "module/module",
  getCoursesModule: BASE_URL + "module/modules",
  addModulesTopic: BASE_URL + "module/topic",
  getModulesTopic: BASE_URL + "module/topics",
  addChapters: BASE_URL + "module/chapters",

  getTrainerAssignments: BASE_URL + "assignment/trainerAssignments",
  getStudentAssignments: BASE_URL + "assignment/studentAssignments",
  getClassWorks: BASE_URL + "classWork/get-class-works",
  addClassWork: BASE_URL + "classWork/submit-class-work",
  getClassWorksByStudent: BASE_URL + "classWork/student-class-works",
  getTeachingActivity: BASE_URL + "teachingActivity",
  getTeacherClassWorkActivity: BASE_URL + "classWork/teacher-class-work-activity",
  getStudentAssignmentStats: BASE_URL + "assignmentSubmission/student-assignments-stats",
};
