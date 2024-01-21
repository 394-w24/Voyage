import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./TravelCardItem";

const TravelCardItem = ({ destination }) => {
  return (
    <Card sx={{ height: "350px" }}>
      <CardMedia
        component="img"
        height="140"
        image={destination.image}
        alt={destination.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
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
  );
};

export default TravelCardItem;
