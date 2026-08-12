const Booking = require("../models/Bookings");

// Get All Bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("tutorId", "name subject price");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Booking
const createBooking = async (req, res) => {
  try {
    const {
      userId,
      tutorId,
      sessionDate,
      notes,
    } = req.body;

    if (!userId || !tutorId || !sessionDate) {
      return res.status(400).json({
        message: "User, tutor and session date are required.",
      });
    }

    const booking = await Booking.create({
      userId,
      tutorId,
      sessionDate,
      notes,
    });

    res.status(201).json({
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Bookings By User
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.params.userId,
    })
      .populate("tutorId", "name subject price");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      message: "Booking cancelled successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getBookings,
  createBooking,
  getUserBookings,
  deleteBooking,
};