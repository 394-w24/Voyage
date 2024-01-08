import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecommendationsPage from "./components/recommendations/recommendationsPage";
import PreferencesPage from "./components/preferences/PreferencesPage";

const App = () => {
  return (
    <div className="App">
     <Router>
      <div className="page-body">
        <Routes>
          <Route path="/" element={<RecommendationsPage></RecommendationsPage>}></Route>
          <Route path="/preferences" element={<PreferencesPage></PreferencesPage>}></Route>
        </Routes>
      </div>
     </Router>
    </div>
  );
};

export default App;
