import React from 'react';
import { IoMoon } from 'react-icons/io5';
import { FaSun } from "react-icons/fa6";

const ThemeSwitcher = ({ isDark, handleThemeChange }) => {
  return (
    <button
      className="theme-switch"
      onClick={handleThemeChange}
      aria-label="Toggle dark mode"
    >
      <IoMoon className={`icon ${isDark ? 'hidden' : ''}`} />
      <FaSun className={`icon ${isDark ? '' : 'hidden'}`} />
    </button>
  );
};

export default ThemeSwitcher;
