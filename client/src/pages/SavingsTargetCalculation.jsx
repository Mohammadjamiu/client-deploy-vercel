import React, { useState, useEffect } from "react";
import { differenceInDays } from "date-fns";
import Axios from "axios"; // Import axios
import { useLocation, useNavigate } from "react-router-dom";

const SavingsTargetCalculation = () => {
  const [savingsTargetName, setSavingsTargetName] = useState("");
  const [savingsTargetAmount, setSavingsTargetAmount] = useState("");
  const [convertAmountToNum, setConvertAmountToNum] = useState(0);
  const [totalDaysFromPicker, setTotalDaysFromPicker] = useState(0);
  const [dateFromPicker, setDateFromPicker] = useState(0);
  const [
    resultFromSelectedButtonDuration,
    setResultFromSelectedButtonDuration,
  ] = useState(0);
  const [calcBtnActive, setCalcBtnActive] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const { selectedItem } = location.state || {};
    if (selectedItem) {
      setSavingsTargetName(selectedItem);
    }
  }, [location.state]);

  useEffect(() => {
    if (resultFromSelectedButtonDuration > 0 && totalDaysFromPicker > 0) {
      calculateSavings();
    }
  }, [resultFromSelectedButtonDuration, totalDaysFromPicker]);

  const handleStartSavingClick = () => {
    // Data to send
    // const data = {
    //   savingsTargetName,
    //   savingsTargetAmount: convertAmountToNum,
    //   savingsDuration: resultFromSelectedButtonDuration,
    //   totalDays: totalDaysFromPicker,
    // };
    // Send data to server using Axios
    //   Axios.post("http://localhost:4500/api/savings", {
    //     savingsTargetName,
    //     savingsTargetAmount: convertAmountToNum,
    //     savingsDuration: resultFromSelectedButtonDuration,
    //     totalDays: totalDaysFromPicker,
    //   })
    //     .then((response) => {
    //       // Redirect to the tracker page after successful data submission
    //       // navigate("/savings-tracker");
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.error("There was an error sending the data!", error);
    //     });
    // };

    Axios.post("http://localhost:4500/api/savings", {
      targetName: savingsTargetName, // Changed to targetName
      targetAmount: convertAmountToNum, // Changed to targetAmount
      targetDate: dateFromPicker, // Changed to targetDate
      frequency: setFrequency(resultFromSelectedButtonDuration), // Changed to frequency
    })
      .then((response) => {
        // Redirect to the tracker page after successful data submission
        navigate("/savings-tracker");
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
        console.log("Target Date:", resultFromSelectedButtonDuration);
        console.log(
          "Target Date:",
          setFrequency(resultFromSelectedButtonDuration)
        );
      });
  };

  const setFrequency = (resultFromSelectedButtonDuration) => {
    if (resultFromSelectedButtonDuration === 1) {
      return "daily";
    } else if (resultFromSelectedButtonDuration === 7) {
      return "weekly";
    } else if (resultFromSelectedButtonDuration === 30) {
      return "monthly";
    }
  };

  const calculateSavings = () => {
    const targetAmountToBeSaved = convertAmountToNum;

    if (resultFromSelectedButtonDuration === 30 && totalDaysFromPicker < 30) {
      setMessage(
        "Please select a duration other than monthly or pick a date greater than or equal to 30 days"
      );
      setMessageType("error");
      return;
    }

    let savingsPerPeriod;
    let messageText = "";

    if (resultFromSelectedButtonDuration === 1) {
      savingsPerPeriod = targetAmountToBeSaved / totalDaysFromPicker;
      const formattedSavings = formatAmountWithCommas(
        savingsPerPeriod.toFixed(2)
      );
      messageText = `You need to save ₦${formattedSavings} per day.`;
      setMessageType("info");
    } else if (resultFromSelectedButtonDuration === 7) {
      savingsPerPeriod = targetAmountToBeSaved / (totalDaysFromPicker / 7);
      const formattedSavings = formatAmountWithCommas(
        savingsPerPeriod.toFixed(2)
      );
      messageText = `You need to save ₦${formattedSavings} per week.`;
      setMessageType("info");
    } else if (resultFromSelectedButtonDuration === 30) {
      const totalMonths = Math.floor(totalDaysFromPicker / 30);
      const extraDays = totalDaysFromPicker % 30;

      if (totalMonths > 0) {
        const savingsPerMonth =
          targetAmountToBeSaved / (totalMonths + extraDays / 30);
        const formattedSavings = formatAmountWithCommas(
          savingsPerMonth.toFixed(2)
        );
        messageText += `You need to save ₦${formattedSavings} per month. `;
      }

      if (extraDays > 0) {
        const savingsForExtraDays =
          (targetAmountToBeSaved / totalDaysFromPicker) * extraDays;
        const formattedSavings = formatAmountWithCommas(
          savingsForExtraDays.toFixed(2)
        );
        messageText += `For the remaining ${extraDays} day(s), you need to save ₦${formatAmountWithCommas(
          (savingsForExtraDays / extraDays).toFixed(2)
        )} each day, totaling ₦${formattedSavings} for the extra days.`;
      }
      setMessageType("info");
    }

    setMessage(messageText);
  };

  const calculateDaysFromDatePicker = (dateSelectedFromPicker) => {
    const currentDate = new Date();
    const endDate = new Date(dateSelectedFromPicker);

    currentDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    let totalDays = differenceInDays(endDate, currentDate);
    if (totalDays >= 0) {
      totalDays += 1; // Include the current day
    }
    setTotalDaysFromPicker(totalDays);
  };

  const pickDateActive = (e) => {
    const selectedDate = e.target.value;
    calculateDaysFromDatePicker(selectedDate);
    setDateFromPicker(selectedDate);
  };

  const handleSavingsTargetAmount = (e) => {
    const value = e.target.value;
    setConvertAmountToNum(Number(value.replace(/[^0-9.-]+/g, "")));
    setSavingsTargetAmount(formatAmountWithCommas(value));
  };

  const formatAmountWithCommas = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    if (numericValue === "") return "";
    const [integerPart, decimalPart] = numericValue.split(".");
    const formattedInteger = new Intl.NumberFormat().format(
      parseInt(integerPart, 10)
    );
    return decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  const handleSavingsTargetName = (e) => {
    setSavingsTargetName(
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    );
  };

  return (
    <div className="mt-8 relative pb-8">
      {/* Savings Target Name Input */}
      <label
        htmlFor="target_savings_name"
        className="text-[12px] font-normal tracking-wide pl-1 mb-1 mt-3 block text-secondarySubtitleLight dark:text-secondarySubtitleLight"
      >
        Target Savings Name:
      </label>
      <input
        type="text"
        id="name"
        onChange={handleSavingsTargetName}
        value={savingsTargetName}
        placeholder="iPhone 13"
        className="w-full h-[50px] mb-2 py-2 pl-4 pr-10 text-sm bg-cardColorLight dark:bg-accentIconDark text-[#424242] dark:text-[#8f8f8f] placeholder:text-[#525252] rounded-lg focus:outline-none"
      />
      {/* Savings Target Amount Input */}
      <label
        htmlFor="amount"
        className="text-[12px] font-normal tracking-wide pl-1 mb-1 mt-3 block text-secondarySubtitleLight dark:text-secondarySubtitleLight"
      >
        Target Amount:
      </label>
      <input
        type="text"
        id="amount"
        placeholder="₦ 0.00"
        value={savingsTargetAmount ? `₦ ${savingsTargetAmount}` : ""}
        onChange={handleSavingsTargetAmount}
        className="w-full h-[50px] mb-2 py-2 pl-4 pr-10 text-sm bg-cardColorLight dark:bg-accentIconDark dark:text-[#8f8f8f] text-[#424242] placeholder:text-[#525252] rounded-lg focus:outline-none"
      />
      {/* Date Picker */}
      <label
        htmlFor="pick_a_date_for_savings"
        className="text-[12px] font-normal tracking-wide pl-1 mb-1 mt-3 block text-secondarySubtitleLight dark:text-secondarySubtitleLight"
      >
        Pick a date:
      </label>
      <input
        onChange={pickDateActive}
        type="date"
        className="w-full h-[50px] mb-2 py-2 pl-4 pr-10 text-sm bg-cardColorLight dark:bg-accentIconDark text-[#424242] dark:text-[#8f8f8f] placeholder:text-[#525252] rounded-lg focus:outline-none"
      />
      {/* Duration Selection */}
      <label
        htmlFor="savings_duration"
        className="text-[12px] font-normal tracking-wide pl-1 mb-1 mt-3 block text-secondarySubtitleLight dark:text-secondarySubtitleLight"
      >
        Select savings duration:
      </label>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => {
            setResultFromSelectedButtonDuration(1);
            setCalcBtnActive(true);
          }}
          className={`${
            resultFromSelectedButtonDuration === 1
              ? "border-primaryAmigo border text-primaryAmigo dark:border-primaryAmigo dark:border dark:text-primaryAmigo"
              : "dark:text-[#808080]"
          } transition duration-100 ease-in flex justify-center items-center w-full h-[48px] mb-2 py-2 text-sm bg-cardColorLight dark:bg-accentIconDark rounded-lg border focus:outline-none`}
        >
          Daily
        </button>
        <button
          onClick={() => {
            setResultFromSelectedButtonDuration(7);
            setCalcBtnActive(true);
          }}
          className={`${
            resultFromSelectedButtonDuration === 7
              ? "border-primaryAmigo border text-primaryAmigo dark:border-primaryAmigo dark:border dark:text-primaryAmigo"
              : "dark:text-[#808080]"
          } transition duration-100 ease-in flex justify-center items-center w-full h-[48px] mb-2 py-2 text-sm bg-cardColorLight dark:bg-accentIconDark rounded-lg border focus:outline-none`}
        >
          Weekly
        </button>
        <button
          onClick={() => {
            setResultFromSelectedButtonDuration(30);
            setCalcBtnActive(true);
          }}
          className={`${
            resultFromSelectedButtonDuration === 30
              ? "border-primaryAmigo border text-primaryAmigo dark:border-primaryAmigo dark:border dark:text-primaryAmigo"
              : "dark:text-[#808080]"
          } transition duration-100 ease-in flex justify-center items-center w-full h-[48px] mb-2 py-2 text-sm bg-cardColorLight dark:bg-accentIconDark rounded-lg border focus:outline-none`}
        >
          Monthly
        </button>
      </div>
      {/* Result Message */}
      {message && (
        <p
          className={`text-[12px] font-normal tracking-wide pl-1 mt-2 ${
            messageType === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
      {/* Start Saving Button */}
      <button
        disabled={!calcBtnActive}
        onClick={handleStartSavingClick}
        className="mt-4 w-full h-[48px] py-2 text-sm text-white bg-primaryAmigo rounded-lg focus:outline-none"
      >
        Start Saving
      </button>
    </div>
  );
};

export default SavingsTargetCalculation;
