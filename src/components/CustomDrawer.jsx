import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Grid,
  Box,
  Card,
  CardContent,
  Checkbox,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import StarRateIcon from "@mui/icons-material/StarRate";
const drawerWidth = 240;

const CustomDrawer = (props) => {
    const navigate = useNavigate();
    const signout = () => {
        // Sign out logic
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
                <ListItem button onClick={() => handleNavigation('/profile')}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation('/preferences')}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Preferences" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation('/recommendation')}>
                    <ListItemIcon>
                        <StarRateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Recommendations" />
                </ListItem>
            </List>
            <button onClick={signout}>Signout</button>
        </Drawer>
    );
};

export default CustomDrawer;