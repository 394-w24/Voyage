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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "/src/theme/theme.jsx";
import CancelIcon from "@mui/icons-material/Cancel";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "../Home/Home.css";

const Community = () => {

  return (
    <>
      <div className="home">
        <Header />
        <div className="home-container">
          <Sidebar />
          <div className="travel-items-container">
            <div className="travel-items">
            <Typography variant="h5" gutterBottom>
                Community
              </Typography>
            </div>
            </div>
          </div>
        </div>
    </>
    
  );
};

export default Community;
