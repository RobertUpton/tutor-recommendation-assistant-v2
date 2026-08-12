require("dotenv").config();

// Imports required packages, connections, & routes
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
const Tutor = require("./models/Tutors");
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const Tutors = require("./models/Tutors");
//const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Connect to MongoDB database
connectDB();


app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);
//app.use("/api/ai", aiRoutes);

app.use(
  "/api/users",
  userRoutes
);

// Test route
app.get("/", (req, res) => {
  res.send("TutorMatch API Running");
});

// Temporary route to add a tutor
app.get("/test-tutor", async (req, res) => {
  try {
    const tutor = await Tutor.create({
      name: "John Smith",
      subject: "Mathematics",
      price: 25,
      bio: "Experienced math tutor",
    });

    res.json(Tutor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


app.get("/seed-tutors", async (req, res) => {
  try {
    const count = await Tutor.countDocuments();

    if (count > 0) {
      return res.send("Tutors already exist.");
    }

    await Tutor.insertMany([
      {
        name: "Sarah Johnson",
        subject: "Mathematics",
        price: 25,
        bio: "Helping students master algebra and calculus.",
      },
      {
        name: "David Lee",
        subject: "Physics",
        price: 30,
        bio: "SAT and college physics specialist.",
      },
      {
        name: "Emily Carter",
        subject: "Programming",
        price: 35,
        bio: "Frontend and JavaScript tutor.",
      },
      {
        name: "Michael Brown",
        subject: "Chemistry",
        price: 28,
        bio: "Making chemistry easy to understand.",
      },
      {
        name: "Jessica Wilson",
        subject: "English",
        price: 22,
        bio: "Essay writing and grammar expert.",
      },
    ]);

    res.send("Tutors added successfully.");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});




// Port number the server will run on
const PORT = process.env.PORT || 5000;


app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});