const itineraryParser = (itinerary) => {
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
  
  export { itineraryParser };
  

