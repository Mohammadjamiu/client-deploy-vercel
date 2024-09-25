// utils.js
function calculateNextDate(frequency) {
  const today = new Date();
  if (frequency === "daily") {
    return new Date(today.setDate(today.getDate() + 1));
  } else if (frequency === "weekly") {
    return new Date(today.setDate(today.getDate() + 7));
  } else if (frequency === "monthly") {
    return new Date(today.setMonth(today.getMonth() + 1));
  }
}

module.exports = calculateNextDate;
