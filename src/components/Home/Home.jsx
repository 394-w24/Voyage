import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import TravelCardItem from "../TravelCardItem/TravelCardItem";
import data from "../../jsonFiles/trips.json";
import "./Home.css";

const Home = () => {
  const [destinations, setDestionations] = useState(data.destinations);
  return (
    <>
      <div className="home">
        <Header />
        <div className="home-container">
          <Sidebar />
          <div className="travel-items-container">
            <div className="travel-items">
              {destinations.map((destination, index) => (
                <TravelCardItem key={index} destination={destination} /> 
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
