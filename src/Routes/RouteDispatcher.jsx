import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "../Utilities/firebaseUtils";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";
import Recommendations from "../components/Recommendations/Recommendations";
import Preferences from "../components/Preferences/Preferences";
import Profile from "../components/Profile/Profile";
import Community from "../Components/Community/Community";
import Publish from "../Components/Community/Publish";

const RouteDispatcher = () => {
  const [user, loading] = useAuthState();

  if (loading) {
    return <div>Loading...</div>;
  }

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate replace to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <PrivateRoute>
              <Recommendations />
            </PrivateRoute>
          }
        />
        <Route
          path="/preferences"
          element={
            <PrivateRoute>
              <Preferences />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/community"
          element={
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          }
        />
        <Route
          path="/publish"
          element={
            <PrivateRoute>
              <Publish />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteDispatcher;
