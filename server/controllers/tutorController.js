const Tutor = require("../models/Tutors");

// Get all tutors (with optional search)
const getTutors = async (req, res) => {
  try {
    const { subject, maxPrice } = req.query;

    let filter = {};

    if (subject) {
      filter.subject = new RegExp(subject, "i");
    }

    if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    const tutors = await Tutor.find(filter);

    res.status(200).json(tutors);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get tutor by ID
const getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);

    if (!tutor) {
      return res.status(404).json({
        message: "Tutor not found",
      });
    }

    res.json(tutor);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Create tutor
const createTutor = async (req, res) => {
  try {
    const tutor = await Tutor.create(req.body);

    res.status(201).json(tutor);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update tutor
const updateTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!tutor) {
      return res.status(404).json({
        message: "Tutor not found",
      });
    }

    res.json(tutor);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete tutor
const deleteTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id);

    if (!tutor) {
      return res.status(404).json({
        message: "Tutor not found",
      });
    }

    res.json({
      message: "Tutor deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getTutors,
  getTutorById,
  createTutor,
  updateTutor,
  deleteTutor,
};