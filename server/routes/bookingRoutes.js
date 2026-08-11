const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getBookings,
  createBooking,
  deleteBooking,
} = require( "../controllers/bookingController");

router.get("/", protect, getBookings);

router.post("/", protect, createBooking);

router.delete("/:id", protect, deleteBooking);

module.exports = router;

