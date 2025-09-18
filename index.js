const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Exercise = require('./models/exercise.model');
const Workout = require('./models/workout.model');

dotenv.config();

// middleware
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Node API');
});

// Creating/adding a new exercise
app.post('/api/exercises', async (req, res) => {
  try {
    const { name, muscleGroup, type} = req.body;
    if (!name || !muscleGroup) {
      return res.status(400).json({ message: 'Name or muscle group is missing'});
    }
    const exercise = await Exercise.create({ name, muscleGroup, type });
    return res.status(201).json(exercise);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Getting/showing the existing exercises
app.get('/api/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find().sort({ createdAt: -1 });
    return res.json(exercises);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Creating/adding a new workout
app.post('/api/workouts', async (req, res) => {
  try {
    const { date, exercises } = req.body;
    const workoutData = {
      date: date ? new Date(date) : new Date(),
      exercises: exercises || []
    };

    const workout = await Workout.create(workoutData);
    return res.status(201).json(workout);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
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

// test