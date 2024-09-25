const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db"); // Import the database connection module
const UserSaving = require("./models/UserSavingModel");
require("./cron/savingsCron"); // Import the cron job
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4500; // Default to 4500 if PORT is not set

app.use(express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.use(express.json());
app.use(cors());

// Fetch savings by userId
app.get("/api/savings/:userId", async (req, res) => {
  const { userId } = req.params; // Extract userId from request params

  try {
    const savings = await UserSaving.find({ userId }).sort({ createdAt: -1 });

    if (!savings.length) {
      return res
        .status(404)
        .json({ message: "No savings found for this user" });
    }

    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch savings data" });
  }
});

// Create a new savings goal
// app.post("/api/savings", async (req, res) => {
//   const { title, targetAmount, targetDate, frequency } = req.body;
//   const userId = "testUserId123"; // Hardcoded for now, replace with dynamic user ID later

//   // Ensure the targetDate is in the future
//   if (new Date(targetDate) <= new Date()) {
//     return res
//       .status(400)
//       .json({ error: "Target date must be in the future." });
//   }

//   const newGoal = new UserSaving({
//     userId,
//     targetName: title, // Assuming 'title' is the target name for savings
//     targetAmount,
//     currentAmount: 0, // Initial saved amount starts at 0
//     targetDate,
//     frequency,
//     nextSavingDate: calculateNextDate(frequency),
//   });

//   try {
//     await newGoal.save();
//     res.status(201).json(newGoal);
//   } catch (error) {
//     res.status(500).json({ error: "Error saving goal" });
//   }
// });

// Create a new savings goal
app.post("/api/savings", async (req, res) => {
  const { targetName, targetAmount, targetDate, frequency } = req.body;
  const userId = "testUserId123"; // Hardcoded for now, replace with dynamic user ID later

  // Ensure the targetDate is in the future
  if (new Date(targetDate) <= new Date()) {
    return res
      .status(400)
      .json({ error: "Target date must be in the future." });
  }

  const newGoal = new UserSaving({
    userId,
    targetName, // Assuming 'title' is the target name for savings
    targetAmount,
    currentAmount: 0, // Initial saved amount starts at 0
    targetDate,
    frequency,
    nextSavingDate: calculateNextMinute(), // Set next saving date to next minute
  });

  try {
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: "Error saving goal" });
  }
});

// Update savings goal by ID
app.put("/api/savings/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // The new data to update the savings goal with

  try {
    const updatedGoal = await UserSaving.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are run
    });

    if (!updatedGoal) {
      return res.status(404).json({ message: "Savings goal not found" });
    }

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: "Error updating savings goal" });
  }
});

// DELETE /api/savings/:id
app.delete("/api/savings/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the savings goal by ID and delete it
    const deletedGoal = await UserSaving.findByIdAndDelete(id);

    // Check if the goal was found and deleted
    if (!deletedGoal) {
      return res.status(404).json({ message: "Savings goal not found." });
    }

    res.status(200).json({ message: "Savings goal deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting savings goal." });
  }
});

// Delete all savings goals for a specific user endpoint
app.delete("/api/savings/deleteAll/:userId", async (req, res) => {
  const { userId } = req.params; // Get userId from URL parameter

  try {
    const result = await UserSaving.deleteMany({ userId }); // Delete all documents matching userId
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No savings goals found for this user" });
    }

    res.status(200).json({
      message: `${result.deletedCount} saving(s) deleted successfully for user ${userId}`,
    });
  } catch (error) {
    console.error("Error deleting savings for user:", error);
    res.status(500).json({ error: "Error deleting savings goals" });
  }
});

// Connect to the database and then start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error.message);
  });

// function calculateNextMinute() {
//   const now = new Date();
//   now.setMinutes(now.getMinutes() + 1); // Set to 1 minute in the future
//   return now;
// }

function calculateNextMinute() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 0.1); // Set very close to the current time (6 seconds later)
  return now;
}
