import OpenAI from 'openai';

// Create a new configuration using your environment variable.
// Make sure you have VITE_OPENAI_API_KEY in your .env file.
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for development! In production, calls should go through your backend
});