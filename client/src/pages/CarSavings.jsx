import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';

const CarSavings = () => {
  const [carType, setCarType] = useState('');
  const [price, setPrice] = useState('');
  const [months, setMonths] = useState('');
  const [monthlySavings, setMonthlySavings] = useState(null);
  const [showWeekly, setShowWeekly] = useState(false);
  const [amountToSave, setAmountToSave] = useState('');
  const [calculated, setCalculated] = useState(false);

  // Function to format number without commas
  const formatNumber = (value) => value.replace(/,/g, '');

  // Function to handle price input change
  const handlePriceChange = (event) => {
    setPrice(formatNumber(event.target.value));
  };

  // Function to calculate savings
  const calculateSavings = () => {
    if (price && months) {
      const numericPrice = parseFloat(price);
      const numericMonths = parseFloat(months);
      const monthly = (numericPrice / numericMonths).toFixed(2);
      const weekly = (numericPrice / numericMonths / 4).toFixed(2);
      setMonthlySavings({ monthly, weekly });
      setCalculated(true);
    }
  };

  // Function to handle weekly savings checkbox
  const handleShowWeeklyChange = () => {
    setShowWeekly(!showWeekly);
    if (!showWeekly) {
      setAmountToSave(monthlySavings.weekly);
    } else {
      setAmountToSave(monthlySavings.monthly);
    }
  };

  // Function to handle the start saving button
  const handleStartSaving = () => {
    alert(`You have chosen to save ${amountToSave}`);
    // Implement the saving logic here
  };

  // Reset calculation and savings when inputs change
  useEffect(() => {
    setCalculated(false);
    setMonthlySavings(null);
  }, [price, months, carType]);

  return (
    <div className="min-h-screen mt-8 w-full">
      <Link to='/'>
        <CircleArrowLeft className='mb-6 text-[#fd5900c2] rounded-lg h-[30px] w-[30px] font-light inline-block' />
      </Link>
      <div className="mb-4">
        <label className="block text-sm mb-2 text-amigo-black dark:text-[#ececec] text-[15px] font-light" htmlFor="carType">
          What type of car is it?
        </label>
        <input
          id="carType"
          type="text"
          className="w-full px-4 py-2 border placeholder-gray-500 font-light text-sm dark:placeholder-gray-400 border-amigo-primary-200 bg-transparent rounded-lg dark:text-white"
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
          placeholder='Sedan'
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2 text-amigo-black dark:text-[#ececec] text-[15px] font-light" htmlFor="price">
          What's the price?
        </label>
        <input
          id="price"
          type="text"
          className="w-full px-4 py-2 border placeholder-gray-500 font-light text-sm dark:placeholder-gray-400 border-amigo-primary-200 bg-transparent rounded-lg dark:text-white"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter price without commas"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2 text-amigo-black dark:text-[#ececec] text-[15px] font-light" htmlFor="months">
          How many months do you want to save for?
        </label>
        <input
          id="months"
          type="number"
          className="w-full px-4 py-2 border placeholder-gray-500 font-light text-sm dark:placeholder-gray-400 border-amigo-primary-200 bg-transparent rounded-lg dark:text-white"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          placeholder='12'
        />
      </div>
      {!calculated && (
        <button
          className="w-full py-2 mt-2 bg-amigo-primary-200 text-white rounded-lg hover:bg-amigo-primary-100 transition duration-300 text-center"
          onClick={calculateSavings}
        >
          Next
        </button>
      )}
      {monthlySavings && (
        <div className="mt-4 p-3">
          <p className="text-lg font-medium mb-2 text-amigo-black dark:text-[#ececec]">
            For the {carType.toLocaleLowerCase()} that costs ₦{price}, you need to save:
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {showWeekly ? `₦${monthlySavings.weekly} per week.` : `₦${monthlySavings.monthly} per month.`}
          </p>
          <div className="flex items-center mt-2">
            <input
              id="showWeekly"
              type="checkbox"
              className="mr-2 text-sm accent-amigo-primary-200 focus:accent-amigo-primary-200"
              checked={showWeekly}
              onChange={handleShowWeeklyChange}
            />
            <label htmlFor="showWeekly" className="text-gray-400">
              Show weekly savings
            </label>
          </div>
          <button
            className="mt-4 w-full py-2 bg-amigo-primary-200 text-white rounded-md hover:bg-amigo-primary-100 transition duration-300"
            onClick={handleStartSaving}
          >
            Start Saving
          </button>
        </div>
      )}
    </div>
  );
};

export default CarSavings;



