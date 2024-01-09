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

const drawerWidth = 240;

const CustomAppBar = (props) => {
  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
        <Typography variant="h6" noWrap>
            Voyage
        </Typography>
        </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;

