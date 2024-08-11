import React from 'react';
import { IoMoon } from 'react-icons/io5';
import { FaSun } from "react-icons/fa6";

const ThemeSwitcher = ({ isDark, handleThemeChange }) => {
  return (
    <button
      className="theme-switch"
      onClick={handleThemeChange}
      aria-label="Toggle dark mode"
    // aria-label={isChecked ? "Switch to light mode" : "Switch to dark mode"}
    >
      <FaSun className={`icon ${isDark ? 'hidden' : ''}`} />
      <IoMoon className={`icon ${isDark ? '' : 'hidden'}`} />
      {/* <span className="sr-only">{isChecked ? "Switch to light mode" : "Switch to dark mode"}</span> */}
    </button>
  );
};

export default ThemeSwitcher;
