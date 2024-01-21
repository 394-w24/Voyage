import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 更正了 useNavigate 的导入
import { firebaseSignOut } from "../Utilities/firebaseUtils";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import StarRateIcon from "@mui/icons-material/StarRate";
import PeopleIcon from '@mui/icons-material/People';
import Filter from "./Filter/Filter";
const drawerWidth = 230;

const CustomDrawer = (props) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const signout = () => {
    firebaseSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem button onClick={() => handleNavigation("/profile")}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/preferences")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Preferences" />
        </ListItem>
        {/* <ListItem button onClick={() => handleNavigation("/recommendation")}>
          <ListItemIcon>
            <StarRateIcon />
          </ListItemIcon>
          <ListItemText primary="Recommendations" />
        </ListItem> */}
        <ListItem button onClick={() => handleNavigation("/community")}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Community" />
        </ListItem>
      </List>
      {/* {location.pathname === "/community" && (
            
      )} */}
      {location.pathname === "/preferences" && (<>
        <Filter />
        </>
      )}
      <button onClick={signout}>Signout</button>
    </Drawer>
  );
};

export default CustomDrawer;
