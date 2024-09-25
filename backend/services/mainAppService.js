const axios = require("axios");
require("dotenv").config();

const BASE_URL = "https://amigoserver-10d8bdb5ac5a.herokuapp.com/api/apps";
const API_KEY = process.env.API_KEY; // Ensure API_KEY is correctly set in .env

// Function to get user data by userId
const getUserData = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error(
      "Error fetching user data:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      `Error fetching user data: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

// Export the function
module.exports = {
  getUserData,
};
