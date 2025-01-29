// // import React, { useState } from "react";
// // import { Form, Input, Button, message } from "antd";
// // import axios from "axios";
// // import { Link, useNavigate } from "react-router-dom";
// // import { AppRoutes } from "@/Constant/Constant";

// // export default function SignUp() {
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   // Submit Function
// //   const onFinish = async (values) => {
// //     setLoading(true);
// //     try {
// //       // Backend API call
// //       const response = await axios.post(AppRoutes.signUp, {
// //         name: values.name,
// //         email: values.email,
// //         cnic: values.cnic,
// //       });

// //       console.log("response", response);

// //       // Success Message
// //       message.success("Signup successful! Please log in.");
// //       navigate("/login"); // Redirect to Login
// //     } catch (error) {
// //       console.error("Signup failed:", error.response?.data || error.message);
// //       message.error(error.response?.data?.message || "Signup failed!");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         height: "100vh",
// //         background: "#f4f4f4",
// //         padding: "20px",
// //       }}
// //     >
// //       <div
// //         style={{
// //           width: "100%",
// //           maxWidth: "400px",
// //           padding: "25px",
// //           borderRadius: "8px",
// //           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
// //           background: "#fff",
// //         }}
// //       >
// //         <h2
// //           style={{
// //             textAlign: "center",
// //             marginBottom: "20px",
// //             fontSize: "22px",
// //             fontWeight: "500",
// //             color: "#333",
// //           }}
// //         >
// //           Signup
// //         </h2>
// //         <Form name="signup" onFinish={onFinish} layout="vertical">
// //           <Form.Item
// //             label="Name"
// //             name="name"
// //             rules={[{ required: true, message: "Please input your name!" }]}
// //           >
// //             <Input placeholder="Enter your name" size="large" />
// //           </Form.Item>
// //           <Form.Item
// //             label="Email"
// //             name="email"
// //             rules={[{ required: true, message: "Please input your email!" }]}
// //           >
// //             <Input placeholder="Enter your email" size="large" />
// //           </Form.Item>
// //           <Form.Item
// //             label="Cnic"
// //             name="cnic"
// //             rules={[{ required: true, message: "Please input your password!" }]}
// //           >
// //             <Input placeholder="Enter your cnic" size="large" />
// //           </Form.Item>
// //           <Form.Item>
// //             <Button
// //               type="primary"
// //               htmlType="submit"
// //               style={{
// //                 width: "100%",
// //                 padding: "10px",
// //                 borderRadius: "5px",
// //                 fontSize: "16px",
// //               }}
// //               size="large"
// //               loading={loading}
// //             >
// //               Sign Up
// //             </Button>
// //           </Form.Item>
// //         </Form>
// //         <div
// //           style={{
// //             fontSize: "14px",
// //             textAlign: "center",
// //             color: "#777",
// //             marginTop: "16px",
// //           }}
// //         >
// //           Already have an account?{" "}
// //           <Link
// //             to="/login"
// //             style={{
// //               color: "#1890ff",
// //               fontWeight: "500",
// //               textDecoration: "none",
// //             }}
// //           >
// //             Login
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { Form, Input, Button, message } from "antd";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { AppRoutes } from "@/Constant/Constant";

// export default function SignUp() {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Submit Function
//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       // Backend API call
//       const response = await axios.post(AppRoutes.signUp, {
//         name: values.name,
//         email: values.email,
//         password: values.password,
//         cnic: values.cnic,
//       });

//       console.log("response", response);

