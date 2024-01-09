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
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "/src/theme/theme.jsx";
import CustomAppBar from "../CustomAppBar";
import CustomDrawer from "../CustomDrawer";


const Profile = () => {

  return (
    <ThemeProvider theme={theme}>
      <CustomAppBar />
      <CustomDrawer />
      <Container maxWidth="lg">
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Profile;
