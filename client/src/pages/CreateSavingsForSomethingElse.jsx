import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faHouse,
  faPhone,
  faBirthdayCake,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

const CreateSavingsForSomethingElse = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select an option");
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleNextClick = () => {
    navigate("/savings-target-calculation", { state: { selectedItem } }); // Pass selected item to the next page
  };

  const items = [
    { label: "Car", icon: faCar },
    { label: "House", icon: faHouse },
    { label: "Phone", icon: faPhone },
    { label: "Birthday", icon: faBirthdayCake },
    { label: "Other", icon: faEllipsisH },
  ];

  return (
    <>
      <div className="mt-5 mb-8">
        <h1 className="text-[19px] text-textDark dark:text-[#fff] font-bold">
          Create a savings target.
        </h1>
        <h2 className="text-[15px] text-secondarySubtitleLight">
          What's the dream you hope to achieve?
        </h2>
      </div>
      <div className="savings_target_cards mt-5"></div>
      <div className="relative inline-block w-full">
        {/* Input field with dropdown */}
        <div className="relative">
          <input
            type="text"
            value={selectedItem}
            placeholder="Select an option"
            onClick={toggleDropdown}
            readOnly
            className="w-full h-[50px] py-2 pl-4 pr-10 text-sm bg-cardColorLight dark:bg-accentIconDark text-secondarySubtitleLight rounded-lg cursor-pointer focus:outline-none"
          />
          {/* Arrow icon */}
          <div className="w-12 flex bg-[#F0F0F1] dark:bg-cardColorDark rounded-r-lg absolute inset-y-0 right-0 justify-center items-center px-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-secondarySubtitleLight"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Dropdown list */}
        {isOpen && (
          <ul
            className={`absolute w-full right-0 mt-2 bg-cardColorLight dark:bg-accentIconDark rounded-lg shadow-sm max-h-60 overflow-auto z-10`}
          >
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item.label)}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-cardColorDark"
              >
                <div className="flex justify-center items-start">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="mr-3 text-primaryAmigo mt-2 opacity-[0.8]"
                  />
                  <span className="text-[15px] mt-[5px] text-secondarySubtitleLight">
                    {item.label}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleNextClick}
          className="absolute right-0 mt-[14px] bg-primaryAmigo text-[#fff] text-[14px] px-6 py-2 rounded font-light"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CreateSavingsForSomethingElse;
