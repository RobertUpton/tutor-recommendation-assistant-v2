const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({

  // User who made the booking
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Tutor being booked
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutors",
    required: true,
  },

  // Date of the tutoring session
  sessionDate: {
    type: Date,
    required: true,
  },

  // Optional notes
  notes: {
    type: String,
    default: "",
  },

  // Booking status
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model("Booking", BookingSchema);