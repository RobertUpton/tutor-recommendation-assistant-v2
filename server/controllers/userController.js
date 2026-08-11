const User = require("../models/Users");
const Booking = require("../models/Bookings");
const Tutor = require("../models/Tutors");
// Save a tutor
const saveTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;

    // Check tutor exists
    const tutor = await Tutor.findById(tutorId);

    if (!tutor) {
      return res.status(404).json({
        message: "Tutor not found.",
      });
    }

    // Check if already saved
    if (req.user.savedTutors.includes(tutorId)) {
      return res.status(400).json({
        message: "Tutor already saved.",
      });
    }

    // Add tutor to saved tutors
    req.user.savedTutors.push(tutorId);

    await req.user.save();

    res.status(200).json({
      message: "Tutor saved successfully.",
      savedTutors: req.user.savedTutors,
    });
  } catch (error) {
    console.error("Save tutor error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {

    const user = await User.findById(
      req.params.id
    ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateProfile = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


const bcrypt = require("bcryptjs");

const updateSettings = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      notifications,
      darkMode,
    } = req.body;

    const updateData = {
      name,
      email,
      notifications,
      darkMode,
    };

    if (password) {
      updateData.password =
        await bcrypt.hash(password, 10);
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

//account deleting


const deleteAccount = async (req, res) => {
  try {

    const userId = req.params.id;

    // Delete user's bookings
    await Booking.deleteMany({
      userId: userId,
    });

    // Delete user
    await User.findByIdAndDelete(
      userId
    );

    res.json({
      message:
        "Account deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



module.exports = {
  saveTutor,
  getProfile,
  updateProfile,
  updateSettings,
  deleteAccount,
};