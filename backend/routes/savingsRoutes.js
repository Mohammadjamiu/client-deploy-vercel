// routes/savings.js

const express = require("express");
const UserSaving = require("../models/UserSaving"); // Import the UserSaving model
const router = express.Router();

// Create a new savings goal
router.post("/", async (req, res) => {
  const { userId, targetName, targetAmount, frequency, targetDate } = req.body;

  try {
    const newGoal = new UserSaving({
      userId,
      targetName,
      targetAmount,
      frequency,
      nextSavingDate: calculateNextDate(frequency),
      targetDate,
    });

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: "Failed to create savings goal" });
  }
});

// Get all savings for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const savings = await UserSaving.find({ userId });

    if (!savings.length) {
      return res
        .status(404)
        .json({ message: "No savings found for this user" });
    }

    res.json(savings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch savings data" });
  }
});

// Helper function to calculate the next saving date
function calculateNextDate(frequency) {
  const today = new Date();

  if (frequency === "daily") {
    return new Date(today.setDate(today.getDate() + 1));
  } else if (frequency === "weekly") {
    return new Date(today.setDate(today.getDate() + 7));
  } else if (frequency === "monthly") {
    return new Date(today.setMonth(today.getMonth() + 1));
  }
  throw new Error("Invalid frequency");
}

module.exports = router;
