const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  exercises: [{
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    },
    sets: [{
      weight: Number,
      reps: Number,
      rir: Number
    }]
  }]
});

module.exports = mongoose.model('Workout', workoutSchema);