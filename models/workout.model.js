const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now
    },
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
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Workout', workoutSchema);
