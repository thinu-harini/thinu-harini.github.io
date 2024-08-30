import React from 'react';
import { IoMoon } from 'react-icons/io5';
import { FaSun } from "react-icons/fa6";

const ThemeSwitcher = ({ isDark, handleThemeChange }) => {
  return (
    <button
      className="floating-button"
      onClick={handleThemeChange}
      aria-label="Toggle dark mode"
    >
      <IoMoon className={`icon ${isDark ? 'hidden' : ''}`} size={26} />
      <FaSun className={`icon ${isDark ? '' : 'hidden'}`} size={26} />
    </button>
  );
};

export default ThemeSwitcher;
