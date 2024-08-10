import React from 'react';
import { IoMoon } from 'react-icons/io5';
import { FaSun } from "react-icons/fa6";

export const Toggle = ({ handleChange, isChecked }) => {

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
        aria-label={isChecked ? "Switch to light mode" : "Switch to dark mode"}
      />
      <label htmlFor="check">
        <FaSun className="light-icon" />
        <IoMoon className="dark-icon" />
        <span className="sr-only">{isChecked ? "Switch to light mode" : "Switch to dark mode"}</span>
      </label>
    </div>
  );
};