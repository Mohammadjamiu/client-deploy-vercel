const cron = require("node-cron");
const UserSaving = require("../models/UserSavingModel");

// Schedule the cron job to run periodically (every 10 seconds for testing)
cron.schedule("*/10 * * * * *", async () => {
  console.log("Running cron job...");

  try {
    const now = new Date();

    // Fetch all savings goals that need to be updated
    const savingsGoals = await UserSaving.find({
      nextSavingDate: { $lte: now },
      targetDate: { $gte: now }, // Ensure the target date hasn't passed
    }).sort({ createdAt: -1 });

    if (savingsGoals.length === 0) {
      console.log("No savings goals to update.");
      return;
    }
    console.log(`${savingsGoals}`);

    // Iterate through each savings goal and update it
    for (const goal of savingsGoals) {
      //   console.log(`${goal}`);

      //   if (goal.hasReachedTarget()) {
      //     console.log(`Goal "${goal.targetName}" has already been achieved.`);
      //     continue;
      //   }

      // Use handleDebiting to process the debit for each goal
      await handleDebiting(goal);
    }
  } catch (error) {
    console.error("Error in cron job:", error.message);
  }
});

// Function to handle debiting logic for weekly, daily, monthly, and minute payments
async function handleDebiting(goal) {
  const now = new Date();

  // Check if it's time for the next debit
  if (now >= goal.nextSavingDate) {
    if (goal.frequency === "weekly") {
      const savingsPlan = calculateProportionalWeeklySavings(goal);
      const { weeklySavingAmount, lastPayment, remainingDays } = savingsPlan;

      if (remainingDays > 0 && now >= goal.targetDate) {
        goal.currentAmount += lastPayment;
        console.log(
          `Debited ₦${lastPayment.toFixed(
            2
          )} for the final ${remainingDays} days.`
        );
      } else {
        goal.currentAmount += weeklySavingAmount;
        console.log(
          `Debited ₦${weeklySavingAmount.toFixed(2)} for a full week.`
        );
      }
    } else if (goal.frequency === "daily") {
      const savingsPlan = calculateProportionalDailySavings(goal);
      const { dailySavingAmount, lastPayment, remainingDays } = savingsPlan;

      if (remainingDays > 0 && now >= goal.targetDate) {
        goal.currentAmount += lastPayment;
        console.log(
          `Debited ₦${lastPayment.toFixed(
            2
          )} for the final ${remainingDays} days.`
        );
      } else {
        goal.currentAmount += dailySavingAmount;
        console.log(`Debited ₦${dailySavingAmount.toFixed(2)} for a full day.`);
      }
    } else if (goal.frequency === "monthly") {
      const savingsPlan = calculateProportionalMonthlySavings(goal);
      const { monthlySavingAmount, lastPayment, remainingMonths } = savingsPlan;

      if (remainingMonths > 0 && now >= goal.targetDate) {
        goal.currentAmount += lastPayment;
        console.log(
          `Debited ₦${lastPayment.toFixed(
            2
          )} for the final ${remainingMonths} months.`
        );
      } else {
        goal.currentAmount += monthlySavingAmount;
        console.log(
          `Debited ₦${monthlySavingAmount.toFixed(2)} for a full month.`
        );
      }
    } else if (goal.frequency === "minute") {
      const savingsPlan = calculateProportionalMinuteSavings(goal);
      const { minuteSavingAmount, lastPayment, remainingMinutes } = savingsPlan;

      if (remainingMinutes > 0 && now >= goal.targetDate) {
        goal.currentAmount += lastPayment;
        console.log(
          `Debited ₦${lastPayment.toFixed(
            2
          )} for the final ${remainingMinutes} minutes.`
        );
      } else {
        goal.currentAmount += minuteSavingAmount;
        console.log(
          `Debited ₦${minuteSavingAmount.toFixed(2)} for a full minute.`
        );
      }
    }

    // Update the next saving date for the next period (minute/weekly/daily/monthly)
    goal.nextSavingDate = calculateNextSavingDate(goal.frequency);

    // Save the updated goal to the database
    await goal.save();
  }
}

// Calculate the next saving date based on frequency (for minute/weekly/daily/monthly)
function calculateNextSavingDate(frequency) {
  const today = new Date();
  if (frequency === "weekly") {
    return new Date(today.setDate(today.getDate() + 7));
  } else if (frequency === "daily") {
    return new Date(today.setDate(today.getDate() + 1));
  } else if (frequency === "monthly") {
    return new Date(today.setMonth(today.getMonth() + 1));
  } else if (frequency === "minute") {
    return new Date(today.setMinutes(today.getMinutes() + 1));
  }
  // Handle other frequencies as needed
}

// Sample function for calculating minute savings amounts
function calculateProportionalMinuteSavings(goal) {
  const { targetAmount, currentAmount, targetDate } = goal;
  const remainingAmount = targetAmount - currentAmount;
  const now = new Date();

  // Total remaining minutes till target date
  const remainingMinutes = Math.ceil(
    (new Date(targetDate) - now) / (1000 * 60)
  );

  const minuteSavingAmount =
    remainingMinutes > 0 ? remainingAmount / remainingMinutes : 0;
  const lastPayment = remainingMinutes === 0 ? remainingAmount : 0;

  return {
    minuteSavingAmount,
    lastPayment,
    remainingMinutes,
  };
}

// Sample function for calculating daily savings amounts
function calculateProportionalDailySavings(goal) {
  const { targetAmount, currentAmount, targetDate } = goal;
  const remainingAmount = targetAmount - currentAmount;
  const now = new Date();

  // Total remaining days till target date
  const remainingDays = Math.ceil(
    (new Date(targetDate) - now) / (1000 * 60 * 60 * 24)
  );

  const dailySavingAmount =
    remainingDays > 0 ? remainingAmount / remainingDays : 0;
  const lastPayment = remainingDays === 0 ? remainingAmount : 0;

  return {
    dailySavingAmount,
    lastPayment,
    remainingDays,
  };
}

// Sample function for calculating weekly savings amounts
function calculateProportionalWeeklySavings(goal) {
  const { targetAmount, currentAmount, targetDate } = goal;
  const remainingAmount = targetAmount - currentAmount;
  const now = new Date();

  // Total remaining days till target date
  const remainingDays = Math.ceil(
    (new Date(targetDate) - now) / (1000 * 60 * 60 * 24)
  );
  const weeksRemaining = Math.floor(remainingDays / 7);

  const weeklySavingAmount =
    weeksRemaining > 0 ? remainingAmount / weeksRemaining : 0;
  const lastPayment = weeksRemaining === 0 ? remainingAmount : 0;

  return {
    weeklySavingAmount,
    lastPayment,
    remainingDays,
  };
}

// Sample function for calculating monthly savings amounts
function calculateProportionalMonthlySavings(goal) {
  const { targetAmount, currentAmount, targetDate } = goal;
  const remainingAmount = targetAmount - currentAmount;
  const now = new Date();

  // Total remaining months till target date
  const remainingMonths = Math.ceil(
    (new Date(targetDate) - now) / (1000 * 60 * 60 * 24 * 30)
  );

  const monthlySavingAmount =
    remainingMonths > 0 ? remainingAmount / remainingMonths : 0;
  const lastPayment = remainingMonths === 0 ? remainingAmount : 0;

  return {
    monthlySavingAmount,
    lastPayment,
    remainingMonths,
  };
}

function calculateNextMinute() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 1); // Set to 1 minute in the future
  return now;
}
