import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import TravelCardItem from "../TravelCardItem/TravelCardItem";
import { Grid, Typography } from "@mui/material";
import data from "../../jsonFiles/trips.json";
import "./Home.css";

// Firebase utilities
import { useAuthState } from "../../Utilities/firebaseUtils";
import { getDatabase, ref, set, onValue } from "firebase/database";

const Home = () => {
  const location = useLocation();
  const destinations =
    location.state?.filteredDestinations || data.destinations;

  // Firebase hooks
  const [user] = useAuthState();

  const [addedToWishlist, setAddedToWishlist] = useState({});

  // Listen to wishlist updates from Firebase
  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const wishlistRef = ref(db, `wishlists/${user.uid}`);

      const unsubscribe = onValue(wishlistRef, (snapshot) => {
        const data = snapshot.val() || {};
        setAddedToWishlist(data);
      });

      // Unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [user]);

  const handleAddToWishlist = (destination) => {
    const newWishlist = {
      ...addedToWishlist,
      [destination.name]: destination,
    };

    setAddedToWishlist(newWishlist);

    if (user) {
      const wishlistRef = ref(getDatabase(), `/wishlists/${user.uid}`);
      set(wishlistRef, newWishlist)
        .then(() => {
          console.log("Wishlist updated in Firebase");
        })
        .catch((error) => {
          console.error("Error updating wishlist: ", error);
        });
    }
  };

  return (
    <>
      <div className="home">
        <Header />
        <div className="home-container">
          <Sidebar />
          <div className="travel-items-container">
            <div className="travel-items">
              {destinations.length > 0 ? (
                destinations.map((destination, index) => (
                  <TravelCardItem
                    key={index}
                    destination={destination}
                    handleAddToWishlist={handleAddToWishlist}
                    addedToWishlist={!!addedToWishlist[destination.name]}
                  />
                ))
              ) : (
                <Grid item xs={12}>
                  <div style={{ width: "100%", margin: "0 auto" }}>
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                      No matching destinations for now, please try again.
                    </Typography>
                  </div>
                </Grid>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
