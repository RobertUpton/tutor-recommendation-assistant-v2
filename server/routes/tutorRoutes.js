const express = require("express");
const router = express.Router();

const {
  getTutors,
  getTutorById,
  createTutor,
  updateTutor,
  deleteTutor,
} = require("../controllers/tutorController");

router.get("/", getTutors);
router.get("/:id", getTutorById);

router.post("/", createTutor);
router.put("/:id", updateTutor);
router.delete("/:id", deleteTutor);

module.exports = router;