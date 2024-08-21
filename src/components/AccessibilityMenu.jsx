import React, { useEffect, useRef, useState } from 'react';
import { useAccessibility } from './AccessibilityContext';
import { styles } from '../styles';
import ReaderToolbar from './ReaderToolbar';

import { IoAccessibility, IoClose, IoMoon, IoReader } from "react-icons/io5";
import { PiCursorFill } from "react-icons/pi";
import { FaAdjust, FaBookReader, FaHighlighter, FaLink, FaPause, FaPlay } from 'react-icons/fa';
import { RiUserVoiceFill } from 'react-icons/ri';
import { MdImageNotSupported, MdInsertPageBreak, MdOutlineInvertColors } from 'react-icons/md';
import { GiRabbit, GiTortoise } from 'react-icons/gi';

const AccessibilityMenu = ({ currentTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Orientation');
  const menuRef = useRef(null);
  const [isContrastExpanded, setIsContrastExpanded] = useState(false);

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
    isReadMode,
    toggleReadMode,

  } = useAccessibility();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleContrast = () => {
    setIsContrastExpanded(prevState => !prevState);
  };

  const isDyslexiaActive = isDyslexiaFont;
  const isBigCursorActive = isBigCursor;
  const isDesaturatedActive = isDesaturated;

  const handleTabChange = (tab) => {
    if (tab !== 'Color') {
      setIsContrastExpanded(false); // Collapse contrast section when switching tabs
    }
    setActiveTab(tab);
  };

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
    setIsContrastExpanded(false); // Collapse contrast section
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

  // Reading mask
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


  const ProfileTab = () => (
    <div>
      <div className={`ml-4 mt-4 ${styles.heroContent}`}>Accessiblity Profile</div>
      <div className="accessibility-features">
        <button
          className={`${isDyslexiaActive ? 'active' : ''}`}
          onClick={toggleDyslexiaFont}
        >
          <FaBookReader />
          <div className={styles.buttonText}>Dyslexia Friendly</div>
        </button>
      </div>
    </div>
  );

  const OrientationTab = () => (
    <div>
      <div className={`ml-4 mt-4 ${styles.heroContent}`}>Orientation Adjustments</div>

      <div className="screen-reader-section">
        <button
          className={`screen-reader-button ${isReading ? 'active' : ''}`}
          onClick={handleScreenReaderToggle}
        >
          <RiUserVoiceFill />
          <div className={styles.buttonText}>Screen Reader</div>
        </button>

        {isReading && (
          <div className="screen-reader-options">
            <div className='screen-reader-options-row'>
              <button
                onClick={togglePauseResume}
                className={`screen-reader-option ${isPaused ? 'resume' : 'pause'}`}
              >
                {isPaused ? (
                  <div className='screen-reader-option-content'>
                    <FaPlay />
                    <div className={styles.buttonText}>Resume</div>
                  </div>
                ) : (
                  <div className='screen-reader-option-content'>
                    <FaPause />
                    <div className={styles.buttonText}>Pause</div>
                  </div>
                )}
              </button>

              <button
                onClick={handleHighlightToggle}
                className={`screen-reader-option ${highlightEnabled ? 'active' : ''}`}
              >
                <FaHighlighter />
                <div className={styles.buttonText}>Highlight</div>
              </button>
            </div>

            <div className='rate-slider-container'>
              <label htmlFor="rate-slider" className={styles.buttonText}>
                Playback Rate: {rate.toFixed(1)}
              </label>
              <div className='rate-slider-wrapper'>
                <GiTortoise className='size-8' />
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
                <GiRabbit className='size-8' />
              </div>
            </div>

            <div className={styles.buttonText}>Voice</div>
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
        )
        }
      </div >
      <div className="accessibility-features">
        <button
          className={`${isDyslexiaActive ? 'active' : ''}`}
          onClick={toggleDyslexiaFont}
        >
          <FaBookReader />
          <div className={styles.buttonText}>Dyslexia Friendly</div>
        </button>
        <button
          className={`${isBigCursorActive ? 'active' : ''}`}
          onClick={toggleBigCursor}
        >
          <PiCursorFill />
          <div className={styles.buttonText}>Big Cursor</div>
        </button>
        <button
          className={`${isReadMode ? 'active' : ''}`}
          onClick={toggleReadMode}
        >
          <IoReader />
          <div className={styles.buttonText}>Read Mode</div>
        </button>
        <button
          className={`${isReadingGuideEnabled ? 'active' : ''}`}
          onClick={toggleReadingGuide}
        >
          <MdInsertPageBreak />
          <div className={styles.buttonText}>Reading Guide</div>
        </button>
        <button
          className={`${isReadingMaskEnabled ? 'active' : ''}`}
          onClick={toggleReadingMask}
        >
          <FaAdjust />
          <div className={styles.buttonText}>Reading Mask</div>
        </button>
        <button
          className={`${areImagesHidden ? 'active' : ''}`}
          onClick={toggleHideImages}
        >
          <MdImageNotSupported />
          <div className={styles.buttonText}>Hide Images</div>
        </button>
      </div>
    </div >
  );

  const ContentTab = () => (
    <div>
      <div className={`ml-4 mt-4 ${styles.heroContent}`}>Content Adjustments</div>
      <div className="accessibility-features">
        <button
          className={`${highlightLinks ? 'active' : ''}`}
          onClick={handleHighlightLinksToggle}
        >
          <FaLink />
          <div className={styles.buttonText}>Highlight Links</div>
        </button>
      </div>
    </div>
  );

  const ColorTab = () => (
    <div>
      <div className={`ml-4 mt-4 ${styles.heroContent}`}>Color Adjustments</div>
      <div className="accessibility-features">
        <button
          className={`${isDark ? 'active' : ''} ${isReadMode ? 'disabled' : ''}`}
          onClick={isReadMode ? undefined : handleDarkModeToggle}
          disabled={isReadMode}
        >
          <IoMoon />
          <div className={styles.buttonText}>Dark Mode</div>
        </button>
        <button
          className={`${isDesaturatedActive ? 'active' : ''}`}
          onClick={toggleDesaturation}
        >
          <MdOutlineInvertColors />
          <div className={styles.buttonText}>Desaturation</div>
        </button>
        <button
          className={`${isContrastExpanded ? 'active' : ''} ${isReadMode ? 'disabled' : ''}`}
          onClick={isReadMode ? undefined : toggleContrast}
          aria-label="Toggle Contrast Themes"
          disabled={isReadMode}
        >
          <FaAdjust />
          <div className={styles.buttonText}>Contrast</div>
        </button>
      </div>

      {isContrastExpanded && (
        <div className="contrast-themes">
          <button
            className={`${isDark ? 'active' : ''} ${contrastTheme === 'default' ? 'active' : ''}`}
            onClick={handleResetContrast}
          >
            <FaAdjust />
            <div className={styles.buttonText}>None</div>
          </button>
          <button
            className={`${contrastTheme === 'high-contrast' ? 'active' : ''}`}
            onClick={() => handleContrastToggle('high-contrast')}
          >
            <FaAdjust />
            <div className={styles.buttonText}>High Contrast</div>
          </button>
          <button
            className={`${contrastTheme === 'cyan-on-black' ? 'active' : ''}`}
            onClick={() => handleContrastToggle('cyan-on-black')}
          >
            <FaAdjust />
            <div className={styles.buttonText}>Cyan on Black</div>
          </button>
          <button
            className={`${contrastTheme === 'yellow-on-black' ? 'active' : ''}`}
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

    </div>
  );


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
        <div className={`accessibility-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className={`accessibility-menu-heading ${styles.heroContent}`}>
            Accessibility Menu
          </div>
          <div className="accessibility-tabs">
            <button
              className={activeTab === 'Orientation' ? 'active' : ''}
              onClick={() => handleTabChange('Orientation')}>
              Orientation
            </button>
            <button
              className={activeTab === 'Content' ? 'active' : ''}
              onClick={() => handleTabChange('Content')}>
              Content
            </button>
            <button
              className={activeTab === 'Color' ? 'active' : ''}
              onClick={() => handleTabChange('Color')}>
              Color
            </button>
            <button
              className={activeTab === 'Profile' ? 'active' : ''}
              onClick={() => handleTabChange('Profile')}>
              Profile
            </button>
          </div>

          <div className="accessibility-tab-content">
            {activeTab === 'Orientation' && <OrientationTab />}
            {activeTab === 'Content' && <ContentTab />}
            {activeTab === 'Color' && <ColorTab />}
            {activeTab === 'Profile' && <ProfileTab />}
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
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 10000
        }}>
          <div className="mask-window" style={{
            position: 'absolute',
            top: cursorPosition.y - maskDimensions.height / 2,
            left: 0,
            width: '100%',
            height: maskDimensions.height,
            backgroundColor: 'rgba(238, 0, 0, 0.15)',
            border: '2px solid #f90000',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            zIndex: 10001
          }}></div>
        </div>
      )}

      {/* Render the reader toolbar if read mode is active */}
      {isReadMode && (
        <ReaderToolbar
          onClose={toggleReadMode}
          currentTheme={currentTheme}
          onChangeTheme={(theme) => {
            // Ensure the previous theme is removed
            const previousTheme = document.body.classList.value.match(/(?:^|\s)(\w+-theme)(?:\s|$)/);
            if (previousTheme) {
              document.body.classList.remove(previousTheme[1]);
            }
            // Add the new theme class
            document.body.classList.add(theme);
          }}
        />
      )}
    </div>
  );
};

export default AccessibilityMenu;
