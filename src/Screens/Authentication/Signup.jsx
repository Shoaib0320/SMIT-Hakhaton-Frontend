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
        background: "#f4f4f4",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          background: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "22px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          Signup
        </h2>
        <Form name="signup" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "16px",
              }}
              size="large"
              loading={loading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div
          style={{
            fontSize: "14px",
            textAlign: "center",
            color: "#777",
            marginTop: "16px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#1890ff",
              fontWeight: "500",
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
