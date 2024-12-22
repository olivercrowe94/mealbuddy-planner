// src/lib/openai.ts

import { Configuration, OpenAIApi } from "openai";

// Create a new configuration using your environment variable.
// Make sure you have VITE_OPENAI_API_KEY in your .env file.
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

// Create an instance of the OpenAIApi client.
export const openai = new OpenAIApi(configuration);
