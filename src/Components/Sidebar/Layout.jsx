import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./Layout.css"; // Import your custom CSS
import Sidebar from "./Sidebar";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CssBaseline,
  Drawer,
} from "@mui/material";
import AdminDashboard from "./components/AdminDashboard";
import { Avatar, Button } from "antd";
import { useAuth } from "@/Context/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <CssBaseline />
      {/* Main Layout Box */}
      <Box
        sx={{
          margin: "20px",
          background: "#f5f5f5",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          marginBottom: 15,
          position: "relative", // Ensure content is stackable
          zIndex: 1, // Base content zIndex
        }}
      >
        {/* AppBar */}
        <AppBar
          sx={{
            background: "#0561a7",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            width: "calc(100% - 40px)",
            margin: "10px 20px",
            borderRadius: "8px",
            zIndex: 2, // AppBar on top of content
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className="flex justify-between items-center font-serif "
              variant="h6"
              sx={{
                flexGrow: 1,
                // fontFamily: "Playfair Display, serif",
                fontWeight: "bold",
                letterSpacing: "0.1rem",
                color: "#ffffff",
              }}
            >
              Admin Dashboard
              <div className="flex items-center gap-4">
                <Avatar
                  style={{ background: "#fff", color: "#0782e0" }}
                  className="flex items-center justify-center"
                  size={"large"}
                >
                  {user?.name.slice(0, 2).toUpperCase()}
                </Avatar>
                <Button
                  color="danger"
                  variant="solid"
                  className="font-bold"
                  onClick={handleLogout}
                >
                  LogOut
                </Button>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar as Drawer */}
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={toggleDrawer}
          sx={{
            zIndex: 3, // Ensure Drawer is on top of everything
            "& .MuiDrawer-paper": {
              width: "250px",
              background: "#6DA5C0",
              color: "#ffffff",
            },
          }}
        >
          <Sidebar open={sidebarOpen} toggleDrawer={toggleDrawer} />
        </Drawer>
      </Box>
    </div>
    // <>
    //     <AdminDashboard />
    // </>
  );
};

export default Layout;
