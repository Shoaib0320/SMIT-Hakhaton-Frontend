import React from "react";
import {
  Box,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  ListAlt,
  Feedback,
  Assignment,
  AnnouncementOutlined,
  Schedule,
} from "@mui/icons-material"; // Import icons
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SchoolIcon from "@mui/icons-material/School";
import Logo from "../../assets/images/Logo.jpg";
import { Users } from "lucide-react";

const Sidebar = ({ open, toggleDrawer }) => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Users", icon: <Users />, path: "/allUsers" },
    { text: "Trainers", icon: <AccountBoxIcon />, path: "/trainers" },
    { text: "Student", icon: <ListAlt />, path: "/student" },
    { text: "Campus", icon: <SchoolIcon />, path: "/campus" }, // Feedback icon
    { text: "Courses", icon: <Feedback />, path: "/courses" }, // Feedback icon
    { text: "Course Outline", icon: <Feedback />, path: "/courseOutline" }, // Feedback icon
    // { text: 'Assignment', icon: <Assignment />, path: '/assignment' }, // Feedback icon
    { text: "Announcement", icon: <AnnouncementOutlined />,path: "/announcement",}, // Feedback icon
    { text: "Exam", icon: <SchoolIcon />, path: "/exam" }, // Feedback icon
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      sx={{ width: 250 }}
    >
      <Box sx={{ width: 250, backgroundColor: "#f5f5f5", height: "100%" }}>
        <Typography
          className="font-serif"
          variant="h6"
          sx={{ padding: 2, fontWeight: "bold", color: "#4A148C" }}
        >
          <div className="flex items-center justify-center">
            <h2 className="text-[#0782e0]">SMIT LMS</h2>
          </div>
        </Typography>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button component={Link} to={item.path} key={index}>
              <ListItemIcon sx={{ color: "#0782e0" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "#0782e0" }} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
