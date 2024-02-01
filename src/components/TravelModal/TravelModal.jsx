import React, { useState } from "react"; 
import { Grid, Card, CardContent, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import "./TravelModal.css";
import GPT from "../../Utilities/GPTtool/gpt.jsx";

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
  const [gptResponse, setGptResponse] = useState("");

  const isAdded =
    addedToWishlist === true ? true : addedToWishlist[destination.name]?.added;

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
        <Typography sx={{ mt: 2 }}>{destination.info}</Typography>
        <Button
          onClick={() => handleAddToWishlist(destination)}
          size="medium"
          startIcon={isAdded ? <CheckIcon /> : <AddIcon />}
          sx={{ mt: 2 }}
        >
          {isAdded ? "Added to Wishlist" : "Add to Wishlist"}
        </Button>
        <Box component="main" sx={{ marginTop: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Number of travelers</Typography>
                  <TextField
                    label="#"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    fullWidth
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Number of days</Typography>
                  <TextField
                    label="#"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    fullWidth
                  />
                </CardContent>
              </Card>
            </Grid>
            
          </Grid>
        </Box>
        <Box component="main" sx={{ marginTop: 3 }}>
        <Button
          variant="contained" size="medium" color="primary"
          onClick={async () => {
            setGptResponse("Loading response...");
            const response = await generateTravelPlan();
            setGptResponse(response);
          }}
        >
          Generate Plan  
        </Button>

        <GPT onDataFetched={setGptResponse} />

        {gptResponse && (
          <div>
            <h3>Travel Plan</h3>
            <p>{gptResponse}</p>
          </div>
        )}
        </Box>
      </Box>
    </Modal>
  );
};

export default TravelModal;
