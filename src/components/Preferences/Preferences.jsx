import React, { useState } from "react";
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
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
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
  const [checkedOptions, setCheckedOptions] = useState({});
  const [checkedSeasons, setCheckedSeasons] = useState({});
  const [checkedTemperatures, setCheckedTemperatures] = useState({});

  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [hotelBudget, setHotelBudget] = useState("");
  const [diningBudget, setDiningBudget] = useState("");
  const [transportationBudget, setTransportationBudget] = useState("");
  const [isRangeFilterActive, setIsRangeFilterActive] = useState(false);

  const [recommendations, setRecommendations] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = (destination) => {
    navigate("/recommendation", { state: { destination } });
  };

  const handleCheckboxChange = (label) => {
    setCheckedOptions((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleCheckboxChangeSeason = (label) => {
    setCheckedSeasons((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleCheckboxChangeTemp = (label) => {
    setCheckedTemperatures((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleMinBudgetChange = (event) => {
    setMinBudget(event.target.value);
  };

  const handleMaxBudgetChange = (event) => {
    setMaxBudget(event.target.value);
  };

  const handleHotelBudgetChange = (event) => {
    setHotelBudget(event.target.value);
  };

  const handleDiningBudgetChange = (event) => {
    setDiningBudget(event.target.value);
  };

  const handleTransportationBudgetChange = (event) => {
    setTransportationBudget(event.target.value);
  };

  const handleRangeFilterChange = (event) => {
    setIsRangeFilterActive(event.target.checked);
  };

  const handleGenerateRecommendations = () => {
    const selectedPreferences = Object.keys(checkedOptions).filter(
      (key) => checkedOptions[key]
    );
    const selectedSeasons = Object.keys(checkedSeasons).filter(
      (key) => checkedSeasons[key]
    );
    const selectedTemperatures = Object.keys(checkedTemperatures).filter(
      (key) => checkedTemperatures[key]
    );

    const filteredDestinations = destinationsData.destinations.filter(
      (destination) => {
        const matchesPreference =
          selectedPreferences.length === 0 ||
          selectedPreferences.some((preference) =>
            destination.preferences.includes(preference)
          );
        const matchesSeason =
          selectedSeasons.length === 0 ||
          destination.season.some((season) => selectedSeasons.includes(season));
        const matchesTemperature =
          selectedTemperatures.length === 0 ||
          destination.temperature.some((temperature) =>
            selectedTemperatures.includes(temperature)
          );
        const matchesBudget = !isRangeFilterActive
          ? true
          : (!minBudget || destination.budget.min >= minBudget) &&
            (!maxBudget || destination.budget.max <= maxBudget);
        const matchesHotelBudget =
          !hotelBudget || destination.hotelBudget === hotelBudget;
        const matchesDiningBudget =
          !diningBudget || destination.diningBudget === diningBudget;
        const matchesTransportationBudget =
          !transportationBudget ||
          destination.transportationBudget === transportationBudget;

        return (
          matchesPreference &&
          matchesSeason &&
          matchesTemperature &&
          matchesBudget &&
          matchesHotelBudget &&
          matchesDiningBudget &&
          matchesTransportationBudget
        );
      }
    );

    setRecommendations(filteredDestinations);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CustomAppBar />
        <CustomDrawer />

        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Container maxWidth="lg">
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
                          <Checkbox
                            checked={checkedOptions[preference.label] || false}
                            onChange={() =>
                              handleCheckboxChange(preference.label)
                            }
                          />
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

            <Typography variant="h5" gutterBottom>
              Seasons
            </Typography>
            <Grid container spacing={3}>
              {seasons.map((season, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Box display="flex" alignItems="center">
                          {season.icon}
                          <Checkbox
                            checked={checkedSeasons[season.label] || false}
                            onChange={() =>
                              handleCheckboxChangeSeason(season.label)
                            }
                          />
                        </Box>
                        <Typography variant="subtitle1">
                          {season.label}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h5" gutterBottom>
              Temperatures
            </Typography>
            <Grid container spacing={3}>
              {temperatures.map((temperature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Box display="flex" alignItems="center">
                          {temperature.icon}
                          <Checkbox
                            checked={
                              checkedTemperatures[temperature.label] || false
                            }
                            onChange={() =>
                              handleCheckboxChangeTemp(temperature.label)
                            }
                          />
                        </Box>
                        <Typography variant="subtitle1">
                          {temperature.label}
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
                    <Typography variant="h6">
                      Min/Max Price Range ($/day)
                    </Typography>
                    <TextField
                      label="Min"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={minBudget}
                      onChange={handleMinBudgetChange}
                    />
                    <TextField
                      label="Max"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={maxBudget}
                      onChange={handleMaxBudgetChange}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Range Filter</Typography>
                    <Checkbox
                      checked={isRangeFilterActive}
                      onChange={handleRangeFilterChange}
                    />{" "}
                    only show trips in this range
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      Budget Details ($/$$/$$$/$$$$)
                    </Typography>
                    <TextField
                      label="Hotel"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={hotelBudget}
                      onChange={handleHotelBudgetChange}
                    />
                    <TextField
                      label="Dining"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={diningBudget}
                      onChange={handleDiningBudgetChange}
                    />
                    <TextField
                      label="Transportation"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={transportationBudget}
                      onChange={handleTransportationBudgetChange}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={handleGenerateRecommendations}
              >
                Generate Recommendations
              </Button>
            </Box>

            <Grid container spacing={3} sx={{ marginTop: 2 }}>
              {recommendations.map((destination, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ButtonBase onClick={() => handleCardClick(destination)}>
                    <Card
                      className="recommendation"
                      style={{ width: "320px", minHeight: "400px" }}
                    >
                      <CardContent>
                        <Typography variant="h6">{destination.name}</Typography>
                        <img
                          src={destination.image}
                          alt={destination.name}
                          style={{ width: "100%", height: "200px" }}
                        />
                      </CardContent>
                    </Card>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Preferences;
