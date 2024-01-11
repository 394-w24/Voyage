const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;

const data = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'You are a travel advisor. Recommend travel destinations and itineraries based on user interests, filters, location preferences, budget, and time of year. Explain why each destination and itinerary matches the user\'s preferences.' },
    { role: 'user', content: 'I\'m interested in historical sites and outdoor activities. I prefer a location with a moderate climate, my budget is around $2000, and I plan to travel in the spring. Can you recommend a destination and itinerary?' },
  ],
};

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
};

axios.post('https://api.openai.com/v1/chat/completions', data, config)
  .then(response => {
    console.log(response.data.choices[0].message);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
