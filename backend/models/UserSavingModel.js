// const mongoose = require("mongoose");

// const UserSavingSchema = new mongoose.Schema({
//   userId: {
//     // type: mongoose.Schema.Types.ObjectId,
//     type: String,
//     // ref: "User", // Assumes you have a User model to reference
//     required: true,
//   },
//   targetName: {
//     type: String,
//     required: true, // e.g., "Car"
//   },
//   targetAmount: {
//     type: Number,
//     required: true, // e.g., 50000
//   },
//   currentAmount: {
//     type: Number,
//     default: 0, // Amount saved so far
//   },
//   targetDate: {
//     type: Date,
//     required: true, // End date when savings goal should be achieved
//   },
//   frequency: {
//     type: String,
//     enum: ["daily", "weekly", "monthly"], // Saving frequency options
//     required: true,
//   },
//   nextSavingDate: {
//     type: Date, // When the next saving will occur
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now, // Date when savings goal was created
//   },
// });

// // This method could be used later to check if savings have reached the target or the end date has passed.
// UserSavingSchema.methods.hasReachedTarget = function () {
//   return (
//     this.currentAmount >= this.targetAmount ||
//     new Date() >= new Date(this.targetDate)
//   );
// };

// const UserSaving = mongoose.model("UserSaving", UserSavingSchema);

// module.exports = UserSaving;

const mongoose = require("mongoose");

const UserSavingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  targetName: {
    type: String,
    required: true, // e.g., "Car"
  },
  targetAmount: {
    type: Number,
    required: true, // e.g., 50000
  },
  currentAmount: {
    type: Number,
    default: 0, // Amount saved so far
  },
  targetDate: {
    type: Date,
    required: true, // End date when savings goal should be achieved
  },
  frequency: {
    type: String,
    enum: ["minute", "daily", "weekly", "monthly"], // Saving frequency options
    required: true,
  },
  nextSavingDate: {
    type: Date, // When the next saving will occur
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Date when savings goal was created
  },
});

// Validate if the targetDate matches the selected frequency (e.g., daily, weekly, monthly)
// UserSavingSchema.pre("save", function (next) {
//   const goal = this;
//   const startDate = new Date(goal.createdAt);
//   const endDate = new Date(goal.targetDate);

//   // Calculate total remaining days from start date to target date
//   const totalRemainingDays = Math.ceil(
//     (endDate - startDate) / (1000 * 60 * 60 * 24)
//   );

//   // Define the number of days per period based on frequency
//   const periodDaysMap = {
//     daily: 1,
//     weekly: 7,
//     monthly: 30,
//   };

//   const daysPerPeriod = periodDaysMap[goal.frequency];

//   // If the remaining days are not an exact multiple of the selected period, reject the save
//   if (totalRemainingDays % daysPerPeriod !== 0) {
//     const error = new Error(
//       `The number of remaining days (${totalRemainingDays}) does not match the selected frequency (${goal.frequency}). Please select a valid target date that aligns with the frequency.`
//     );
//     return next(error); // Prevent saving and return the error
//   }

//   next(); // If validation passes, proceed with saving
// });

// Method to check if savings have reached the target or the end date has passed
UserSavingSchema.methods.hasReachedTarget = function () {
  return (
    this.currentAmount >= this.targetAmount ||
    new Date() >= new Date(this.targetDate)
  );
};

const UserSaving = mongoose.model("UserSaving", UserSavingSchema);

module.exports = UserSaving;
