import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import CreateSavingsHomepage from "./pages/CreateSavingsHomepage";
import Footer from "./Components/Footer";
import CreateSavingsForSomethingElse from "./pages/CreateSavingsForSomethingElse";
import SavingsTargetCalculation from "./pages/SavingsTargetCalculation";
import SavingsTracker from "./pages/SavingsTracker";

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark:bg-black");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark:bg-black");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`max-w-[500px] px-[20px]  h-full w-full m-auto pb-10 `}>
      <div className="fixed top-0 z-50 right-0 p-2 mt-1 flex justify-center items-center"></div>
      <Router>
        <Navbar theme={theme} handleTheme={handleThemeSwitch} />
        <Routes>
          <Route path="/" element={<CreateSavingsHomepage />} />

          <Route
            path="/create-savings-target-for-something-else"
            element={<CreateSavingsForSomethingElse />}
          />
          <Route
            path="/savings-target-calculation"
            element={<SavingsTargetCalculation />}
          />
          <Route path="/savings-tracker" element={<SavingsTracker />} />
        </Routes>
        <Footer theme={theme} />
      </Router>
    </div>
  );
};

export default App;
