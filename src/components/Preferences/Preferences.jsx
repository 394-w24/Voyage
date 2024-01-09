import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import purple from "@mui/material/colors/purple";
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
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LandscapeIcon from "@mui/icons-material/Landscape";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CabinIcon from "@mui/icons-material/Cabin";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
});

const options = [
  { icon: <BeachAccessIcon style={{ fontSize: 60 }} />, label: 'Tropical' },
  { icon: <LocationCityIcon style={{ fontSize: 60 }} />, label: 'City' },
  { icon: <LandscapeIcon style={{ fontSize: 60 }} />, label: 'Mountains' },
  { icon: <AirportShuttleIcon style={{ fontSize: 60 }} />, label: 'Roadtrip' },
  { icon: <CabinIcon style={{ fontSize: 60 }} />, label: 'Camping' },
  { icon: <DirectionsBoatIcon style={{ fontSize: 60 }} />, label: 'Cruise' }
];

function Preferences() {
  const signout = () => {
    // Sign out logic
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Voyage
            </Typography>
          </Toolbar>
        </AppBar>

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

        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom>
          Preferences
        </Typography>
        <Grid container spacing={3}>
          {options.map((preference, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center">
                      {preference.icon}
                      <Checkbox />
                    </Box>
                    <Typography variant="subtitle1">
                      {preference.label}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
          Budget
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Min/Max Price Range</Typography>
                <TextField
                  label="Min"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Max"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Range Filter</Typography>
                <Checkbox /> only show trips in this range
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Budget Details</Typography>
                <TextField
                  label="Hotel"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Dining"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Transportation"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Preferences;
