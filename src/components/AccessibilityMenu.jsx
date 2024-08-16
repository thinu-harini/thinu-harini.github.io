import React, { useState } from 'react';
import { useAccessibility } from './AccessibilityContext';
import { IoAccessibility, IoMoon } from "react-icons/io5";
import { PiCursorFill } from "react-icons/pi";
import { FaBookReader } from 'react-icons/fa';
import { RiUserVoiceFill } from 'react-icons/ri';
import { TiMinus, TiPlus } from 'react-icons/ti'; import { FaMagnifyingGlassMinus, FaMagnifyingGlassPlus } from 'react-icons/fa6';
;

const AccessibilityMenu = ({ handleThemeChange, isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScreenReaderExpanded, setIsScreenReaderExpanded] = useState(false); // New state for managing expansion

  const {
    isDyslexiaFont,
    toggleDyslexiaFont,
    zoomIn,
    zoomOut,
    isBigCursor,
    toggleBigCursor,
    toggleReading,
    increaseSpeed,
    decreaseSpeed,
    isReading,
  } = useAccessibility();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isDyslexiaActive = isDyslexiaFont;
  const isZoomInActive = false; // Add logic to manage active state
  const isZoomOutActive = false; // Add logic to manage active state

  const isBigCursorActive = false; // Add logic to manage active state

  const handleScreenReaderToggle = () => {
    toggleReading();
    setIsScreenReaderExpanded(prev => !prev);
  };

  const handleSpeedChange = (e) => {
    e.stopPropagation(); // Prevent click event from affecting the read aloud button
  };


  return (
    <div id='accessibility-menu' className="accessibility-menu-container">
      <button
        className={`accessibility-menu-button ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Accessibility Options"
      >
        <IoAccessibility className="icon" />
      </button>
      {isMenuOpen && (
        <div className="accessibility-features">

          <button
            className={`accessibility-feature-button ${isDyslexiaActive ? 'active' : ''}`}
            onClick={toggleDyslexiaFont}
          >
            <FaBookReader />
            <span>Dyslexia Friendly</span>
            {/* {isDyslexiaFont ? 'Disable Dyslexia Font' : 'Enable Dyslexia Font'} */}
          </button>

          <button
            className={`accessibility-feature-button ${isBigCursorActive ? 'active' : ''}`}
            onClick={toggleBigCursor}
          >
            <PiCursorFill />
            <span>Big Cursor</span>
          </button>

          <button className="accessibility-feature-button"
            onClick={zoomIn}
          >
            <FaMagnifyingGlassPlus />
            <span>Zoom In</span>
          </button>

          <button
            className="accessibility-feature-button"
            onClick={zoomOut}
          >
            <FaMagnifyingGlassMinus />
            <span>Zoom Out</span>
          </button>

          <button
            className={`accessibility-feature-button ${isDark ? 'active' : ''}`}
            onClick={handleThemeChange}
          >
            <IoMoon />
            <span>Dark Mode</span>
          </button>


          <button
            className={`accessibility-feature-button ${isReading ? 'active' : ''}`}
            onClick={handleScreenReaderToggle}
          >
            <RiUserVoiceFill />
            <span>Screen Reader</span>
            {isReading && isScreenReaderExpanded && (
              <div className="screen-reader-options">
                <button
                  onClick={(e) => { increaseSpeed(); handleSpeedChange(e); }}
                  className="screen-reader-option">
                  <TiPlus />
                </button>
                Speed
                <button
                  onClick={(e) => { decreaseSpeed(); handleSpeedChange(e); }}
                  className="screen-reader-option">
                  <TiMinus />
                </button>
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;

