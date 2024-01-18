import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "/src/theme/theme.jsx";
import CustomAppBar from "../CustomAppBar";
import CustomDrawer from "../CustomDrawer";
import "./Preferences.css";

import {
  Button,
  Drawer,
  Grid,
  Box,
  Card,
  CardContent,
  Checkbox,
  Container,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";

import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LandscapeIcon from "@mui/icons-material/Landscape";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CabinIcon from "@mui/icons-material/Cabin";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AddIcon from "@mui/icons-material/LibraryAdd";
import AddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { useNavigate, useLocation } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import destinationsData from "../../jsonFiles/trips.json";

const drawerWidth = 240;

const options = [
  { icon: <BeachAccessIcon style={{ fontSize: 60 }} />, label: "Tropical" },
  { icon: <LocationCityIcon style={{ fontSize: 60 }} />, label: "City" },
  { icon: <LandscapeIcon style={{ fontSize: 60 }} />, label: "Mountains" },
  { icon: <AirportShuttleIcon style={{ fontSize: 60 }} />, label: "Roadtrip" },
  { icon: <CabinIcon style={{ fontSize: 60 }} />, label: "Camping" },
  { icon: <DirectionsBoatIcon style={{ fontSize: 60 }} />, label: "Cruise" },
];

const seasons = [
  { icon: <FilterDramaIcon style={{ fontSize: 60 }} />, label: "Spring" },
  { icon: <WbSunnyIcon style={{ fontSize: 60 }} />, label: "Summer" },
  { icon: <ThermostatIcon style={{ fontSize: 60 }} />, label: "Autumn" },
  { icon: <AcUnitIcon style={{ fontSize: 60 }} />, label: "Winter" },
];

const temperatures = [
  { icon: <AcUnitIcon style={{ fontSize: 60 }} />, label: "Cold" },
  { icon: <ThermostatIcon style={{ fontSize: 60 }} />, label: "Mild" },
  { icon: <WbSunnyIcon style={{ fontSize: 60 }} />, label: "Sunny" },
];

function Preferences() {
  const location = useLocation();
  const recommendations = location.state?.filteredDestinations || [];

  const navigate = useNavigate();

  const [addedToWishlist, setAddedToWishlist] = useState({});

  const handleAddToWishlist = (destinationName) => {
    setAddedToWishlist((prevState) => ({
      ...prevState,
      [destinationName]: !prevState[destinationName],
    }));
  };

  const handleCardClick = (destination) => {
    navigate("/recommendation", { state: { destination } });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ marginTop: 2 }}>
              {recommendations.length > 0 ? (
                recommendations.map((destination, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <ButtonBase onClick={() => handleCardClick(destination)}>
                      <Card
                        className="recommendation"
                        style={{ width: "320px", minHeight: "350px" }}
                      >
                        <CardContent>
                          <Typography variant="h6" style={{ height: '80px' }}>
                            {destination.name}
                          </Typography>
                          <img
                            src={destination.image}
                            alt={destination.name}
                            style={{ width: "100%", height: "200px" }}
                          />
                          <Button
                            onClick={(event) => {
                              event.stopPropagation();
                              handleAddToWishlist(destination.name);
                            }}
                            size="medium"
                          >
                            {addedToWishlist[destination.name] ? (
                              <AddCheckIcon style={{ fontSize: 28 }} sx={{marginTop: 1}} />
                            ) : (
                              <AddIcon style={{ fontSize: 28 }} sx={{marginTop: 1}} />
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </ButtonBase>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" style={{ textAlign: "center" }}>
                    No matching destinations for now, please try again.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Preferences;
