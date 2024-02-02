// Use ES6 import syntax
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true
});

// Define your function
export function GPTRequests() {
  // async function for chat request
  async function chatReq(req, res) {
    try {
      const message = "Which is the capital of Albania?";
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0,
        max_tokens: 1000,
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  // Export the chatReq function
  return { chatReq };
};

// Remove the default export as it's not needed