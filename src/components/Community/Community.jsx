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
import MenuIcon from '@mui/icons-material/Menu';
import SortIcon from '@mui/icons-material/Sort';
import { ref, getDatabase, onValue } from "firebase/database";
import { getFirebaseApp } from "../../Utilities/firebase"; // Ensure this path is correct
import PostCardItem from "../PostCardItem/PostCardItem";
import "./Community.css";

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

  const [isSidebarOpen, setSidebarOpen] = useState(true); 

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); 
  };

  return (
    <>
      <div className="community">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="community-container">
        <Sidebar isSidebarOpen={isSidebarOpen} />
          <div className="post-items-container">
            <div className="post-items" style={{marginLeft: -15}}>
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <PostCardItem
                    key={index}
                    post={post}
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

export default Community;
