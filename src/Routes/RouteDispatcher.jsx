import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "../Utilities/firebaseUtils";
import Login from "../Components/Login/Login";
import RecommendationsPage from "../Components/Recommendations/RecommendationsPage";
import PreferencesPage from "../Components/Preferences/PreferencesPage";

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
              <Navigate replace to="recommendation" />
            )
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="recommendation" element={<RecommendationsPage />} />
        <Route path="preferences" element={<PreferencesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteDispatcher;
