// src/GPT.jsx

import React, { useEffect } from "react";
import { generateTravelPlan } from "./gptRequests";

const GPT = ({ onDataFetched }) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await generateTravelPlan();
        
        onDataFetched(response);  
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [onDataFetched]);

  return null; 
};

export default GPT;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { generateTravelPlan } from './gptRequests';

// const GPT = ({ onDataFetched }) => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiKey = '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';
//         const data = {
//           model: 'gpt-3.5-turbo',
//           messages: [
//             { role: 'system', content: 'You are a travel advisor. Recommend travel destinations and itineraries based on user interests, filters, location preferences, budget, and time of year. Explain why each destination and itinerary matches the user\'s preferences.' },
//             { role: 'user', content: 'i need a travel plan' },
//           ],
//         };
//         const config = {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`,
//           },
//         };

//         const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);
//         const openAIResponse = response.data.choices[0].message;

//         // Pass the data back to the parent component
//         onDataFetched(openAIResponse);
//       } catch (error) {
//         console.error('Error:', error.message);
//         // Handle error if needed
//       }
//     };

//     fetchData();
//   }, [onDataFetched]); // Make sure to handle dependencies properly

//   return <></>; // This component doesn't render anything directly
// };

// export default GPT;
