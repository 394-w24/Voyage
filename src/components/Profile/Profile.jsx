import React from 'react';
import { useNavigate } from 'react-router-dom';
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "/src/theme/theme.jsx";
import CustomAppBar from "../CustomAppBar";
import CustomDrawer from "../CustomDrawer";

const Profile = () => {
  const [user] = useAuthState();
  const navigate = useNavigate();
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {};

  const handleCardClick = (destination) => {
    navigate("/recommendation", { state: { destination } });
  };

  return (
    <ThemeProvider theme={theme}>
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Wishlist
          </Typography>
          <Grid container spacing={3}>
            {Object.entries(wishlist).filter(([_, value]) => value.added).map(([key, value], index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ButtonBase onClick={() => handleCardClick({ name: key, image: value.image })}>
                  <Card className="wishlist-card" style={{ width: "320px", minHeight: "350px" }}>
                    <CardContent>
                      <Typography variant="h6">{key}</Typography>
                      <img src={value.image} alt={key} style={{ width: "100%", height: "200px" }} />
                    </CardContent>
                  </Card>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Profile;
