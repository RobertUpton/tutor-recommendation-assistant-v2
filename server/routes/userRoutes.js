const express = require("express");

const router = express.Router();

// Import user controller functions
const {
  saveTutor,
  getSavedTutors,
  removeSavedTutor,
  getProfile,
  updateProfile,
  updateSettings,
  deleteAccount,
} = require("../controllers/userController");

// Authentication middleware
const protect = require("../middleware/authMiddleware");

// Save tutor
router.post(
  "/save-tutor/:tutorId",
  protect,
  saveTutor
);

//Get saved tutors
router.get(
  "/saved-tutors",
  protect,
  getSavedTutors
);

// Remove a saved tutor
router.delete(
  "/save-tutor/:tutorId",
  protect,
  removeSavedTutor
);

{/**User profiles */ }
router.get(
  "/:id",
  getProfile
);

router.put(
  "/profile/:id",
  updateProfile
);

router.put(
  "/settings/:id",
  updateSettings
);

router.delete(
  "/:id",
  deleteAccount
);



module.exports = router;