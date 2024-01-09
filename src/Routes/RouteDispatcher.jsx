import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "../Utilities/firebaseUtils";
import Login from "../Components/Login/Login";
import Recommendations from "../components/Recommendations/Recommendations";
import Preferences from "../components/Preferences/Preferences";
import Profile from "../components/Profile/Profile";

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
              <Navigate replace to="login" />
            ) : (
              <Navigate replace to="preferences" />
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
