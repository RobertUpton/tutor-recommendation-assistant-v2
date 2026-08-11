const Booking = require("../models/Bookings");
const Tutor = require("../models/Tutors");

const getDashboardStats = async (req, res) => {
  try {
    // Get the currently logged-in user's ID
    const userId = req.user._id;

    // Count this user's upcoming bookings
    const upcomingSessions = await Booking.countDocuments({
      userId: userId,
      status: { $in: ["Pending", "Confirmed"] },
    });

    // Saved tutors are not currently stored in the User model
    // or Booking model, so this stays at 0 for now.
    const savedTutors = 0;

    // Count this user's completed bookings
    const completedSessions = await Booking.countDocuments({
      userId: userId,
      status: "Completed",
    });

    res.json({
      upcomingSessions,
      savedTutors,
      completedSessions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};