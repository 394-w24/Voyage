import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../Utilities/firebaseUtils"; // Import the useAuthState hook
import {
  Drawer,
  Grid,
  Box,
  Card,
  CardContent,
  Checkbox,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Container,
  Avatar,
  ButtonBase,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "/src/theme/theme.jsx";
import CancelIcon from "@mui/icons-material/Cancel";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { firebaseSignOut } from "../../Utilities/firebaseUtils";
import { getFirebaseApp } from "../../Utilities/firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import TravelCardItem from "../TravelCardItem/TravelCardItem";
import "../Home/Home.css";
import "./Wishlist.css";

const Profile = () => {
  const [user] = useAuthState();
  const navigate = useNavigate();
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};

  const signout = () => {
    firebaseSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [addedToWishlist, setAddedToWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : {};
  });

  const handleAddOrRemoveFromWishlist = (destination) => {
    setAddedToWishlist((prevState) => {
      const isAdded = prevState[destination.name]?.added;
      const updatedState = {
        ...prevState,
        [destination.name]: {
          added: !isAdded,
          destination: destination,
        },
      };

      // Update local storage and return updated state
      localStorage.setItem("wishlist", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(addedToWishlist));
  }, [addedToWishlist]);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const app = getFirebaseApp();
    const database = getDatabase(app);
    const postsRef = ref(database, "posts");

    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      // Convert the object of objects into an array
      const postsArray = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setPosts(postsArray);
    });

    // Don't forget to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="home">
        <Header />
        <div className="home-container">
          <Sidebar />
          <div className="travel-items-container">
            <div className="travel-items">
              <Box component="main">
                <Box component="main">
                  <Typography variant="h5" gutterBottom>
                    Profile
                  </Typography>
                  {user ? (
                    <Box sx={{ marginTop: 2 }}>
                      <Avatar
                        alt={user.displayName || "User"}
                        src={user.photoURL}
                        sx={{ width: 100, height: 100 }} // Adjust the size as needed
                      />
                      <Typography variant="h6">
                        Welcome, {user.displayName || "User"}!
                      </Typography>
                      <Typography variant="subtitle1">
                        Email: {user.email}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={signout}
                        sx={{ marginTop: 3 }}
                      >
                        Signout
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="subtitle1">
                      No user is currently signed in.
                    </Typography>
                  )}
                </Box>

                <Box
                  component="main"
                  sx={{
                    maxHeight: "300px", // Maximum height is limited to 900px
                    marginTop: 7,
                    marginLeft: -7,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ marginBottom: -3, marginLeft: 7 }}
                  >
                    Post
                  </Typography>
                  <div className="wishlist">
                    <div className="wishlist-container">
                      <div className="travel-items-container">
                        <div className="travel-items">
                          {posts.map((post) => (
                            <div key={post.id} className="travel-item">
                              {post.image && (
                                <img
                                  src={post.image}
                                  alt="Post"
                                  style={{ width: "300px", height: "auto" }}
                                />
                              )}
                              <Typography variant="h6">{post.title}</Typography>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                mb={1}
                                style={{ width: "300px" }}
                              >
                                <Box display="flex" alignItems="center">
                                  <Avatar
                                    alt={post.userName}
                                    src={post.userAvatar}
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      marginRight: 1,
                                    }}
                                  />
                                  <Typography variant="subtitle1">
                                    {post.userName}
                                  </Typography>
                                </Box>
                                <Typography variant="subtitle2">
                                  Posted at :{" "}
                                  {post.createdAt.substring(0, 10) +
                                    " " +
                                    post.createdAt.substring(11, 16)}
                                </Typography>
                              </Box>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>

                <Box component="main" sx={{ marginTop: 7, marginLeft: -7 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ marginBottom: -3, marginLeft: 7 }}
                  >
                    Wishlist
                  </Typography>
                  <div className="wishlist">
                    <div className="wishlist-container">
                      <div className="travel-items-container">
                        <div className="travel-items">
                          {Object.entries(wishlist)
                            .filter(([_, value]) => value.added)
                            .map(([key, value], index) => (
                              <TravelCardItem
                                key={index}
                                destination={value.destination}
                                handleAddToWishlist={() =>
                                  handleAddOrRemoveFromWishlist(
                                    value.destination
                                  )
                                }
                                addedToWishlist={
                                  addedToWishlist[value.destination.name]?.added
                                }
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
