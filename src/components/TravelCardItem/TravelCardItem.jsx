import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TravelModal from "../TravelModal/TravelModal";
import "./TravelCardItem.css";

const TravelCardItem = ({
  destination,
  addedToWishlist,
  handleAddToWishlist,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    document.dispatchEvent(new CustomEvent("resetTravelModal"));
  };

  return (
    <>
      <Card
        sx={{ height: "350px" }}
        onClick={handleOpenModal}
        className="travel-card"
      >
        <CardMedia
          component="img"
          height="140"
          image={destination.image}
          alt={destination.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="travel-destination-name"
          >
            {destination.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Best in {destination.season.join(", ")} -{" "}
            {destination.temperature.join(", ")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Budget: {destination.budget.min} - {destination.budget.max}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hotel Budget: {destination.hotelBudget}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dining Budget: {destination.diningBudget}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Transportation Budget: {destination.transportationBudget}
          </Typography>
        </CardContent>
      </Card>
      <TravelModal
        open={modalOpen}
        handleClose={handleCloseModal}
        destination={destination}
        addedToWishlist={addedToWishlist}
        handleAddToWishlist={handleAddToWishlist}
      />
    </>
  );
};

export default TravelCardItem;
