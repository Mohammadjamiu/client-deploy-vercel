import React from "react";
import AmigoLogoLight from "../assets/amigo_logo.png";
import AmigoLogoDark from "../assets/amigo-black.png";
import cartBlack from "../assets/cart-black.png";
import cartLight from "../assets/cart-white.png";

const Navbar = ({ theme, handleTheme }) => {
  return (
    <header className="h-14 w-full bg-white dark:bg-black sticky top-0 z-30 ">
      <div className="relative  flex justify-between items-center h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-start">
          {theme === "light" ? (
            <img
              onClick={handleTheme}
              src={AmigoLogoDark}
              alt="Logo"
              className="h-9 w-9 inline-block cursor-pointer"
            />
          ) : (
            <img
              onClick={handleTheme}
              src={AmigoLogoLight}
              alt="Logo"
              className="h-9 w-9 inline-block cursor-pointer"
            />
          )}
        </div>
        <div className="menu-cart">
          {theme === "light" ? (
            <img
              src={cartBlack}
              alt="Logo"
              className="h-7 w-7 inline-block cursor-pointer"
            />
          ) : (
            <img
              src={cartLight}
              alt="Logo"
              className="h-7 w-7 inline-block cursor-pointer"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
