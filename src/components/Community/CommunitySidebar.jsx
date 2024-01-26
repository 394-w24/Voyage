import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../Utilities/firebaseUtils"; // Import the useAuthState hook
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
  Container,
  Avatar,
  ButtonBase,
  Button,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "/src/theme/theme.jsx";
import CancelIcon from "@mui/icons-material/Cancel";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import PublishIcon from "@mui/icons-material/Publish";
import "../Home/Home.css";

const CommunitySidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          marginLeft: -2,
          marginRight: -2,
          marginTop: -2,
        }}
      >
        <Container maxWidth="lg">
          <Divider sx={{ my: 2 }} />
        </Container>
        <ListItem
          button
          onClick={() => handleNavigation("/publish")}
          sx={{ my: 2, marginLeft: 1 }}
        >
          <ListItemIcon>
            <PublishIcon />
          </ListItemIcon>
          <ListItemText primary="PUBLISH" />
        </ListItem>
      </Box>
    </Box>
  );
};

export default CommunitySidebar;
