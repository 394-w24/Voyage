import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  Container,
  Grid,
  TextField,
  Typography,
  Divider,
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
import AirIcon from '@mui/icons-material/Air';
import { useNavigate } from "react-router-dom";
import destinationsData from "../../jsonFiles/trips.json";

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
  { icon: <AirIcon style={{ fontSize: 60 }} />, label: "Cold" },
  { icon: <ThermostatIcon style={{ fontSize: 60 }} />, label: "Mild" },
  { icon: <WbSunnyIcon style={{ fontSize: 60 }} />, label: "Sunny" },
];

function Filter() {
  const [checkedOptions, setCheckedOptions] = useState({});
  const [checkedSeasons, setCheckedSeasons] = useState({});
  const [checkedTemperatures, setCheckedTemperatures] = useState({});

  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [hotelBudget, setHotelBudget] = useState("");
  const [diningBudget, setDiningBudget] = useState("");
  const [transportationBudget, setTransportationBudget] = useState("");
  const [isRangeFilterActive, setIsRangeFilterActive] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
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

    navigate("/home", { state: { filteredDestinations } });
  }, [
    checkedOptions,
    checkedSeasons,
    checkedTemperatures,
    minBudget,
    maxBudget,
    hotelBudget,
    diningBudget,
    transportationBudget,
    isRangeFilterActive,
  ]);

  const iconSize = 25;

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
          <Grid container spacing={1}>
            {/* <Typography variant="subtitle1">Travel Options</Typography> */}
            {options.map((preference, index) => (
              <Grid item xs={12} sm={9} md={9} key={index}>
                <Box display="flex" alignItems="center">
                  {React.cloneElement(preference.icon, {
                    style: { fontSize: iconSize },
                  })}
                  <Typography variant="body2">
                    {"\u00A0\u00A0\u00A0"}
                    {preference.label}
                  </Typography>
                  <Checkbox
                    size="small"
                    checked={checkedOptions[preference.label] || false}
                    onChange={() => handleCheckboxChange(preference.label)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={1}>
            {/* <Typography variant="subtitle1">Seasons</Typography> */}
            {seasons.map((season, index) => (
              <Grid item xs={12} sm={9} md={9} key={index}>
                <Box display="flex" alignItems="center">
                  {React.cloneElement(season.icon, {
                    style: { fontSize: iconSize },
                  })}
                  <Typography variant="body2">
                    {"\u00A0\u00A0\u00A0"}
                    {season.label}
                  </Typography>
                  <Checkbox
                    size="small"
                    checked={checkedSeasons[season.label] || false}
                    onChange={() => handleCheckboxChangeSeason(season.label)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={1}>
            {/* <Typography variant="subtitle1">Temperatures</Typography> */}
            {temperatures.map((temperature, index) => (
              <Grid item xs={12} sm={9} md={9} key={index}>
                <Box display="flex" alignItems="center">
                  {React.cloneElement(temperature.icon, {
                    style: { fontSize: iconSize },
                  })}
                  <Typography variant="body2">
                    {"\u00A0\u00A0\u00A0"}
                    {temperature.label}
                  </Typography>
                  <Checkbox
                    size="small"
                    checked={checkedTemperatures[temperature.label] || false}
                    onChange={() => handleCheckboxChangeTemp(temperature.label)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid
            container
            spacing={1}
            sx={{ p: 1, marginLeft: -2 }}
          >
            {/* <Typography variant="subtitle1">Pricing Information</Typography> */}
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="body2">Price Range ($/day)</Typography>
              <TextField
                label="Min"
                size="small"
                variant="outlined"
                margin="dense"
                fullWidth
                value={minBudget}
                onChange={handleMinBudgetChange}
              />
              <TextField
                label="Max"
                size="small"
                variant="outlined"
                margin="dense"
                fullWidth
                value={maxBudget}
                onChange={handleMaxBudgetChange}
              />

              <Grid
                container
                spacing={1}
                sx={{ marginTop: 0.5, marginLeft: -1 }}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2">
                      Only show trips within this range
                    </Typography>
                    <Checkbox
                      size="small"
                      checked={isRangeFilterActive}
                      onChange={handleRangeFilterChange}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "80px" }}>
              <Typography variant="body2">
                Budget Details (Please use $/$$/$$$/$$$$)
              </Typography>
              <TextField
                label="Hotel"
                size="small"
                variant="outlined"
                margin="dense"
                fullWidth
                value={hotelBudget}
                onChange={handleHotelBudgetChange}
              />
              <TextField
                label="Dining"
                size="small"
                variant="outlined"
                margin="dense"
                fullWidth
                value={diningBudget}
                onChange={handleDiningBudgetChange}
              />
              <TextField
                label="Transportation"
                size="small"
                variant="outlined"
                margin="dense"
                fullWidth
                value={transportationBudget}
                onChange={handleTransportationBudgetChange}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Filter;
