import React, { useEffect, useRef, useState } from 'react';
import { useAccessibility } from './AccessibilityContext';
import { IoAccessibility, IoClose, IoMoon } from "react-icons/io5";
import { PiCursorFill } from "react-icons/pi";
import { FaBookReader, FaHighlighter, FaLink, FaPause, FaPlay } from 'react-icons/fa';
import { RiUserVoiceFill } from 'react-icons/ri';
import { styles } from '../styles';
import { MdInvertColors, MdOutlineInvertColors } from 'react-icons/md';

const AccessibilityMenu = ({ handleThemeChange, isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const {
    isDyslexiaFont,
    toggleDyslexiaFont,
    isBigCursor,
    toggleBigCursor,
    isReading,
    toggleReading,
    rate,
    adjustRate,
    isPaused,
    togglePauseResume,
    getVoices,
    setVoice,
    highlightEnabled,
    toggleHighlight,
    setIsScreenReaderExpanded,
    isDesaturated,
    toggleDesaturation,
    highlightLinks,
    toggleHighlightLinks,
  } = useAccessibility();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isDyslexiaActive = isDyslexiaFont;
  const isBigCursorActive = isBigCursor;
  const isDesaturatedActive = isDesaturated;

  const handleScreenReaderToggle = () => {
    toggleReading();
    setIsScreenReaderExpanded(prev => !prev);
  };

  const handleRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    adjustRate(newRate);
  };

  const handleHighlightToggle = (e) => {
    e.stopPropagation();
    toggleHighlight();
  };

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = getVoices();
      console.log('Available Voices:', availableVoices);
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]); // Set default voice
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, [getVoices]);

  const handleVoiceChange = (event) => {
    const selectedVoiceName = event.target.value;
    const voice = voices.find(v => v.name === selectedVoiceName);
    if (voice) {
      setVoice(voice); // Set the new voice and handle cancellation of current speech
    }
  };

  const handleHighlightLinksToggle = (e) => {
    e.stopPropagation();
    toggleHighlightLinks(); // Toggle link highlighting
  };

  useEffect(() => {
    // Debugging: Print the currently selected voice
    console.log('Selected Voice:', selectedVoice);
  }, [selectedVoice]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div id='accessibility-menu' ref={menuRef}>
      <button
        className={`accessibility-menu-button ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Accessibility Options"
      >
        {isMenuOpen ? (
          <IoClose className="icon" />
        ) : (
          <IoAccessibility className="icon" />
        )}
      </button>

      {isMenuOpen && (
        <div className="accessibility-features-groups">
          <div className="accessibility-features">
            <button
              className={`accessibility-feature-button ${isDyslexiaActive ? 'active' : ''}`}
              onClick={toggleDyslexiaFont}
            >
              <FaBookReader />
              <div className={styles.buttonText}>Dyslexia Friendly</div>
            </button>

            <button
              className={`accessibility-feature-button ${isBigCursorActive ? 'active' : ''}`}
              onClick={toggleBigCursor}
            >
              <PiCursorFill />
              <div className={styles.buttonText}>Big Cursor</div>
            </button>

            <button
              className={`accessibility-feature-button ${highlightLinks ? 'active' : ''}`} // New button
              onClick={handleHighlightLinksToggle}
            >
              <FaLink />
              <div className={styles.buttonText}>Highlight Links</div>
            </button>

            <button
              className={`accessibility-feature-button ${isDesaturatedActive ? 'active' : ''}`}
              onClick={toggleDesaturation}
            >
              <MdOutlineInvertColors />
              <div className={styles.buttonText}>Desaturation</div>
            </button>

            <button
              className={`accessibility-feature-button ${isDark ? 'active' : ''}`}
              onClick={handleThemeChange}
            >
              <IoMoon />
              <div className={styles.buttonText}>Dark Mode</div>
            </button>
          </div>

          <div className="screen-reader-section">

            <button
              className={`screen-reader-button ${isReading ? 'active' : ''}`}
              onClick={handleScreenReaderToggle}
            >
              <RiUserVoiceFill />
              <div className={styles.buttonText}>Screen Reader</div>
            </button>

            {isReading && (
              <div className='flex flex-col gap-4'>
                <div className="screen-reader-options">
                  <button
                    onClick={togglePauseResume}
                    className={`screen-reader-option ${isPaused ? 'resume' : 'pause'}`}
                  >
                    {isPaused ? (
                      <FaPlay />
                    ) : (
                      <FaPause />
                    )}
                  </button>

                  <div className='flex flex-col items-center'>
                    <label htmlFor="rate-slider" className={styles.buttonText}>Playback Rate: {rate.toFixed(1)}</label>
                    <input
                      type="range"
                      id="rate-slider"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={rate}
                      onChange={handleRateChange}
                      className="rate-slider"
                    />
                  </div>

                  <button
                    onClick={handleHighlightToggle}
                    className={`screen-reader-option ${highlightEnabled ? 'active' : ''}`}
                  >
                    <FaHighlighter />
                  </button>
                </div>

                <select
                  className={`${styles.buttonText} custom-select`}
                  onChange={handleVoiceChange}
                  value={selectedVoice ? selectedVoice.name : ''}>
                  {voices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;
