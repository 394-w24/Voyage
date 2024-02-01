import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState, useDbAdd } from "../../Utilities/firebaseUtils";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getFirebaseApp, getFirebaseStorage } from "../../Utilities/firebase";
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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import SortIcon from "@mui/icons-material/Sort";
import "../Home/Home.css";

const Publish = () => {
  const [user] = useAuthState();
  const [addData] = useDbAdd("/posts");
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState(null);
  const firebaseStorage = getFirebaseApp();
  const [postTitle, setPostTitle] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFile(file);
    } else {
      alert("Only JPG and PNG files are allowed.");
      setFile(null); // Reset the file input if the file is not acceptable
    }
  };

  const handleTitleChange = (e) => {
    const words = e.target.value.split(" ");
    if (words.length <= 15) {
      setPostTitle(e.target.value);
    } else {
      alert("The title can only be 15 words long.");
    }
  };

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const fileInputRef = React.useRef(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePublish = async () => {
    if (!user) {
      alert("You must be logged in to publish a post.");
      return;
    }

    if (!file) {
      alert("You must upload a photo to publish a post.");
      return;
    }

    let imageUrl = "";
    if (file) {
      const firebaseStorageInstance = getFirebaseStorage(getFirebaseApp());
      const fileRef = storageRef(
        firebaseStorageInstance,
        `images/${user.uid}/${file.name}`
      );
      try {
        const uploadResult = await uploadBytes(fileRef, file);
        imageUrl = await getDownloadURL(uploadResult.ref);
      } catch (error) {
        console.error("Upload failed", error);
        return;
      }
    }

    const postData = {
      userId: user.uid,
      userName: user.displayName,
      userAvatar: user.photoURL,
      title: postTitle, // Include the title
      text: postText,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };

    addData(postData);
    navigate("/community");
  };

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="home-container">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className="travel-items-container">
          <div className="travel-items">
            <Box>
              <Typography variant="h5" gutterBottom>
                Publish
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Title (max 15 words)"
                value={postTitle}
                onChange={handleTitleChange}
                inputProps={{ maxLength: 15 }}
                style={{ height: "5%", width: "150%" }}
                size="small"
                sx={{ marginTop: 3 }}
              />
              <textarea
                value={postText}
                onChange={handleTextChange}
                minRows={3}
                style={{
                  height: "50%",
                  width: "200%",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }} // Adjust the width to 100%
              />
              <input
                type="file"
                onChange={handleFileChange}
                accept=".jpg, .png"
                style={{ display: "none" }} // Hide the actual file input
                ref={fileInputRef}
              />
              <ButtonBase onClick={handleIconClick}>
                <AddPhotoAlternateIcon style={{ fontSize: 40 }} />
              </ButtonBase>
              <Button
                onClick={handlePublish}
                variant="contained"
                size="small"
                color="primary"
                style={{ marginLeft: "1rem" }}
              >
                Publish
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
