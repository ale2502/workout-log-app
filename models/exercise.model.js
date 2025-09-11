const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    muscleGroup: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['weighted', 'bodyweight', 'time_hold', 'distance']
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Exercise', exerciseSchema);