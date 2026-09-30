// middleware/apiKeyAuth.js
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' })

export function checkApiKey(req, res, next) {
  const apiKey = req.query.APIkey;

  if (!apiKey) {
    return res.status(401).json({ message: 'Not authorized: Missing API key' });
  }

   if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }
  next(); // correct key
}
