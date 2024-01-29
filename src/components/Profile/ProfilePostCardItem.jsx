import React, { useState } from "react";
import { Card, Typography, Box, Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PostModal from "../PostModal/PostModal";
import "../PostCardItem/PostCardItem.css";

const ProfilePostCardItem = ({ post, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <Card className="post-card" onClick={handleOpenModal}>
        {post.image && <img src={post.image} alt="Post" />}
        <Box className="post-card-info">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">{post.title}</Typography>
            <IconButton
              onClick={() => onDelete(post.id)}
              aria-label="delete post"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                alt={post.userName}
                src={post.userAvatar}
                sx={{ width: 20, height: 20, marginRight: 1 }}
              />
              <Typography variant="subtitle1">{post.userName}</Typography>
            </Box>
            <Typography variant="subtitle2">
              Posted at:{" "}
              {post.createdAt.substring(0, 10) +
                " " +
                post.createdAt.substring(11, 16)}
            </Typography>
          </Box>
        </Box>
      </Card>
      <PostModal open={modalOpen} handleClose={handleCloseModal} post={post} />
    </>
  );
};

export default ProfilePostCardItem;
