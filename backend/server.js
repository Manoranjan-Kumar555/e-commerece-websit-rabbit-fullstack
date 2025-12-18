import express from 'express'; // Optional here unless you're using it
import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8081;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port :-  http://localhost:${PORT}`);
});
