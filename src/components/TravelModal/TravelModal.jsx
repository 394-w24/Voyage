import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import "./TravelModal.css";
import OpenAI from "openai";
import { itineraryParser } from "./itineraryParser";

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxHeight: "calc(100% - 96px)",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true,
  organization: "org-y9B1VFvuzhsYHcpG3KJWqvKR",
});

const getGPTRequests = async (days, travelers, destination) => {
  const message = `Generate a ${days} day itinerary for ${travelers} people visiting ${destination} with bullet points of things to do in the morning, afternoon, and evening. Give explanations for each activity. Do not use numbers when listing activities.`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [{ role: "user", content: message }],
    temperature: 0,
    max_tokens: 1000,
  });
  return response;
};

const TravelModal = ({
  open,
  handleClose,
  destination,
  addedToWishlist,
  handleAddToWishlist,
}) => {
  const [numTravelers, setNumTravelers] = useState("");
  const [numDays, setNumDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedPlan, setParsedPlan] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState("");


  const handleGeneratePlan = async () => {
    setLoading(true);
    const response = await getGPTRequests(
      numDays,
      numTravelers,
      destination.name
    );
    const travelPlan = itineraryParser(response.choices[0].message.content);
    setParsedPlan(travelPlan);
    setLoading(false);

  };

  const isAdded =
    addedToWishlist === true ? true : addedToWishlist[destination.name]?.added;


  const Loader = () => {
    const [text, setText] = useState('');
    useEffect(() => {
      const interval = setInterval(() => {
        setText(prevText => {
          if (prevText.length === 3) {
            return ''; 
          }
          return prevText + '.'; 
        });
      }, 300);
      return () => clearInterval(interval);
    }, []);
    return (
      <h3>
        Loading itinerary, please wait{text}
      </h3>
    );
  };

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
          height="100%"
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
                <CardContent className="card-content">
                  <Typography variant="subtitle2">
                    Number of Travelers
                  </Typography>
                  <TextField
                    label="#"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    fullWidth
                    value={numTravelers}
                    onChange={(event) => setNumTravelers(event.target.value)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" >
                    Duration of the Trip
                  </Typography>
                  <TextField
                    label="# of days"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    fullWidth
                    value={numDays}
                    onChange={(event) => setNumDays(event.target.value)}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box component="main" sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={handleGeneratePlan}
          >
            Generate Plan
          </Button>

      
          {/* {loading && <h3>Loading itinerary, please wait...</h3>} */}

          {loading && <Loader />}

          {Array.isArray(parsedPlan) &&
            parsedPlan.map((day, index) => (
              <div key={index}>
                <u> <h3>Day {day.dayTitle}</h3></u>
                <ul>
                  {day.activities.map((activity, activityIndex) => (
                    <ul key={activityIndex}>
                      <br></br>
                      <strong>{activity.timeOfDay}</strong>{" "}
                      {activity.description}
                    </ul>
                  ))}
                </ul>
              </div>
            ))}

            <Grid item xs={12} sm={6} md={4} marginTop={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" >
                    Additional Information
                  </Typography>
                  <TextField
                    label="Add follow-up questions, preferences, etc. here..."
                    variant="outlined"
                    margin="normal"
                    size="small"
                    fullWidth
                    value={additionalInfo}
                    onChange={(event) => setAdditionalInfo(event.target.value)}
                  />
                </CardContent>
              </Card>
              <Box sx={{ marginTop: 3 }}>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  // onClick={}
                >
                  Regenerate
                </Button>
              </Box>
            </Grid>

        </Box>
      </Box>
    </Modal>
  );
  


};

export default TravelModal;
