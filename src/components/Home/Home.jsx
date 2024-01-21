import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import TravelCardItem from "../TravelCardItem/TravelCardItem";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../../jsonFiles/trips.json";
import "./Home.css";

const Home = () => {
  const location = useLocation();
  const destinations =
    location.state?.filteredDestinations || data.destinations;

  const [addedToWishlist, setAddedToWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(addedToWishlist));
  }, [addedToWishlist]);

  const handleAddToWishlist = (destination) => {
    setAddedToWishlist((prevState) => {
      const isAdded = prevState[destination.name]?.added;
      return {
        ...prevState,
        [destination.name]: {
          added: !isAdded,
          destination: destination,
        },
      };
    });
  };

  return (
    <>
      <div className="home">
        <Header />
        <div className="home-container">
          <Sidebar />
          <div className="travel-items-container">
            <div className="travel-items">
              {destinations.map((destination, index) => (
                <TravelCardItem
                  key={index}
                  destination={destination}
                  handleAddToWishlist={handleAddToWishlist}
                  addedToWishlist={addedToWishlist}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;