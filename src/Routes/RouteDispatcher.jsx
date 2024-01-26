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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate replace to="home" />
            ) : (
              <Navigate replace to="login" />
            )
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="recommendation" element={<Recommendations />} />
        <Route path="preferences" element={<Preferences />} />
        <Route path="profile" element={<Profile />} />
        <Route path="community" element={<Community />} />
        <Route path="publish" element={<Publish />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteDispatcher;
