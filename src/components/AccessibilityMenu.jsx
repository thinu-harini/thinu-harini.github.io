import React, { useEffect, useRef, useState } from 'react';
import { useAccessibility } from './AccessibilityContext';
import { IoAccessibility, IoClose, IoMoon } from "react-icons/io5";
import { PiCursorFill } from "react-icons/pi";
import { FaAdjust, FaBookReader, FaHighlighter, FaICursor, FaLink, FaPause, FaPlay } from 'react-icons/fa';
import { RiUserVoiceFill } from 'react-icons/ri';
import { styles } from '../styles';
import { MdImageNotSupported, MdInsertPageBreak, MdOutlineInvertColors } from 'react-icons/md';

const AccessibilityMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContrastExpanded, setIsContrastExpanded] = useState(false);
  const menuRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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
    highlightLinks,
    toggleHighlightLinks,
    isDark,
    toggleDarkMode,
    isDesaturated,
    toggleDesaturation,
    contrastTheme,
    toggleContrastTheme,
    resetContrastTheme,
    areImagesHidden,
    toggleHideImages,
    isReadingGuideEnabled,
    toggleReadingGuide,
    isReadingMaskEnabled,
    toggleReadingMask,
    maskDimensions,
  } = useAccessibility();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleContrast = () => setIsContrastExpanded(!isContrastExpanded);

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

  const handleDarkModeToggle = (e) => {
    e.stopPropagation();
    toggleDarkMode();
  };

  const handleContrastToggle = (theme) => {
    toggleContrastTheme(theme);
  };

  const handleResetContrast = () => {
    resetContrastTheme();
  };

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = getVoices();
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
    toggleHighlightLinks();
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isReadingMaskEnabled) {
        setCursorPosition({ x: event.clientX, y: event.clientY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isReadingMaskEnabled]);

  // minimize menu on clicking outside
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
          <div className={styles.heroContent}>Content Adjustments</div>
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
              className={`accessibility-feature-button ${highlightLinks ? 'active' : ''}`}
              onClick={handleHighlightLinksToggle}
            >
              <FaLink />
              <div className={styles.buttonText}>Highlight Links</div>
            </button>

            <button
              className={`accessibility-feature-button ${isReadingGuideEnabled ? 'active' : ''}`}
              onClick={toggleReadingGuide}
            >
              <MdInsertPageBreak />
              <div className="button-text">Reading Guide</div>
            </button>

            <button
              className={`accessibility-feature-button ${isReadingMaskEnabled ? 'active' : ''}`}
              onClick={toggleReadingMask}
            >
              <FaAdjust />
              <div className={styles.buttonText}>Reading Mask</div>
            </button>


            <button
              className={`accessibility-feature-button ${areImagesHidden ? 'active' : ''}`}
              onClick={toggleHideImages}
            >
              <MdImageNotSupported />
              <div className={styles.buttonText}>Hide Images</div>
            </button>

          </div>

          <div className={styles.heroContent}>Color Adjustments</div>
          <div className="accessibility-features">
            <button
              className={`accessibility-feature-button ${isDark ? 'active' : ''}`}
              onClick={handleDarkModeToggle}
            >
              <IoMoon />
              <div className={styles.buttonText}>Dark Mode</div>
            </button>

            <button
              className={`accessibility-feature-button ${isDesaturatedActive ? 'active' : ''}`}
              onClick={toggleDesaturation}
            >
              <MdOutlineInvertColors />
              <div className={styles.buttonText}>Desaturation</div>
            </button>

            <button
              className={`accessibility-feature-button ${isContrastExpanded ? 'active' : ''}`}
              onClick={toggleContrast} // Toggle theme options
            >
              <FaAdjust />
              <div className={styles.buttonText}>Contrast</div>
            </button>
          </div>

          {isContrastExpanded && (
            <div className="contrast-themes">
              <button
                className={`contrast-theme-button  ${isDark ? 'active' : ''} ${contrastTheme === 'default' ? 'active' : ''}`}
                onClick={handleResetContrast}
              >
                <FaAdjust />
                <div className={styles.buttonText}>None</div>
              </button>
              <button
                className={`contrast-theme-button ${contrastTheme === 'high-contrast' ? 'active' : ''}`}
                onClick={() => handleContrastToggle('high-contrast')}
              >
                <FaAdjust />
                <div className={styles.buttonText}>High Contrast</div>
              </button>
              <button
                className={`contrast-theme-button ${contrastTheme === 'cyan-on-black' ? 'active' : ''}`}
                onClick={() => handleContrastToggle('cyan-on-black')}
              >
                <FaAdjust />
                <div className={styles.buttonText}>Cyan on Black</div>
              </button>
              <button
                className={`contrast-theme-button ${contrastTheme === 'yellow-on-black' ? 'active' : ''}`}
                onClick={() => handleContrastToggle('yellow-on-black')}
              >
                <FaAdjust />
                <div className={styles.buttonText}>Yellow on Black</div>
              </button>
              <button
                className={`contrast-theme-button ${contrastTheme === 'green-on-black' ? 'active' : ''}`}
                onClick={() => handleContrastToggle('green-on-black')}
              >
                <FaAdjust />
                <div className={styles.buttonText}>Green on Black</div>
              </button>
            </div>
          )}

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

      {/* Reading Mask Overlay */}
      {isReadingMaskEnabled && (
        <div className="reading-mask" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          pointerEvents: 'none',
          zIndex: 10000
        }}>
          <div className="mask-window" style={{
            position: 'absolute',
            top: cursorPosition.y - maskDimensions.height / 2,
            left: 0,
            width: '100%',
            height: maskDimensions.height,
            backgroundColor: 'transparent',
            border: '2px solid #fff',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            zIndex: 10001
          }}></div>
        </div>
      )}

    </div>
  );
};

export default AccessibilityMenu;
