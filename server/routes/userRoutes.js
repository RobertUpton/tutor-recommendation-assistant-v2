const express = require("express");

const router = express.Router();


const {
  saveTutor,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

router.post(
  "/save-tutor/:tutorId",
  protect,
  saveTutor
);

const {
  getProfile,
  updateProfile,
  updateSettings,
  deleteAccount,
} = require("../controllers/userController");

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