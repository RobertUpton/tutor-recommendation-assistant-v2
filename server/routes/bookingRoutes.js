const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getBookings,
  getUserBookings,
  createBooking,
  deleteBooking,
} = require( "../controllers/bookingController");

// Get all bookings
router.get("/", protect, getBookings);

// Create booking
router.post("/", protect, createBooking);

// Delete booking
router.delete("/:id", protect, deleteBooking);

// Get bookings for one user
router.get("/user/:userId", getUserBookings);

module.exports = router;

