import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import Divider from "@mui/material/Divider";
import "./TravelModal.css";
import OpenAI from "openai";

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

const style2 = {
  width: "auto",
  maxHeight: "calc(100% - 96px)",
  overflow: "auto",
  bgcolor: "background.paper",
  marginTop: 2,
  p: 0.1,
};

const getGPTRequests = async (
  days,
  travelers,
  destination,
  apiKey,
  temperature
) => {
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
    organization: "org-y9B1VFvuzhsYHcpG3KJWqvKR",
    temperature: parseFloat(temperature),
  });
  const message = `Generate a ${days} day itinerary for ${travelers} people visiting ${destination} with bullet points of things to do in the morning, 
                    afternoon, and evening. Give explanations for each activity. Do not use numbers when listing activities.`;
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
  const [apiKey, setApiKey] = useState("");
  const [temperature, setTemperature] = useState(1);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [travelPlan, setTravelPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    setLoading(true);
    const response = await getGPTRequests(
      numDays,
      numTravelers,
      destination.name,
      apiKey,
      temperature
    );
    setTravelPlan(response.choices[0].message.content);
    setLoading(false);
    setIsPlanGenerated(true);
  };

  const handleModalClose = () => {
    document.dispatchEvent(new CustomEvent("resetTravelModal"));
    handleClose();
    setIsPlanGenerated(false);
  };

  const isAdded =
    addedToWishlist === true ? true : addedToWishlist[destination.name]?.added;

  const formatTravelPlan = (plan, days) => {
    const dayRegex = /Day \d+:/g;
    const timeRegex = /(?:Morning:|Afternoon:|Evening:)/g;
    const activityRegex = /-\s/g;
    const formattedPlan = [];
    let dayPlans = plan.split(dayRegex);
    dayPlans.forEach((dayPlan, index) => {
      if (dayPlan.trim() === "") return;
      if (days > 1 && index > 0) {
        formattedPlan.push(
          <Typography variant="h6" sx={{ my: 2 }}>
            Day {index}:
          </Typography>
        );
      }
      let timeSegments = dayPlan.split(timeRegex);
      timeSegments = timeSegments.filter((segment) => segment.trim() !== "");

      timeSegments.forEach((segment, idx) => {
        if (idx % 3 === 0)
          formattedPlan.push(
            <Typography variant="subtitle1">Morning:</Typography>
          );
        if (idx % 3 === 1)
          formattedPlan.push(
            <Typography variant="subtitle1">Afternoon:</Typography>
          );
        if (idx % 3 === 2)
          formattedPlan.push(
            <Typography variant="subtitle1">Evening:</Typography>
          );
        const activities = segment
          .trim()
          .split(activityRegex)
          .filter((activity) => activity.trim() !== "");
        activities.forEach((activity, activityIdx) => {
          formattedPlan.push(
            <Typography variant="subtitle2" key={activityIdx} sx={{ my: 1 }}>
              - {activity.trim()}
            </Typography>
          );
        });
        if (idx < timeSegments.length - 1) {
          formattedPlan.push(<Divider sx={{ my: 1 }} />);
        }
      });

      if (days > 1 && index < dayPlans.length - 1) {
        formattedPlan.push(<Divider sx={{ my: 1 }} />);
      }
    });
    return formattedPlan;
  };

  const [isPlanGenerated, setIsPlanGenerated] = useState(false);

  useEffect(() => {
    if (!open) {
      setNumTravelers("");
      setNumDays("");
      setApiKey("");
      setTemperature(1);
      setTravelPlan("");
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
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
                  <Typography variant="subtitle2" style={{ marginTop: 15 }}>
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
                  <Typography variant="subtitle2" style={{ marginTop: 15 }}>
                    Api Key
                  </Typography>
                  <TextField
                    label="your openAI api key"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    fullWidth
                    value={apiKey}
                    onChange={(event) => setApiKey(event.target.value)}
                  />
                  <Typography variant="subtitle2" style={{ marginTop: 15 }}>
                    AI Temperature
                  </Typography>
                  <TextField
                    label="From 0 to 2"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    fullWidth
                    value={temperature}
                    onChange={(event) => setTemperature(event.target.value)}
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
            {isPlanGenerated ? "Try Again" : "Generate Plan"}
          </Button>
        </Box>

        {travelPlan && (
          <Box sx={style2} className="travel-box">
            <Card>
              <CardContent className="travel-plan-card-content">
                {formatTravelPlan(travelPlan, Number(numDays))}
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default TravelModal;
