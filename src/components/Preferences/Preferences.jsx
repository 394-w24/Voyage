import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "/src/theme/theme.jsx";
import "./Preferences.css";
import {
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/LibraryAdd";
import AddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { useNavigate, useLocation } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import CustomAppBar from "../CustomAppBar";
import CustomDrawer from "../CustomDrawer"

function Preferences() {
  const location = useLocation();
  const recommendations = location.state?.filteredDestinations || [];

  const navigate = useNavigate();

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

  const handleCardClick = (destination) => {
    navigate("/recommendation", { state: { destination } });
  };

  return (
    <>
      <CustomAppBar />
      <CustomDrawer />
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, marginTop: 8, marginLeft: 15 }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={3} sx={{ marginTop: 2 }}>
                {recommendations.length > 0 ? (
                  recommendations.map((destination, index) => (
                    <Grid item xs={12} sm={8} md={4} key={index}>
                      <ButtonBase onClick={() => handleCardClick(destination)}>
                        <Card
                          className="recommendation"
                          style={{ width: "320px", minHeight: "350px" }}
                        >
                          <CardContent>
                            <Typography variant="h6" style={{ height: "80px" }}>
                              {destination.name}
                            </Typography>
                            <img
                              src={destination.image}
                              alt={destination.name}
                              style={{ width: "100%", height: "200px" }}
                            />
                            <Button
                              onClick={(event) => {
                                event.stopPropagation();
                                handleAddToWishlist(destination);
                              }}
                              size="medium"
                            >
                              {addedToWishlist[destination.name]?.added ? (
                                <AddCheckIcon style={{ fontSize: 28 }} />
                              ) : (
                                <AddIcon style={{ fontSize: 28 }} />
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </ButtonBase>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                      No matching destinations for now, please try again.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Preferences;