//       // Success Message
//       message.success("Signup successful! Please log in.");
//       navigate("/login"); // Redirect to Login
//     } catch (error) {
//       console.error("Signup failed:", error.response?.data || error.message);
//       message.error(error.response?.data?.message || "Signup failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           background: "#f0f2f5",
//         }}
//       >
//         <div
//           className="bg-white/2 isolate backdrop-blur-md max-w-[400px] w-full p-[20px] rounded-xl aspect-video ring-1 ring-black/5 shadow-2xl"
//         >
//           <h2
//             style={{
//               textAlign: "center",
//               marginBottom: "26px",
//               fontSize: "24px",
//               fontWeight: "bold",
//               color: "#ffff",
//             }}
//             className="mt-4"
//           >
//             Micro Finance Signup
//           </h2>
//           <Form name="signup" onFinish={onFinish} layout="vertical">
//             <Form.Item
//               label={
//                 <label className="text-white text-md uppercase font-bold">
//                   Name
//                 </label>
//               }
//               name="name"
//               rules={[{ required: true, message: "Please input your name!" }]}
//             >
//               <Input placeholder="Name" size="large" />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className="text-white text-md uppercase font-bold">
//                   {" "}
//                   Email
//                 </label>
//               }
//               name="email"
//               rules={[{ required: true, message: "Please input your email!" }]}
//             >
//               <Input placeholder="Email" size="large" />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className="text-white text-md uppercase font-bold">
//                   Cnic
//                 </label>
//               }
//               name="cnic"
//               rules={[
//                 { required: true, message: "Please input your cnic!" },
//               ]}
//             >
//               <Input placeholder="Cnic" size="large" />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className="text-white text-md uppercase font-bold">
//                   Password
//                 </label>
//               }
//               name="password"
//               rules={[
//                 { required: true, message: "Please input your password!" },
//               ]}
//             >
//               <Input.Password placeholder="Password" size="large" />
//             </Form.Item>
//             <Form.Item>
//               <button
//                 type="primary"
//                 className="bg-[#0d6db7] w-full text-white font-semibold px-4 py-2 rounded-lg transition"
//                 htmlType="submit"
//                 style={{ width: "100%" }}
//                 size="large"
//                 loading={loading}
//               >
//                 Sign Up
//               </button>
//             </Form.Item>
//           </Form>

//           {/* Login Link Styled */}
//           <div
//             style={{
//               fontSize: "18px",
//               textAlign: "center",
//               color: "#fff",
//               marginBottom: "16px",
//             }}          >
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               style={{
//                 color: "#0561a6",
//                 fontWeight: "bold",
//                 textDecoration: "none",
//               }}
//             >
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "@/Constant/Constant";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Submit Function
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Backend API call
      const response = await axios.post(AppRoutes.signUp, {
        name: values.name,
        email: values.email,
        password: values.password,
        cnic: values.cnic,
      });

      console.log("response", response);

      // Success Message
      message.success("Signup successful! Please log in.");
      navigate("/login"); // Redirect to Login
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="bg-white shadow-lg rounded-xl p-6 max-w-[420px] w-full"
        style={{
          backdropFilter: "blur(10px)",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "26px",
            fontWeight: "600",
            color: "#333",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Micro Finance Signup
        </h2>

        <Form name="signup" onFinish={onFinish} layout="vertical">
          <Form.Item
            label={<label className="text-gray-700 font-medium">Name</label>}
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" size="large" />
          </Form.Item>

          <Form.Item
            label={<label className="text-gray-700 font-medium">Email</label>}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            label={<label className="text-gray-700 font-medium">CNIC</label>}
            name="cnic"
            rules={[{ required: true, message: "Please input your CNIC!" }]}
          >
            <Input placeholder="Enter your CNIC" size="large" />
          </Form.Item>

          <Form.Item
            label={<label className="text-gray-700 font-medium">Password</label>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>

          <Form.Item>
            <button
              type="primary"
              htmlType="submit"
              className="bg-[#0d6db7] w-full text-white font-semibold px-4 py-2 rounded-lg transition"
              // size="large"
              disabled={loading}
            >
              {
                loading ?
                  'submitting' 
                  :
                  'Sign Up'
              }
            </button>
          </Form.Item>
        </Form>

        {/* Login Link Styled */}
        <div
          style={{
            fontSize: "16px",
            textAlign: "center",
            color: "#555",
            marginTop: "16px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#00796b",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
