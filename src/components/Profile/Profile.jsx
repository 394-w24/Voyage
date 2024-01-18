import React from 'react';
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
  Avatar, // Import Avatar for user profile image
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "/src/theme/theme.jsx";
import CustomAppBar from "../CustomAppBar";
import CustomDrawer from "../CustomDrawer";

const Profile = () => {
  const [user] = useAuthState(); // Use the hook to get the current user

  return (
    <ThemeProvider theme={theme}>
      {/* <CustomAppBar />
      <CustomDrawer /> */}
      <Container maxWidth="lg">
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Typography variant="h5" gutterBottom>
            Profile
          </Typography>
          {user ? (
            <Box sx={{ marginTop: 2 }}>
              <Avatar 
                alt={user.displayName || "User"} 
                src={user.photoURL} 
                sx={{ width: 100, height: 100 }} // Adjust the size as needed
              />
              <Typography variant="h6">Welcome, {user.displayName || "User"}!</Typography>
              <Typography variant="subtitle1">Email: {user.email}</Typography>
            </Box>
          ) : (
            <Typography variant="subtitle1">No user is currently signed in.</Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Profile;
