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
import { ref, getDatabase, onValue } from "firebase/database";
import { getFirebaseApp } from "../../Utilities/firebase"; // Ensure this path is correct
import "../Home/Home.css";

const Community = () => {
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
            <div
              className="travel-items-container"
              style={{ marginLeft: "100px" }}
            >
              <Typography variant="h5" style={{ marginTop: "-50px" }}>
                Community
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                  justifyContent: "start",
                  marginTop: "50px",
                }}
              >
                {" "}
                {/* Apply marginTop here */}
                {posts.map((post) => (
                  <div key={post.id} style={{ flex: "0 0 calc(20% - 16px)" }}>
                    {" "}
                    {/* Adjust `flex` property */}
                    <Card
                      sx={{ width: "300px", height: "auto" }} // Adjust card width as needed
                      className="travel-card"
                    >
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post"
                          style={{ width: "300px", height: "auto" }}
                        />
                      )}
                      <Typography variant="h6" style={{ marginLeft: 3 }}>
                        {post.title}
                      </Typography>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={1}
                        style={{ width: "300px" }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          style={{ marginLeft: 3 }}
                        >
                          <Avatar
                            alt={post.userName}
                            src={post.userAvatar}
                            sx={{ width: 20, height: 20, marginRight: 1 }}
                          />
                          <Typography variant="subtitle1">
                            {post.userName}
                          </Typography>
                        </Box>
                        <Typography
                          variant="subtitle2"
                          style={{ marginRight: 3 }}
                        >
                          Posted at :{" "}
                          {post.createdAt.substring(0, 10) +
                            " " +
                            post.createdAt.substring(11, 16)}
                        </Typography>
                      </Box>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
