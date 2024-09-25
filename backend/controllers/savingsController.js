const UserSaving = require("../models/UserSavingModel");

// Controller to get user data and create a savings target
const createSavingsTarget = async (req, res) => {
  try {
    const { targetName, targetAmount, targetDate } = req.body;
    const userId = "testUserId123"; // Hardcoded for testing

    // Validate required fields
    if (!targetName || !targetAmount || !targetDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // No external API call, just using the manual user ID
    const userData = { id: userId, name: "Test User" }; // Mock user data

    // Handle the fetched user data if needed
    console.log("User Data:", userData);

    // Create a new savings target
    const newSaving = new UserSaving({
      userId,
      targetName,
      targetAmount,
      targetDate,
      currentAmount: 0,
    });

    await newSaving.save();
    res.status(201).json(newSaving);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all savings targets for a specific user
const getUserSavings = async (req, res) => {
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
};
// New function to calculate savings
const calculateSavings = (targetAmount, duration, selectedDurationType) => {
  let result;
  const totalDays = duration; // Assume duration is in days

  switch (selectedDurationType) {
    case "daily":
      result = targetAmount / totalDays;
      break;
    case "weekly":
      result = targetAmount / (totalDays / 7);
      break;
    case "monthly":
      result = targetAmount / (totalDays / 30);
      break;
    default:
      throw new Error("Invalid duration type");
  }

  return result.toFixed(2);
};

// Controller to handle savings calculation
const handleSavingsCalculation = (req, res) => {
  try {
    const { targetAmount, duration, selectedDurationType } = req.body;

    if (!targetAmount || !duration || !selectedDurationType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const amountToSave = calculateSavings(
      targetAmount,
      duration,
      selectedDurationType
    );

    res.json({
      message: `You need to save ${amountToSave} per ${selectedDurationType}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Export the functions
module.exports = {
  createSavingsTarget,
  getUserSavings,
  handleSavingsCalculation, // Export the new function
};
