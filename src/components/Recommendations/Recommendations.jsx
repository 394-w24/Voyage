import React from 'react';
import { useLocation } from 'react-router-dom';
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
  Button
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "/src/theme/theme.jsx";
import CustomAppBar from "../CustomAppBar";
import CustomDrawer from "../CustomDrawer";

const Recommendations = () => {
  const location = useLocation();
  const { destination } = location.state || {};
  // const [travelPlan, setTravelPlan] = useState('');

  const renderList = (items) => {
    return items.map((item, index) => (
      <Typography key={index} variant="body1" component="span">
        {item}{index < items.length - 1 ? ', ' : ''}
      </Typography>
    ));
  };

  // const generatePlan = () => {
  //   return setTravelPlan(items);
  // };

  return (
    <ThemeProvider theme={theme}>
      {/* <CustomAppBar />
      <CustomDrawer /> */}
      <Container maxWidth="lg" style={{ marginLeft: "240px" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Typography variant="h5" gutterBottom>
            Recommendations
          </Typography>

          {destination && (
            <Card>
              <CardContent>
                <Typography variant="h2">{destination.name}</Typography>
                <Typography variant="h6">Suitable Seasons: {renderList(destination.season)} ({destination.temperature})</Typography>
                <Typography variant="h6">Travel Type: {renderList(destination.preferences)}</Typography>
                <Typography variant="h6">Budget Estimated Range: ${destination.budget.min}/day ~ ${destination.budget.max}/day</Typography>
                <img src={destination.image} alt={destination.name} style={{ width: '100%', height: 'auto' }} />
              </CardContent>
            </Card>
          )}

          <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
            Mock Plan
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Number of travelers</Typography>
                  <TextField
                    label="#"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'left', marginTop: 2, marginBottom: 5, marginLeft: 3 }}>
          <Button variant="contained" size="large" color="primary">
            Generate Plan
          </Button>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}

export default Recommendations;
