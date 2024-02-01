// gptRequests.jsx

// import axios from 'axios';

// const API_KEY = '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';

// export async function generateTravelPlan(prompts) {

//   const requestData = {
//     model: 'text-davinci-003',
//     prompt: prompts,
//   };
  
//   const response = await axios.post('https://api.openai.com/v1/completions', requestData, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${API_KEY}`,
//     },
//   });

//   return response.data.choices[0].text;
// }
import OpenAI from "openai";
import React from "react";

const openai = new OpenAI({
  apiKey: "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", dangerouslyAllowBrowser: true,
});

const GPTRequest = () => {
  // Define the function inside your component
  const chatReq = async (req, res) => {
    try {
      const message = "Which is the capital of Albania?";
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0,
        max_tokens: 1000,
      });
      console.log(response)
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  return null;
}

export default GPTRequest;