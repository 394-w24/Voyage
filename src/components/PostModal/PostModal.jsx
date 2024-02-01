import React from "react";
import { Modal, Box, Typography, Avatar } from "@mui/material";
import "./PostModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxHeight: "calc(100% - 96px)",
  overflowY: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const PostModal = ({ open, handleClose, post }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="post-box">
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            style={{ width: "100%", height: "auto" }}
          />
        )}
        <Box display="flex" alignItems="center" style={{ marginTop: 5 }}>
          <Avatar
            alt={post.userName}
            src={post.userAvatar}
            sx={{ width: 24, height: 24, marginRight: 1 }}
          />
          <Typography variant="subtitle1">{post.userName}</Typography>
        </Box>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mt: 1 }}>
          {post.title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 1 }}>
          {post.text}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Posted at:{" "}
          {post.createdAt.substring(0, 10) +
            " " +
            post.createdAt.substring(11, 16)}
        </Typography>
      </Box>
    </Modal>
  );
};

export default PostModal;
