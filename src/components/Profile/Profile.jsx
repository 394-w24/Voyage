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
                    height: "300px",
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
                        <div className="travel-items" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'start'}}>
                          {posts.map((post) => (
                            <div key={post.id} className="travel-item" style={{ flex: '0 0 calc(20% - 16px)' }}>
                              <Card
            sx={{ width: "300px", height: '280px' }} // Adjust card width as needed
            className="travel-card"
          >
                              {post.image && (
                                <img
                                  src={post.image}
                                  alt="Post"
                                  style={{ width: "300px", height: "auto" }}
                                />
                              )}
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                mb={1}
                                style={{ width: "300px", marginTop: 5 }}
                              >
                                <Box display="flex" alignItems="center" style={{ marginLeft: 5 }}>
                                  {" "}
                                  <Typography variant="h6">
                                    {post.title}
                                  </Typography>
                                </Box>
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="primary"
                                  onClick={() => handleDeletePost(post.id)}
                                  style={{ marginRight: 3 }}
                                >
                                  Delete Post
                                </Button>
                              </Box>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                mb={1}
                                style={{ width: "300px", marginLeft: 3 }}
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
                                <Typography variant="subtitle2" style={{marginRight: 5}}>
                                  Posted at :{" "}
                                  {post.createdAt.substring(0, 10) +
                                    " " +
                                    post.createdAt.substring(11, 16)}
                                </Typography>
                              </Box></Card>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
