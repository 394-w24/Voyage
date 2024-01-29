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
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import TravelCardItem from "../TravelCardItem/TravelCardItem";
import "../Home/Home.css";
import "./Wishlist.css";
import "../Community/Community.css";
import ProfilePostCardItem from "./ProfilePostCardItem";

const Profile = () => {
  const [user] = useAuthState();
  const navigate = useNavigate();
  const [userDestinations, setUserDestinations] = useState([]);

  const signout = () => {
    firebaseSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const wishlistRef = ref(db, `wishlists/${user.uid}`);

      onValue(
        wishlistRef,
        (snapshot) => {
          const data = snapshot.val() || {};
          const destinationList = Object.values(data);
          setUserDestinations(destinationList);
        },
        {
          onlyOnce: true,
        }
      );
    } else {
      setUserDestinations([]);
    }
  }, [user]);

  const handleAddOrRemoveFromWishlist = (destination) => {
    const isInWishlist = userDestinations.some(
      (dest) => dest.name === destination.name
    );

    if (isInWishlist) {
      const newWishlist = userDestinations.filter(
        (dest) => dest.name !== destination.name
      );
      setUserDestinations(newWishlist);

      const db = getDatabase();
      const wishlistRef = ref(db, `wishlists/${user.uid}/${destination.name}`);
      remove(wishlistRef);
    } else {
      const newWishlist = [...userDestinations, destination];
      setUserDestinations(newWishlist);

      const db = getDatabase();
      const wishlistRef = ref(db, `wishlists/${user.uid}/${destination.name}`);
      set(wishlistRef, destination);
    }
  };

  const [posts, setPosts] = useState([]);

  const handleDeletePost = (postId) => {
    // Remove from local state
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);

    // Remove from Firebase
    const db = getDatabase();
    const postRef = ref(db, `posts/${postId}`);
    remove(postRef)
      .then(() => {
        console.log("Post deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting post: ", error);
      });
  };

  useEffect(() => {
    const app = getFirebaseApp();
    const database = getDatabase(app);
    const postsRef = ref(database, "posts");

    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      // Convert the object of objects into an array and filter by userId
      const userPosts = data
        ? Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .filter((post) => post.userId === user.uid) // Filter posts where post.userId matches logged-in user's uid
        : [];
      setPosts(userPosts);
    });

    return () => unsubscribe();
  }, [user]);

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
                        size="medium"
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
                    marginTop: 7,
                    height: "600px",
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ marginBottom: -3 }}
                  >
                    Post
                  </Typography>
                  <Box
                    component="main"
                    sx={{
                      marginLeft: -26,
                    }}
                  >
                    <div className="community">
                      <div className="community-container">
                        <div className="post-items-container">
                          <div className="post-items">
                            {posts.map((post, index) => (
                              <ProfilePostCardItem
                                key={index}
                                post={post}
                                onDelete={handleDeletePost}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Box>

                <Box component="main" sx={{ marginTop: 15, marginLeft: -7 }}>
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
                          {userDestinations.map((destination, index) => (
                            <TravelCardItem
                              key={index}
                              destination={destination}
                              addedToWishlist={true}
                              handleAddToWishlist={() =>
                                handleAddOrRemoveFromWishlist(destination)
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
