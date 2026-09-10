const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-5.4",
      instructions: `
You are a helpful AI assistant for a tutoring platform.

Help students with:
- Finding the right tutor
- Understanding school subjects
- Study advice
- Learning strategies

Keep answers helpful, clear, and student-friendly.
      `,
      input: message,
    });

    res.json({
      reply: response.output_text,
    });

  } catch (error) {
    console.error("OpenAI Error:", error);

    res.status(500).json({
      error: "Unable to get AI response",
    });
  }
});

module.exports = router;