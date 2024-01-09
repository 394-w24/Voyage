import React from 'react';
import { Container } from '@mui/material';
import { Box, ThemeProvider } from '@mui/material';
import CustomAppBar from './components/AppBar/CustomAppBar';
import CustomDrawer from './components/Drawer/CustomDrawer';
import PreferencesContainer from './containers/PreferencesContainer';
import BudgetContainer from './containers/BudgetContainer';
import theme from './theme/theme';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LandscapeIcon from '@mui/icons-material/Landscape';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CabinIcon from '@mui/icons-material/Cabin';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

const drawerWidth = 240;

const preferences = [
  { icon: <BeachAccessIcon style={{ fontSize: 60 }} />, label: 'Tropical' },
  { icon: <LocationCityIcon style={{ fontSize: 60 }} />, label: 'City' },
  { icon: <LandscapeIcon style={{ fontSize: 60 }} />, label: 'Mountains' },
  { icon: <AirportShuttleIcon style={{ fontSize: 60 }} />, label: 'Public Transit' },
  { icon: <CabinIcon style={{ fontSize: 60 }} />, label: 'Camping' },
  { icon: <DirectionsBoatIcon style={{ fontSize: 60 }} />, label: 'Cruise' }
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CustomAppBar drawerWidth={drawerWidth} />
        <CustomDrawer drawerWidth={drawerWidth} />

        <Container maxWidth="lg">
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
            <PreferencesContainer preferences={preferences} />
            <BudgetContainer />
          </Box>
        </Container>
        </Box>
      
    </ThemeProvider>
  );
}

export default App;

// import "./App.css";
// import { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import RecommendationsPage from "./components/recommendations/recommendationsPage";
// import PreferencesPage from "./components/preferences/PreferencesPage";
// const App = () => {
//   return (
//     <div className="App">
//       <Router>

//         <div className="page-body">
//           <Routes>
//             <Route path="/" element={<RecommendationsPage />}></Route>
//             <Route path="/preferences" element={<PreferencesPage />}></Route>
//           </Routes>
//         </div>
//       </Router>
//     </div>
//   );
// };

// export default App;
