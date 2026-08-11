const mongoose = require("mongoose");

const TutorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  bio: {
    type: String,
  },

  experience: {
    type: String,
  },

  availability: {
    type: String,
    default: "Available",
  },

  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },

});

module.exports = mongoose.model("Tutors", TutorSchema);