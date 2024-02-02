import React, { useState } from "react"; 
import { Grid, Card, CardContent, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import "./TravelModal.css";
import OpenAI from "openai";

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

const openai = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true,
  organization: 'org-y9B1VFvuzhsYHcpG3KJWqvKR',

});

const getGPTRequests = async (days, travelers, destination) => {
    const message = `Generate a ${days} day itinerary for ${travelers} people visiting ${destination} with bullet points of things to do in the morning, afternoon, and evening. Give explanations for each activity. Do not use numbers when listing activities.`;
    const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [{ role: "user", content: message }],
    temperature: 0,
    max_tokens: 1000,
    })
    console.log(response);
    return response;
    }

var checking = 0;

if (checking == 0) {
  console.log(checking)
  checking = checking + 1;
  getGPTRequests();
  console.log(checking)
}

const TravelModal = ({
  open,
  handleClose,
  destination,
  addedToWishlist,
  handleAddToWishlist,
}) => {
  const [numTravelers, setNumTravelers] = useState(""); 
  const [numDays, setNumDays] = useState("");
  const [travelPlan, setTravelPlan] = useState("");
  const [gptResponse, setGptResponse] = useState("");

  const isAdded =
    addedToWishlist === true ? true : addedToWishlist[destination.name]?.added;

  const parseItinerary = (itinerary) => {
    const days = itinerary.split("Day ").slice(1);

    return days.map((day, index) => {
      const lines = day.trim().split("\n");
      const dayTitle = lines[0];
      const activities = lines.slice(1).map((activity) => {
        // Remove the dash before the time of day and extra colons at the end
        const [timeOfDay, description] = activity.replace(/^- |:$/g, '').split(": ");
        return { timeOfDay, description };
      });

      return {
        dayTitle,
        activities,
      };
    });
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
                    value={numTravelers}
                    onChange={(event) => setNumTravelers(event.target.value)}
                    // placeholder="Please enter the number of travelers"
                    
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
                    value={numDays}
                    onChange={(event) => setNumDays(event.target.value)}
                    // placeholder="Please enter the number of days you plan to stay"
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
            // console.log("clicked");
            // console.log(numDays);
            // console.log(numTravelers);
            // console.log("name", destination.name);
            setGptResponse("Loading response...");
            const response = await getGPTRequests(numDays, numTravelers, destination.name);
            setTravelPlan(response.choices[0].message.content);
            const parsedItinerary = parseItinerary(
              response.choices[0].message.content
            );
            setGptResponse(parsedItinerary);
            // setGptResponse(response.choices[0].message.content);
          }}
        >
          Generate Plan  
        </Button>

        <Button
          variant="contained" size="medium" color="primary"
          onClick={async () => {
            // console.log("clicked");
            // console.log(numDays);
            // console.log(numTravelers);
            // console.log("name", destination.name);
            // setGptResponse("Loading response...");
            // const response = await getGPTRequests(numDays, numTravelers, destination.name);

            // setGptResponse(response.choices[0].message.content);
            const parsedItinerary = parseItinerary(
              travelPlan
            );
            setGptResponse(parsedItinerary);
          }}
        >
          retry  
        </Button>

        {/* {Array.isArray(gptResponse) &&
          gptResponse.map((day, index) => (
            <div key={index}>
              <h3>Day {day.dayTitle}</h3>
              
                {day.activities.map((activity, activityIndex) => (
                  <ul>
                
                  <ul key={activityIndex}>
                  <strong>{activity.timeOfDay}:</strong>{" "}
                    
                    {activity.description}
                  </ul>
                  </ul>
                ))}
              
            </div>
          ))} */}

{/* {Array.isArray(gptResponse) &&
  gptResponse.map((day, index) => (
    <div key={index}>
      <h3>{day.dayTitle}</h3>
      <ul>
        {day.activities.map((activity, activityIndex) => (
          <ul key={activityIndex}>
            <strong>{activity.timeOfDay}</strong>{" "}
            {activity.description}
          </ul>
        ))}
      </ul>
    </div>
  ))} */}

{Array.isArray(gptResponse) &&
  gptResponse.map((day, index) => (
    <div key={index}>
      <h3>Day {day.dayTitle}</h3>
      <ul>
        {day.activities.map((activity, activityIndex) => (
          <ul key={activityIndex}>
            <strong>{activity.timeOfDay}</strong>{" "}
            {activity.description}
          </ul>
        ))}
      </ul>
    </div>
  ))}



        {/* {gptResponse && (
          <div>
            <h3>{gptResponse}</h3>
            <p></p>
          </div>
        )} */}
        </Box>
      </Box>
    </Modal>
  );
};

export default TravelModal;
