import React, { useState } from "react";
import { Card, Typography, Box, Avatar } from "@mui/material";
import PostModal from "../PostModal/PostModal";
import "./PostCardItem.css";

const PostCardItem = ({ post }) => {
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
          <Box className="post-avatar-username">
            <Avatar alt={post.userName} src={post.userAvatar} />
            <Typography variant="subtitle1" style={{ color: "white" }}>
              {post.userName}
            </Typography>
          </Box>
        </div>
      </Card>

      <PostModal open={modalOpen} handleClose={handleCloseModal} post={post} />
    </>
  );
};

export default PostCardItem;
