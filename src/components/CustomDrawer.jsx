import React from 'react';
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
    const signout = () => {
        // Sign out logic
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
            <ListItem button>
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Preferences" />
            </ListItem>
            <ListItem button>
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
