import React from "react";
import homeIcon from "../assets/home-icon.png";
import messageIcon from "../assets/message-icon.png";
import profileIcon from "../assets/profile-icon.png";
import homeIconLight from "../assets/home-icon-light.png";
import messageIconLight from "../assets/message-icon-light.png";
import profileIconLight from "../assets/profile-icon-light.png";

const Footer = ({ theme }) => {
  return (
    <footer className="fixed bottom-0 max-w-[500px] ml-[-20px] px-[30px] flex justify-between items-center h-[56px] w-full m-auto bg-[#fff] dark:bg-black ">
      <div className="w-full h-full flex items-center justify-between">
        {theme === "light" ? (
          <>
            <img
              src={homeIcon}
              alt="home icon"
              className="h-6 w-6 inline-block cursor-pointer"
            />
            <img
              src={messageIcon}
              alt="home icon"
              className="h-6 w-6 inline-block cursor-pointer"
            />
            <img
              src={profileIcon}
              alt="home icon"
              className="h-6 w-6 inline-block cursor-pointer"
            />
          </>
        ) : (
          <>
            <img
              src={homeIconLight}
              alt="home icon"
              className="h-6 w-6 inline-block cursor-pointer"
            />
            <img
              src={messageIconLight}
              alt="home icon"
              className="h-6 w-6 inline-block cursor-pointer"
            />
            <img
              src={profileIconLight}
              alt="home icon"
              className="h-6 w-6 inline-block cursor-pointer"
            />
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
