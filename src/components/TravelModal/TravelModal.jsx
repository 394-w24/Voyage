import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import "./TravelModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TravelModal = ({
  open,
  handleClose,
  destination,
  addedToWishlist,
  handleAddToWishlist,
}) => {
  const isAdded = addedToWishlist[destination.name]?.added;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style} className="travel-box">
        <img
          src={destination.image}
          alt={destination.name}
          width="100%"
          height="400px"
        />
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Here's some information about {destination.name}.
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa
          sapien faucibus et molestie ac feugiat sed. Nulla porttitor massa id
          neque aliquam vestibulum morbi. Feugiat nibh sed pulvinar proin. Quam
          quisque id diam vel. Integer feugiat scelerisque varius morbi enim
          nunc. Malesuada proin libero nunc consequat. Pretium viverra
          suspendisse potenti nullam ac tortor vitae purus faucibus. Viverra
          nibh cras pulvinar mattis nunc sed blandit libero. Dui vivamus arcu
          felis bibendum ut tristique et. In ornare quam viverra orci sagittis.
          Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur
          vitae. At risus viverra adipiscing at in. Enim nunc faucibus a
          pellentesque sit amet porttitor eget. Mauris pellentesque pulvinar
          pellentesque habitant morbi tristique senectus et. Interdum
          consectetur libero id faucibus nisl. Enim nunc faucibus a pellentesque
          sit amet porttitor eget. Eget mi proin sed libero. Quis blandit turpis
          cursus in hac habitasse platea. Eget dolor morbi non arcu risus.
          Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam
          quis. Purus in massa tempor nec. Nam aliquam sem et tortor consequat
          id porta nibh venenatis. Tincidunt lobortis feugiat vivamus at augue.
          Nibh sed pulvinar proin gravida hendrerit lectus.
        </Typography>
        <Button
          onClick={() => handleAddToWishlist(destination)}
          size="medium"
          startIcon={isAdded ? <CheckIcon /> : <AddIcon />}
          sx={{ mt: 2 }}
        >
          {isAdded ? "Added to Wishlist" : "Add to Wishlist"}
        </Button>
      </Box>
    </Modal>
  );
};

export default TravelModal;
