import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "../Utilities/firebaseUtils";
import Login from "../Components/Login/Login";
import Recommendations from "../components/Recommendations/Recommendations";
import Preferences from "../components/Preferences/Preferences";
import Profile from "../components/Profile/Profile";
import CustomAppBar from "../components/CustomAppBar";
import CustomDrawer from "../components/CustomDrawer";
import Button from '@mui/material/Button';
import ListIcon from '@mui/icons-material/List';

const RouteDispatcher = () => {
  const [user, loading] = useAuthState();

  if (loading) {
    return <div>Loading...</div>;
  }

  // const [drawerOpen, setDrawerOpen] = useState(false);
  // const toggleDrawer = () => {
  //   setDrawerOpen(!drawerOpen);
  // };

  return (
    <BrowserRouter>
      <CustomAppBar />
      <CustomDrawer />
      {/* <Button onClick={toggleDrawer}>
        <ListIcon />
      </Button>
      <CustomDrawer open={drawerOpen} /> */}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate replace to="preferences" />
            ) : (
              <Navigate replace to="login" />
            )
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="recommendation" element={<Recommendations />} />
        <Route path="preferences" element={<Preferences />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteDispatcher;
