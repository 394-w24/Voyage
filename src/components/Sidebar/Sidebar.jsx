import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import StarRateIcon from "@mui/icons-material/StarRate";
import MenuIcon from "@mui/icons-material/Menu";
import SortIcon from "@mui/icons-material/Sort";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Filter from "../Filter/Filter";
import CommunitySidebar from "../Community/CommunitySidebar";
import "./Sidebar.css";

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className={`sidebar-content ${isSidebarOpen ? "open" : "closed"}`}>
        <List>
          <ListItem button onClick={() => handleNavigation("/home")}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="HOME" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/community")}>
            <ListItemIcon>
              <StarRateIcon />
            </ListItemIcon>
            <ListItemText primary="COMMUNITY" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/profile")}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="PROFILE" />
          </ListItem>
          {location.pathname === "/home" && <Filter />}
          {location.pathname === "/community" && <CommunitySidebar />}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
