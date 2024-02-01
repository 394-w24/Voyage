// gptRequests.jsx

import axios from 'axios';

const API_KEY = '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';

export async function generateTravelPlan(prompts) {

  const requestData = {
    model: 'text-davinci-003',
    prompt: prompts,
  };
  
  const response = await axios.post('https://api.openai.com/v1/completions', requestData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
  });

  return response.data.choices[0].text;
}