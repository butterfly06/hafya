import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' })

console.log("apikey value:",process.env.OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  
});

export default openai;