import React, { useEffect, useRef, useState } from 'react';
import { useAccessibility } from './AccessibilityContext';
import ReaderToolbar from './ReaderToolbar';

import { IoAccessibility, IoClose, IoMoon, IoReader } from "react-icons/io5";
import { PiCursorFill } from "react-icons/pi";
import { FaAdjust, FaBookReader, FaHighlighter, FaLandmark, FaLink, FaPause, FaPlay, FaTint } from 'react-icons/fa';
import { RiUserVoiceFill } from 'react-icons/ri';
import { MdImageNotSupported, MdInsertPageBreak, MdOutlineInvertColors, MdOutlineTextDecrease, MdOutlineTextIncrease } from 'react-icons/md';
import { GiRabbit, GiTortoise } from 'react-icons/gi';
import { VscTextSize } from 'react-icons/vsc';
import Magnifier from './Magnifier';
import { HiDocumentMagnifyingGlass } from 'react-icons/hi2';

const colorOptions = [
  { name: 'Red', color: '#ff0000' },
  { name: 'Green', color: '#4caf50' },
  { name: 'Blue', color: '#3e64ff' },
  { name: 'Yellow', color: '#fcd000' },
  { name: 'Purple', color: '#9c27b0' },
  { name: 'Gray', color: '#808080' },
  { name: 'Black', color: '#000000' },
  { name: 'White', color: '#ffffff' },
];

