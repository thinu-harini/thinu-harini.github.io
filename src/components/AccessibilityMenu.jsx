import React, { useEffect, useRef, useState } from 'react';
import { useAccessibility } from './AccessibilityContext';
import ReaderToolbar from './ReaderToolbar';
import Magnifier from './Magnifier';
import Tooltip from './Tooltip';
import Dictionary from './Dictionary';
import '../assets/styles/AccessibilityMenu.css';

import { IoAccessibility, IoClose, IoMoon, IoReader } from "react-icons/io5";
import { PiCursorFill } from "react-icons/pi";
import { FaAdjust, FaBookReader, FaHighlighter, FaLandmark, FaLink, FaPause, FaPlay, FaTint } from 'react-icons/fa';
import { RiUserVoiceFill } from 'react-icons/ri';
import { MdImageNotSupported, MdInsertPageBreak, MdOutlineInvertColors, MdOutlineSpaceBar, MdOutlineTextFields } from 'react-icons/md';
import { GiRabbit, GiTortoise, GiWhiteBook } from 'react-icons/gi';
import { VscTextSize } from 'react-icons/vsc';
import { HiDocumentMagnifyingGlass } from 'react-icons/hi2';
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6';
import { TbLineHeight } from 'react-icons/tb';
import { CgFontSpacing } from 'react-icons/cg';
import { LuHeading1 } from 'react-icons/lu';

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

const AccessibilityMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Orientation');
  const accessibilityMenuRef = useRef(null);

  const [isContrastExpanded, setIsContrastExpanded] = useState(false);
  const [saturationMode, setSaturationMode] = useState(null);
  const [landmarkColor, setLandmarkColor] = useState(null);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [isBlueFilterActive, setBlueFilterActive] = useState(false);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const [isBiggerText, setIsBiggerText] = useState(false);
  const [isMagnifierActive, setMagnifierActive] = useState(false);

  const {
    textScale, setTextScale,
    lineHeightScale, setLineHeightScale,
    wordSpacingScale, setWordSpacingScale,
    charSpacingScale, setCharSpacingScale,
    textAlign, setTextAlign,
    fontFamily, setFontFamily,
    isDyslexiaFont, toggleDyslexiaFont,

    isScreenReaderActive, toggleScreenReader,
    moveToNextElement,
    moveToPreviousElement,
    areHighlightsVisible, toggleHighlightVisibility,
    isPaused, togglePauseResume,
    rate, setSpeechRate,
    voices, setVoice,
    selectedVoice,

    isBigCursor, toggleBigCursor,

    highlightLinks, toggleHighlightLinks,
    isHighlightTitles, toggleHighlightTitles,
    isDark, toggleDarkMode,
    contrastTheme, toggleContrastTheme,
    resetContrastTheme,
    areImagesHidden, toggleHideImages,
    isReadingGuideEnabled, toggleReadingGuide,
    isReadingMaskEnabled, toggleReadingMask,
    maskDimensions,

    isReadMode, toggleReadMode,
    currentReadModeTheme, setCurrentReadModeTheme,

    isAnimationsPaused, toggleAnimations,
    isDictionaryMode, toggleDictionaryMode, setWord,
    isTooltipMode, toggleTooltipMode,

  } = useAccessibility();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Function to close the accessibility menu
  const closeMenu = () => setIsMenuOpen(false);

  const toggleContrast = () => {
    setIsContrastExpanded(prevState => !prevState);
    setShowColorOptions(false);
  };

  // const isDyslexiaActive = isDyslexiaFont;
  const isBigCursorActive = isBigCursor;

  const handleTabChange = (tab) => {
    if (tab !== 'Color') {
      setIsContrastExpanded(false); // Collapse contrast section when switching tabs
      setShowColorOptions(false);
    }
    setActiveTab(tab);
  };

  const handleTextSizeChange = (event) => {
    setTextScale(parseFloat(event.target.value));
  };

  const handleResetTextChanges = () => {
    setTextScale(1);
    setLineHeightScale(1);
    setWordSpacingScale(0.1);
    setCharSpacingScale(0.1);
    setTextAlign('left');
    setFontFamily('Poppins');
  };

  const handleResetTextSize = () => {
    setTextScale(1);
  };

  const handleLineHeightChange = (event) => {
    setLineHeightScale(parseFloat(event.target.value));
  };

  const handleResetLineHeight = () => {
    setLineHeightScale(1);
  };

  const handleWordSpacingChange = (event) => {
    setWordSpacingScale(parseFloat(event.target.value));
  };

  const handleResetWordSpacing = () => {
    setWordSpacingScale(0.1);
  };

  const handleCharSpacingChange = (event) => {
    setCharSpacingScale(parseFloat(event.target.value));
  };

  const handleResetCharSpacing = () => {
    setCharSpacingScale(1);
  };

  const handleAlignChange = (alignment) => {
    setTextAlign(alignment);
  };

  const handleFontFamilyChange = (event) => {
    if (isDyslexiaFont) {
      toggleDyslexiaFont();
    }
    setFontFamily(event.target.value);
  };

  const toggleBiggerText = () => {
    setIsBiggerText(prev => {
      const newSize = !prev;
      setTextScale(newSize ? 1.5 : 1); // Set text scale to 1.5x or 1x
      return newSize;
    });
  };

  const toggleMagnifier = () => setMagnifierActive(!isMagnifierActive);

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

  const handleHighlightLinksToggle = (e) => {
    e.stopPropagation();
    toggleHighlightLinks();
  };

  const handleRateChange = (event) => {
    setSpeechRate(parseFloat(event.target.value));
  };

  const handleVoiceChange = (event) => {
    const selected = voices.find(voice => voice.name === event.target.value);
    if (selected) {
      setVoice(selected);
    }
  };

  // Dictionary mode
  // Function to handle text selection
  const handleTextSelection = () => {
    if (isDictionaryMode) {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        setWord(selectedText); // Update selected word in context
      }
    }
  };

  // Add or remove event listener based on dictionary mode
  useEffect(() => {
    if (isDictionaryMode) {
      document.addEventListener('mouseup', handleTextSelection);
    } else {
      document.removeEventListener('mouseup', handleTextSelection);
    }
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, [isDictionaryMode]);


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
      if (accessibilityMenuRef.current && !accessibilityMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChangeTheme = (theme) => {
    document.body.classList.remove('light-theme', 'dark-theme', 'sepia-theme', 'contrast-theme');
    document.body.classList.add(theme);
    setCurrentReadModeTheme(theme);
  };

  const ProfileTab = () => (
    <div>
      <div className="accessibility-heading ml-4 mt-4">Accessiblity Profile</div>
      <div className="profile-section">
        <button
          className={`accessibility-profile ${isDyslexiaFont ? 'active' : ''}`}
          onClick={toggleDyslexiaFont}
        >
          {/* <FaWheelchair size={20} /> */}
          Motor Impaired
        </button>
        <button
          className={`accessibility-profile ${isDyslexiaFont ? 'active' : ''}`}
          onClick={toggleDyslexiaFont}
        >
          {/* <FaBlind size={20} /> */}
          Vision Impaired
        </button>
        <button
          className={`accessibility-profile ${isDyslexiaFont ? 'active' : ''}`}
          onClick={toggleDyslexiaFont}
        >
          {/* <FaBookReader size={20} /> */}
          Dyslexia Friendly
        </button>
        <button
          className={`accessibility-profile ${isDyslexiaFont ? 'active' : ''}`}
          onClick={toggleDyslexiaFont}
        >
          {/* <FaBookReader size={20} /> */}
          ADHD Friendly
        </button>
        <button
          className={`accessibility-profile ${isDyslexiaFont ? 'active' : ''}`}
          onClick={toggleDyslexiaFont}
        >
          {/* <TbPuzzleFilled size={20} /> */}
          Cognitivev & Learning
        </button>
        <button
          className={`accessibility-profile ${isDyslexiaFont ? 'active' : ''}`}
          onClick={toggleDyslexiaFont}
        >
          {/* <IoMdFlashOff size={20} /> */}
          Seizure Safe
        </button>
      </div>
    </div>
  );

  const OrientationTab = () => (
    <div>
      <div className="accessibility-heading ml-4 mt-4">Orientation Adjustments</div>
      <div className="screen-reader-section">
        <button
          className={`screen-reader-button ${isScreenReaderActive ? 'active' : ''}`}
          onClick={toggleScreenReader}
        >
          <RiUserVoiceFill size={20} />
          Screen Reader
        </button>

        {isScreenReaderActive && (
          <div className="screen-reader-options">
            <div className='screen-reader-options-row'>
              <button
                onClick={moveToPreviousElement}
                className="screen-reader-option"
                aria-label="Previous Element">
                <FaBackwardStep size={20} />
              </button>

              <button
                onClick={togglePauseResume}
                className="screen-reader-option"
              >
                {isPaused ? (
                  <div className='screen-reader-option-content'>
                    <FaPlay size={20} />
                  </div>
                ) : (
                  <div className='screen-reader-option-content'>
                    <FaPause size={20} />
                  </div>
                )}
              </button>

              <button
                onClick={moveToNextElement}
                className="screen-reader-option"
                aria-label="Next Element">
                <FaForwardStep size={20} />
              </button>

              <button
                onClick={toggleHighlightVisibility}
                className={`screen-reader-option ${areHighlightsVisible ? 'active' : ''}`}
              >
                <FaHighlighter size={20} />
                Highlight
              </button>
            </div>

            <div className='slider-container'>
              <label htmlFor="slider-lable">
                Playback Rate: {rate.toFixed(1)}
              </label>
              <div className='slider-wrapper p-2'>
                <GiTortoise size={32} />
                <input
                  type="range"
                  id="rate-slider"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={handleRateChange}
                  className="slider"
                />
                <GiRabbit size={32} />
              </div>
            </div>

            Voice
            <select
              id="voices"
              className="custom-select"
              onChange={handleVoiceChange}
              value={selectedVoice ? selectedVoice.name : ''}>
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
        )
        }
      </div >
      <div className="accessibility-features">
        <button
          className={`${isReadMode ? 'active' : ''}`}
          onClick={toggleReadMode}
        >
          <IoReader size={20} />
          Read Mode
        </button>
        <button
          className={`${isDictionaryMode ? 'active' : ''}`}
          onClick={toggleDictionaryMode}
        >
          <GiWhiteBook size={20} />
          Dictionary
        </button>
        <button
          className={`${isDyslexiaFont ? 'active' : ''}`}
          onClick={toggleDyslexiaFont}
        >
          <FaBookReader size={20} />
          Dyslexia Friendly
        </button>
        <button
          className={`${isBiggerText ? 'active' : ''}`}
          onClick={toggleBiggerText}
        >
          <VscTextSize size={20} />
          Bigger Text
        </button>
        <button
          className={`${isBigCursorActive ? 'active' : ''}`}
          onClick={toggleBigCursor}
        >
          <PiCursorFill size={20} />
          Big Cursor
        </button>
        <button
          className={`${isReadingGuideEnabled ? 'active' : ''}`}
          onClick={toggleReadingGuide}
        >
          <MdInsertPageBreak size={20} />
          Reading Guide
        </button>
        <button
          className={`${isReadingMaskEnabled ? 'active' : ''}`}
          onClick={toggleReadingMask}
        >
          <FaAdjust size={20} />
          Reading Mask
        </button>
        <button
          className={`${areImagesHidden ? 'active' : ''}`}
          onClick={toggleHideImages}
        >
          <MdImageNotSupported size={20} />
          Hide Images
        </button>
        {/* <button
          onClick={toggleAnimations}
          aria-label={isAnimationsPaused ? "Resume Animations" : "Pause Animations"}
        >
          <GiMovementSensor size={20} />
        Pause Animation
        </button> */}
      </div>
    </div >
  );

  const ContentTab = () => (
    <div>
      <div className="text-adjustment-section">
        <div className="flex flex-row gap-4">
          <div className="accessibility-heading">Content Adjustments</div>

          <button
            className='reset-button'
            onClick={handleResetTextChanges}
          >
            Reset All
          </button>
        </div>
        <div className='slider-container mb-2'>
          <div className="slider-header">
            <label htmlFor="slider-lable">
              Text Size: {textScale.toFixed(1)}
            </label>
            <button
              className='reset-button'
              onClick={handleResetTextSize}
            >
              Reset
            </button>
          </div>

          <div className='slider-wrapper p-2'>
            <MdOutlineTextFields size={32} />
            <input
              type="range"
              id="text-size-slider"
              min="0.5"
              max="2"
              step="0.1"
              value={textScale}
              onChange={handleTextSizeChange}
              className="slider"
              aria-label="Adjust text size"
            />
          </div >
        </div >

        <div className='slider-container mb-2'>
          <div className="slider-header">
            <label htmlFor="slider-lable">
              Line Spacing: {lineHeightScale.toFixed(1)}
            </label>
            <button
              className='reset-button'
              onClick={handleResetLineHeight}
            >
              Reset
            </button>
          </div>
          <div className='slider-wrapper p-2'>
            <TbLineHeight size={32} />
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={lineHeightScale}
              onChange={handleLineHeightChange}
              className="slider"
              aria-label="Adjust line height"
            />
          </div>
        </div>


        <div className='slider-container mb-2'>
          <div className="slider-header">
            <label htmlFor="slider-lable">
              Word Spacing: {wordSpacingScale.toFixed(1)}
            </label>
            <button
              className='reset-button'
              onClick={handleResetWordSpacing}
            >
              Reset
            </button>
          </div>
          <div className="slider-wrapper p-2">
            <MdOutlineSpaceBar size={32} />
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={wordSpacingScale}
              onChange={handleWordSpacingChange}
              className="slider"
              aria-label="Adjust word spacing"
            />
          </div>
        </div>

        <div className='slider-container mb-2'>
          <div className="slider-header">
            <label htmlFor="slider-lable">
              Character Spacing: {charSpacingScale.toFixed(1)}
            </label>
            <button
              className='reset-button'
              onClick={handleResetCharSpacing}
            >
              Reset
            </button>
          </div>
          <div className='slider-wrapper p-2'>
            <CgFontSpacing size={32} />
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={charSpacingScale}
              onChange={handleCharSpacingChange}
              className="slider"
              aria-label="Adjust character spacing"
            />
          </div>
        </div>

        {/* alignment  */}
        <div className='text-adjustment-option'>
          <button
            className={`text-adjustment-button ${textAlign === 'left' ? 'active' : ''}`}
            onClick={() => handleAlignChange('left')}
          >
            Left
          </button>
          <button
            className={`text-adjustment-button ${textAlign === 'center' ? 'active' : ''}`}
            onClick={() => handleAlignChange('center')}
          >
            Center
          </button>
          <button
            className={`text-adjustment-button ${textAlign === 'right' ? 'active' : ''}`}
            onClick={() => handleAlignChange('right')}
          >
            Right
          </button>
          <button
            className={`text-adjustment-button ${textAlign === 'justify' ? 'active' : ''}`}
            onClick={() => handleAlignChange('justify')}
          >
            Justify
          </button>
        </div>

        <div className='text-adjustment-option'>
          <select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            className="custom-select"
            aria-label="Select font family"
          >
            <option value="Poppins">Poppins(Default)</option>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
          </select>
        </div >
      </div >


      <div className="accessibility-features">
        <button onClick={toggleMagnifier}
          className={`${isMagnifierActive ? 'active' : ''}`}
        >
          <HiDocumentMagnifyingGlass size={20} />
          Text Magnifier
        </button>
        <button
          className={`${highlightLinks ? 'active' : ''}`}
          onClick={handleHighlightLinksToggle}
        >
          <FaLink size={20} />
          Highlight Links
        </button>
        <button
          className={`${isHighlightTitles ? 'active' : ''}`}
          onClick={toggleHighlightTitles}
        >
          <LuHeading1 size={20} />
          Highlight Titles
        </button>
        <button
          className={`${isTooltipMode ? 'active' : ''}`} // 
          onClick={toggleTooltipMode}
        >
          <HiDocumentMagnifyingGlass size={20} />
          Tooltips
        </button>
      </div>
    </div >
  );

  const ColorTab = () => (
    <div>
      <div className="accessibility-heading ml-4 mt-4">Color Adjustments</div>
      <div className="accessibility-features">
        <button
          className={`${isDark ? 'active' : ''} ${isReadMode ? 'disabled' : ''}`}
          onClick={isReadMode ? undefined : handleDarkModeToggle}
          disabled={isReadMode}
        >
          <IoMoon size={20} />
          Dark Mode
        </button>
        <button
          className={`${isBlueFilterActive ? 'active' : ''}`}
          onClick={toggleBlueFilter}
        >
          <FaTint size={20} />
          Blue Filter
        </button>
        <button
          className={`${saturationMode === 'low' ? 'active' : ''}`}
          onClick={() => toggleSaturationMode('low')}
        >
          <MdOutlineInvertColors size={20} />
          Low Saturation
        </button>
        <button
          className={`${saturationMode === 'high' ? 'active' : ''}`}
          onClick={() => toggleSaturationMode('high')}
        >
          <MdOutlineInvertColors size={20} />
          High Saturation
        </button>
        <button
          className={`${saturationMode === 'grayscale' ? 'active' : ''}`}
          onClick={() => toggleSaturationMode('grayscale')}
        >
          <MdOutlineInvertColors size={20} />
          Grayscale
        </button>
        <button
          className={`${isContrastExpanded ? 'active' : ''} ${isReadMode ? 'disabled' : ''}`}
          onClick={isReadMode ? undefined : toggleContrast}
          aria-label="Toggle Contrast Themes"
          disabled={isReadMode}
        >
          <FaAdjust size={20} />
          Contrast
        </button>

      </div>
      {isContrastExpanded && (
        <div className="contrast-themes">
          <button
            className={`${isDark ? 'active' : ''} ${contrastTheme === 'default' ? 'active' : ''}`}
            onClick={handleResetContrast}
          >
            <FaAdjust size={20} />
            None
          </button>
          <button
            className={`${contrastTheme === 'high-contrast' ? 'active' : ''}`}
            onClick={() => handleContrastToggle('high-contrast')}
          >
            <FaAdjust size={20} />
            High Contrast
          </button>
          <button
            className={`${contrastTheme === 'cyan-on-black' ? 'active' : ''}`}
            onClick={() => handleContrastToggle('cyan-on-black')}
          >
            <FaAdjust size={20} />
            Cyan on Black
          </button>
          <button
            className={`${contrastTheme === 'yellow-on-black' ? 'active' : ''}`}
            onClick={() => handleContrastToggle('yellow-on-black')}
          >
            <FaAdjust size={20} />
            Yellow on Black
          </button>
          <button
            className={`contrast-theme-button ${contrastTheme === 'green-on-black' ? 'active' : ''}`}
            onClick={() => handleContrastToggle('green-on-black')}
          >
            <FaAdjust size={20} />
            Green on Black
          </button>
        </div>
      )}
      <div className="accessibility-features">
        <button
          className={`${showColorOptions ? 'active' : ''} ${landmarkColor ? 'active' : ''} ${isReadMode ? 'disabled' : ''}`}
          onClick={isReadMode ? undefined : toggleColorOptions}
          disabled={isReadMode}
        >
          <FaLandmark size={20} />
          Landmark Colors
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
    <div className='accessibility-menu-container' id='accessibility-menu' ref={accessibilityMenuRef}>
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
          <div className="accessibility-menu-heading">
            Accessibility Menu
          </div>
          <div className="accessibility-tabs">
            <button
              className={`${activeTab === 'Orientation' ? 'active' : ''}`}
              onClick={() => handleTabChange('Orientation')}>
              Orientation
            </button>
            <button
              className={`${activeTab === 'Content' ? 'active' : ''}`}
              onClick={() => handleTabChange('Content')}>
              Content
            </button>
            <button
              className={`${activeTab === 'Color' ? 'active' : ''}`}
              onClick={() => handleTabChange('Color')}>
              Color
            </button>
            <button
              className={`${activeTab === 'Profile' ? 'active' : ''}`}
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
          isReadMode={isReadMode}
          onClose={toggleReadMode}
          currentTheme={currentReadModeTheme}
          onChangeTheme={handleChangeTheme}
          // onChangeTheme={(theme) => {
          //   // Ensure the previous theme is removed
          //   const previousTheme = document.body.classList.value.match(/(?:^|\s)(\w+-theme)(?:\s|$)/);
          //   if (previousTheme) {
          //     document.body.classList.remove(previousTheme[1]);
          //   }
          //   // Add the new theme class
          //   document.body.classList.add(theme);
          // }}
          closeAccessibilityMenu={closeMenu}
        />
      )}

      {/* Render the magnifier */}
      {isMagnifierActive && <Magnifier isActive={isMagnifierActive} />}

      {isDictionaryMode && <Dictionary />}
      <Tooltip />
    </div>
  );
};

export default AccessibilityMenu;

