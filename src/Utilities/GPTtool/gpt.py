#https://platform.openai.com/docs/assistants/overview

from openai import OpenAI
import os

OpenAI.api_key=os.getenv('OPENAI_API_KEY')


client = OpenAI()

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a travel advisor. Recommend travel destinations and itineraries based on user interests, filters, location preferences, budget, and time of year. Explain why each destination and itinerary matches the user's preferences."},
    {"role": "user", "content": "who is kobe"},
  ]
)

print(completion.choices[0].message)