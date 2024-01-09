import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Preferences from 'src/components/Pages/Preferences/Preferences.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/preferences">
          <Preferences />
        </Route>
        {/* Need Login + Recommendations Routes */}
        <Route path="/">
          <div>Home Page</div>
        </Route>
      </Switch>
    </Router>
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
