// import React, { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/Context/AuthContext";
// import { AppRoutes } from "@/Constant/Constant";
// import { Form, Input, Button, message } from "antd";

// export const Login = () => {
//   const { setUser } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(AppRoutes.login, values);
//       setUser(res.data);

//       // Save token in cookies
//       Cookies.set("token", res.data.token);

//       message.success("Login successful");
//       navigate("/");
//     } catch (err) {
//       message.error(err?.response?.data?.msg || "Login failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: "#f4f4f4",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#fff",
//           padding: "20px",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           maxWidth: "360px",
//           width: "100%",
//         }}
//       >
//         <h2
//           style={{
//             textAlign: "center",
//             marginBottom: "20px",
//             fontSize: "22px",
//             fontWeight: "bold",
//             color: "#333",
//           }}
//         >
//           Login
//         </h2>
//         <Form name="login" onFinish={onFinish} layout="vertical">
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: "Please enter your email!" }]}
//           >
//             <Input
//               placeholder="Email"
//               size="large"
//               style={{
//                 borderRadius: "6px",
//               }}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Cnic"
//             name="cnic"
//             rules={[{ required: true, message: "Please enter your cnic!" }]}
//           >
//             <Input
//               placeholder="cnic"
//               size="large"
//               style={{
//                 borderRadius: "6px",
//               }}
//             />
//           </Form.Item>

//           <div
//             style={{
//               textAlign: "center",
//               marginBottom: "15px",
//               fontSize: "14px",
//               color: "#555",
//             }}
//           >
//             Don't have an account?{" "}
//             <Link to="/signup" style={{ color: "#1890ff" }}>
//               Signup
//             </Link>
//           </div>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               block
//               size="large"
//               style={{
//                 borderRadius: "6px",
//               }}
//             >
//               Login
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };







import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { AppRoutes } from "@/Constant/Constant";
import { Form, Input, Button, message } from "antd";

export const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(AppRoutes.login, {
        email: values.email,
        password: values.password, // Assuming password field for login
      });
      setUser(res.data);

      // Save token in cookies
      Cookies.set("token", res.data.token);

      message.success("Login successful");
      navigate("/");
    } catch (err) {
      message.error(err?.response?.data?.msg || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f4" }}>
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", maxWidth: "360px", width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "22px", fontWeight: "bold", color: "#333" }}>Micro Finance Login</h2>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input placeholder="Email" size="large" style={{ borderRadius: "6px" }} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input.Password placeholder="Password" size="large" style={{ borderRadius: "6px" }} />
          </Form.Item>
          <div style={{ textAlign: "center", marginBottom: "15px", fontSize: "14px", color: "#555" }}>
            Don't have an account? <Link to="/signup" style={{ color: "#1890ff" }}>Signup</Link>
          </div>
          <Form.Item>
            <button
              className="bg-[#0d6db7] w-full text-white font-semibold px-4 py-2 rounded-lg transition"
              type="primary" htmlType="submit" disabled={loading} block size="large" style={{ borderRadius: "6px" }}>
              {
                loading ?
                  'submitting'
                  :
                  'Login'
              }
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
