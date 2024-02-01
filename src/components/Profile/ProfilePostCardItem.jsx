import React, { useState } from "react";
import { Card, Typography, Box, Avatar, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PostModal from "../PostModal/PostModal";
import { grey } from "@mui/material/colors";
import "../PostCardItem/PostCardItem.css";

const ProfilePostCardItem = ({ post, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <Card className="post-card" onClick={handleOpenModal}>
        <div className="post-card-image-container">
          {post.image && <img src={post.image} alt="Post" />}
          <Typography variant="h6" className="post-card-title">
            {post.title}
          </Typography>
          <Box className="profile-post-avatar-username">
            <Avatar alt={post.userName} src={post.userAvatar} />
            <Typography variant="subtitle1" className="username">
              {post.userName}
            </Typography>
            <IconButton
              className="delete-post-button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(post.id);
              }}
              aria-label="delete post"
              size="medium"
            >
              <DeleteForeverIcon sx={{ color: grey[50] }} />
            </IconButton>
          </Box>
        </div>
      </Card>
      <PostModal open={modalOpen} handleClose={handleCloseModal} post={post} />
    </>
  );
};

export default ProfilePostCardItem;