const AccessibilityMenu = ({ currentTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Orientation');
  const menuRef = useRef(null);
  const [isContrastExpanded, setIsContrastExpanded] = useState(false);
  const [saturationMode, setSaturationMode] = useState(null);
  const [landmarkColor, setLandmarkColor] = useState(null);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [isBlueFilterActive, setBlueFilterActive] = useState(false);

  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [textScale, setTextScale] = useState(1); // Text scaling factor
  const [lineHeightScale, setLineHeightScale] = useState(1); // Line height scaling factor
  const [isBiggerText, setIsBiggerText] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [isMagnifierActive, setMagnifierActive] = useState(false);

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
    setShowColorOptions(false);
  };

  const isDyslexiaActive = isDyslexiaFont;
  const isBigCursorActive = isBigCursor;

  useEffect(() => {
    document.documentElement.style.setProperty('--text-scale', textScale);
    document.documentElement.style.setProperty('--line-height-scale', lineHeightScale);
  }, [textScale, lineHeightScale]);

  const handleIncreaseTextSize = () => {
    setTextScale(prev => Math.min(prev + 0.1, 2));
    setActiveButton('increase');
  };

  const handleDecreaseTextSize = () => {
    setTextScale(prev => Math.max(prev - 0.1, 0.5));
    setActiveButton('decrease');
  };

  const handleResetTextSize = () => {
    setTextScale(1);
    setLineHeightScale(1);
    setActiveButton('reset');
  };

  const toggleBiggerText = () => {
    setIsBiggerText(prev => {
      const newSize = !prev;
      setTextScale(newSize ? 1.5 : 1); // Set text scale to 1.5x or 1x
      return newSize;
    });
  };

  const toggleMagnifier = () => setMagnifierActive(!isMagnifierActive);

  const handleTabChange = (tab) => {
    if (tab !== 'Color') {
      setIsContrastExpanded(false); // Collapse contrast section when switching tabs
      setShowColorOptions(false);
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
    setShowColorOptions(false);
  };

  const handleContrastToggle = (theme) => {
    toggleContrastTheme(theme);
  };

  const handleResetContrast = () => {
    resetContrastTheme();
  };

  useEffect(() => {
    document.body.classList.remove('low-saturation', 'high-saturation', 'grayscale', 'blue-filter');

    if (saturationMode === 'low') {
      document.body.classList.add('low-saturation');
    } else if (saturationMode === 'high') {
      document.body.classList.add('high-saturation');
    } else if (saturationMode === 'grayscale') {
      document.body.classList.add('grayscale');
    }

    if (isBlueFilterActive) {
      document.body.classList.add('blue-filter');
    }

    if (landmarkColor) {
      document.body.style.setProperty('--landmark-color', landmarkColor);
      document.body.classList.add('landmark-colors');
    } else {
      document.body.classList.remove('landmark-colors');
    }
  }, [saturationMode, isBlueFilterActive, landmarkColor]);

  const toggleSaturationMode = (mode) => {
    // Toggle the mode if it's already active; otherwise, set it to the new mode
    setSaturationMode(prevMode => prevMode === mode ? null : mode);
    setIsContrastExpanded(false); // Collapse contrast section
    setShowColorOptions(false);
  };

  const toggleBlueFilter = () => {
    setBlueFilterActive(prev => !prev);
    setIsContrastExpanded(false); // Collapse contrast section
    setShowColorOptions(false);
  };

  const handleColorSelect = (color) => {
    setLandmarkColor(prevColor => prevColor === color ? null : color);
  };

  const toggleColorOptions = () => {
    setShowColorOptions(prev => !prev);
    setIsContrastExpanded(false); // Collapse contrast section
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
      <div className="hero-text ml-4 mt-4">Accessiblity Profile</div>
      <div className="accessibility-features">
        <button
          className={`${isDyslexiaActive ? 'active' : ''}`}
          onClick={toggleDyslexiaFont}
        >
          <FaBookReader />
          <div className="button-text">Dyslexia Friendly</div>
        </button>
      </div>
    </div>
  );

  const OrientationTab = () => (
    <div>
      <div className="hero-text ml-4 mt-4">Orientation Adjustments</div>
      <div className="screen-reader-section">
        <button
          className={`screen-reader-button ${isReading ? 'active' : ''}`}
          onClick={handleScreenReaderToggle}
        >
          <RiUserVoiceFill />
          <div className="button-text">Screen Reader</div>
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
                    <div className="button-text">Resume</div>
                  </div>
                ) : (
                  <div className='screen-reader-option-content'>
                    <FaPause />
                    <div className="button-text">Pause</div>
                  </div>
                )}
              </button>

              <button
                onClick={handleHighlightToggle}
                className={`screen-reader-option ${highlightEnabled ? 'active' : ''}`}
              >
                <FaHighlighter />
                <div className="button-text">Highlight</div>
              </button>
            </div>

            <div className='rate-slider-container'>
              <label htmlFor="rate-slider" className="button-text">
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

            <div className="button-text">Voice</div>
            <select
              className="button-text custom-select"
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
          <div className="button-text">Dyslexia Friendly</div>
        </button>
        <button
          className={`${isBigCursorActive ? 'active' : ''}`}
          onClick={toggleBigCursor}
        >
          <PiCursorFill />
          <div className="button-text">Big Cursor</div>
        </button>
        <button
          className={`${isBiggerText ? 'active' : ''}`}
          onClick={toggleBiggerText}
        >
          <VscTextSize />
          <div className="button-text">Bigger Text</div>
        </button>

        <button
          className={`${isReadMode ? 'active' : ''}`}
          onClick={toggleReadMode}
        >
          <IoReader />
          <div className="button-text">Read Mode</div>
        </button>
        <button
          className={`${isReadingGuideEnabled ? 'active' : ''}`}
          onClick={toggleReadingGuide}
        >
          <MdInsertPageBreak />
          <div className="button-text">Reading Guide</div>
        </button>
        <button
          className={`${isReadingMaskEnabled ? 'active' : ''}`}
          onClick={toggleReadingMask}
        >
          <FaAdjust />
          <div className="button-text">Reading Mask</div>
        </button>
        <button
          className={`${areImagesHidden ? 'active' : ''}`}
          onClick={toggleHideImages}
        >
          <MdImageNotSupported />
          <div className="button-text">Hide Images</div>
        </button>
      </div>
    </div >
  );

  const ContentTab = () => (
    <div>
      <div className="hero-text ml-4 mt-4">Content Adjustments</div>
      <div className="hero-text ml-4 mt-4">Text Size</div>
      <div className="text-adjustment-section">
        <div className='text-adjustment-options'>
          <button
            className={`text-adjustment-option ${activeButton === 'decrease' ? 'active' : ''}`}
            onClick={handleDecreaseTextSize}
          >
            <MdOutlineTextDecrease />
            <div className="button-text">Decrease</div>
          </button>

          <button
            className={`text-adjustment-option ${activeButton === 'increase' ? 'active' : ''}`}
            onClick={handleIncreaseTextSize}
          >
            <MdOutlineTextIncrease />
            <div className="button-text">Increase</div>
          </button>

          <button
            className={`text-adjustment-option ${activeButton === 'reset' ? 'active' : ''}`}
            onClick={handleResetTextSize}
          >
            <div className="button-text">Reset</div>
          </button>
        </div >
      </div >
      <div className="accessibility-features">
        <button onClick={toggleMagnifier}
          className={`${isMagnifierActive ? 'active' : ''}`}
        >
          <HiDocumentMagnifyingGlass />
          <div className="button-text">Text Magnifier</div>
        </button>
        <button
          className={`${highlightLinks ? 'active' : ''}`}
          onClick={handleHighlightLinksToggle}
        >
          <FaLink />
          <div className="button-text">Highlight Links</div>
        </button>
      </div>
    </div >
  );

  const ColorTab = () => (
    <div>
      <div className="hero-text ml-4 mt-4">Color Adjustments</div>
      <div className="accessibility-features">
        <button
          className={`${isDark ? 'active' : ''} ${isReadMode ? 'disabled' : ''}`}
          onClick={isReadMode ? undefined : handleDarkModeToggle}
          disabled={isReadMode}
        >
          <IoMoon />
          <div className="button-text">Dark Mode</div>
        </button>
        <button
          className={`${isBlueFilterActive ? 'active' : ''}`}
          onClick={toggleBlueFilter}
        >
          <FaTint />
          <div className="button-text">Blue Filter</div>
        </button>
        <button
          className={`${saturationMode === 'low' ? 'active' : ''}`}
          onClick={() => toggleSaturationMode('low')}
        >
          <MdOutlineInvertColors />
          <div className="button-text">Low Saturation</div>
        </button>
        <button
          className={`${saturationMode === 'high' ? 'active' : ''}`}
          onClick={() => toggleSaturationMode('high')}
        >
          <MdOutlineInvertColors />
          <div className="button-text">High Saturation</div>
        </button>
        <button
          className={`${saturationMode === 'grayscale' ? 'active' : ''}`}
          onClick={() => toggleSaturationMode('grayscale')}
        >
          <MdOutlineInvertColors />
          <div className="button-text">Grayscale</div>
        </button>
        <button
          className={`${isContrastExpanded ? 'active' : ''} ${isReadMode ? 'disabled' : ''}`}
          onClick={isReadMode ? undefined : toggleContrast}
          aria-label="Toggle Contrast Themes"
          disabled={isReadMode}
        >
          <FaAdjust />
          <div className="button-text">Contrast</div>
        </button>

      </div>
      {isContrastExpanded && (
        <div className="contrast-themes">
          <button
            className={`${isDark ? 'active' : ''} ${contrastTheme === 'default' ? 'active' : ''}`}
            onClick={handleResetContrast}
          >
            <FaAdjust />
            <div className="button-text">None</div>
          </button>
          <button
            className={`${contrastTheme === 'high-contrast' ? 'active' : ''}`}
            onClick={() => handleContrastToggle('high-contrast')}
          >
            <FaAdjust />
            <div className="button-text">High Contrast</div>
          </button>
          <button
            className={`${contrastTheme === 'cyan-on-black' ? 'active' : ''}`}
            onClick={() => handleContrastToggle('cyan-on-black')}
          >
            <FaAdjust />
            <div className="button-text">Cyan on Black</div>
          </button>
          <button
            className={`${contrastTheme === 'yellow-on-black' ? 'active' : ''}`}
            onClick={() => handleContrastToggle('yellow-on-black')}
          >
            <FaAdjust />
            <div className="button-text">Yellow on Black</div>
          </button>
          <button
            className={`contrast-theme-button ${contrastTheme === 'green-on-black' ? 'active' : ''}`}
            onClick={() => handleContrastToggle('green-on-black')}
          >
            <FaAdjust />
            <div className="button-text">Green on Black</div>
          </button>
        </div>
      )}
      <div className="accessibility-features">
        <button
          className={`${showColorOptions ? 'active' : ''} ${landmarkColor ? 'active' : ''} ${isReadMode ? 'disabled' : ''}`}
          onClick={isReadMode ? undefined : toggleColorOptions}
          disabled={isReadMode}
        >
          <FaLandmark />
          <div className="button-text">Landmark Colors</div>
        </button>
      </div>
      {showColorOptions && (
        <div className="color-options">
          {colorOptions.map(option => (
            <button
              key={option.name}
              style={{ backgroundColor: option.color }}
              className={`color-option ${landmarkColor === option.color ? 'active' : ''}`}
              onClick={() => handleColorSelect(option.color)}
            >
              {/* {option.name} */}
            </button>
          ))}
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
          <div className="accessibility-menu-heading hero-text">
            Accessibility Menu
          </div>
          <div className="accessibility-tabs">
            <button
              className={`button-text ${activeTab === 'Orientation' ? 'active' : ''}`}
              onClick={() => handleTabChange('Orientation')}>
              Orientation
            </button>
            <button
              className={`button-text ${activeTab === 'Content' ? 'active' : ''}`}
              onClick={() => handleTabChange('Content')}>
              Content
            </button>
            <button
              className={`button-text ${activeTab === 'Color' ? 'active' : ''}`}
              onClick={() => handleTabChange('Color')}>
              Color
            </button>
            <button
              className={`button-text ${activeTab === 'Profile' ? 'active' : ''}`}
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

      {/* Render the magnifier */}
      {isMagnifierActive && <Magnifier isActive={isMagnifierActive} />}
    </div>
  );
};

export default AccessibilityMenu;
