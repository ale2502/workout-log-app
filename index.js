const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello from Node API');
});

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@workoutlogdb.smmyliq.mongodb.net/database?retryWrites=true&w=majority&appName=WorkoutLogDB`)
.then(() => {
  console.log('Connected to database!');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch(() => {
  console.log('Connection failed');
});