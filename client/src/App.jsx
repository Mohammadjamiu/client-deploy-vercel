import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ToggleLeft, ToggleRight } from 'lucide-react'
import Navbar from './Components/Navbar';
import HomePage from './pages/HomePage';
import HouseSavings from './pages/HouseSavings';
import CarSavings from './pages/CarSavings';
import SaveForSomethingElse from './pages/SaveForSomethingElse';

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`max-w-[600px] px-[20px]  h-full w-full m-auto pb-10 dark:bg-black`}>
      <div className="fixed top-0 z-50 right-0 border-2 rounded-full p-2 mt-1 flex justify-center items-center bg-white dark:bg-amigo-black-200">
        <button onClick={handleThemeSwitch}>
          {theme === "dark" ? (
            <ToggleRight className="text-white" />
          ) : (
            <ToggleLeft />
          )}
        </button>
      </div>
     <Router>
      <Navbar />
      <Routes>
      <Route index element={<HomePage />} />
      <Route path="/save-for-car" element={<CarSavings />} />
      <Route path="/save-for-house" element={<HouseSavings />} />
      <Route path="/save-for-something-else" element={<SaveForSomethingElse />} />
          

      
      
      </Routes>
     </Router>
      
    </div>
  )
}

export default App;
