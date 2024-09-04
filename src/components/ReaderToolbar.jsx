import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosColorPalette } from 'react-icons/io';
import { IoClose, IoText } from 'react-icons/io5';
import { PiTextAlignCenterBold, PiTextAlignJustifyBold, PiTextAlignLeftBold, PiTextAlignRightBold } from 'react-icons/pi';
import { MdOutlineSpaceBar, MdOutlineTextFields } from 'react-icons/md';
import { CgFontSpacing } from 'react-icons/cg';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import { generateTicks } from '../utils/sliderUtils';
import { TbLineHeight } from 'react-icons/tb';
import '../assets/styles/ReaderToolbar.css';

const FONT_SIZE_CLASSES = [
  'font-size-14',
  'font-size-18',
  'font-size-22',
  'font-size-26',
  'font-size-30',
  'font-size-34',
  'font-size-38'
];
const FONT_WEIGHTS = {
  default: 'default',
  regular: 'regular',
  bold: 'bold',
  bolder: 'bolder',
};
const FONT_FAMILIES = ['sans-serif', 'serif', 'monospace'];
const WORD_SPACING_STEPS = [0, 2, 4, 6, 8];
const LETTER_SPACING_STEPS = [0, 1, 2, 3, 4];
const LINE_SPACING_STEPS = [1, 2, 3, 4, 5];
const TEXT_ALIGNMENTS = ['left', 'center', 'right', 'justify'];

const DEFAULT_VALUES = {
  fontSizeIndex: 1,
  fontWeight: FONT_WEIGHTS.default,
  fontFamily: 'sans-serif',
  wordSpacingIndex: 0,
  letterSpacingIndex: 0,
  contentWidth: 75,
  lineSpacingIndex: 1,
  textAlignment: 'left'
};

const ReaderToolbar = ({ isReadMode, onClose, currentTheme, onChangeTheme, closeAccessibilityMenu }) => {

  const [activeMenu, setActiveMenu] = useState(null);
  const readerToolbarRef = useRef(null);

  const [fontSizeIndex, setFontSizeIndex] = useState(DEFAULT_VALUES.fontSizeIndex);
  const [fontWeight, setFontWeight] = useState(DEFAULT_VALUES.fontWeight);
  const [fontFamily, setFontFamily] = useState(DEFAULT_VALUES.fontFamily);
  const [wordSpacingIndex, setWordSpacingIndex] = useState(DEFAULT_VALUES.wordSpacingIndex);
  const [letterSpacingIndex, setLetterSpacingIndex] = useState(DEFAULT_VALUES.letterSpacingIndex);
  const [textAlignment, setTextAlignment] = useState(DEFAULT_VALUES.textAlignment);
  const [contentWidth, setContentWidth] = useState(DEFAULT_VALUES.contentWidth);
  const [lineSpacingIndex, setLineSpacingIndex] = useState(DEFAULT_VALUES.lineSpacingIndex);

  const [hasChanges, setHasChanges] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (!isReadMode) return;

    const bodyClassList = document.body.classList;
    FONT_SIZE_CLASSES.forEach(cls => bodyClassList.remove(`${cls}`));
    bodyClassList.add(`${FONT_SIZE_CLASSES[fontSizeIndex]}`);
    Object.values(FONT_WEIGHTS).forEach(weight => bodyClassList.remove(`font-weight-${weight}`));
    bodyClassList.add(`font-weight-${fontWeight}`);
    bodyClassList.remove(...FONT_FAMILIES.map(family => `font-family-${family}`));
    bodyClassList.add(`font-family-${fontFamily}`);
    bodyClassList.remove(...bodyClassList.value.match(/letter-spacing-\d+/) || []);
    bodyClassList.add(`letter-spacing-${LETTER_SPACING_STEPS[letterSpacingIndex]}`);
    bodyClassList.remove(...bodyClassList.value.match(/line-height-\d+/) || []);
    bodyClassList.add(`line-height-${LINE_SPACING_STEPS[lineSpacingIndex]}`);
  }, [fontSizeIndex, fontWeight, fontFamily, letterSpacingIndex, lineSpacingIndex, isReadMode]);

  // reset all 
  const resetAllSettings = () => {
    setFontSizeIndex(DEFAULT_VALUES.fontSizeIndex);
    setFontWeight(DEFAULT_VALUES.fontWeight);
    setContentWidth(DEFAULT_VALUES.contentWidth);
    setTextAlignment(DEFAULT_VALUES.textAlignment);
    setWordSpacingIndex(DEFAULT_VALUES.wordSpacingIndex);
    setLetterSpacingIndex(DEFAULT_VALUES.letterSpacingIndex);
    setLineSpacingIndex(DEFAULT_VALUES.lineSpacingIndex);
    setFontFamily('sans-serif');

    // Apply the default classes and styles
    const bodyClassList = document.body.classList;
    bodyClassList.remove(...FONT_SIZE_CLASSES.map(cls => `${cls}`));
    bodyClassList.add(FONT_SIZE_CLASSES[DEFAULT_VALUES.fontSizeIndex]);

    bodyClassList.remove(...Object.values(FONT_WEIGHTS).map(weight => `font-weight-${weight}`));
    bodyClassList.add(`font-weight-${DEFAULT_VALUES.fontWeight}`);

    bodyClassList.remove(...FONT_FAMILIES.map(family => `font-family-${family}`));
    bodyClassList.add(`font-family-${DEFAULT_VALUES.fontFamily}`); // Ensure default font family

    bodyClassList.remove(...bodyClassList.value.match(/letter-spacing-\d+/) || []);
    bodyClassList.add(`letter-spacing-${LETTER_SPACING_STEPS[DEFAULT_VALUES.letterSpacingIndex]}`);

    bodyClassList.remove(...bodyClassList.value.match(/line-height-\d+/) || []);
    bodyClassList.add(`line-height-${LINE_SPACING_STEPS[DEFAULT_VALUES.lineSpacingIndex]}`);

    document.documentElement.style.setProperty('--read-mode-content-width', `${DEFAULT_VALUES.contentWidth}vw`);

    // Update the changes state
    setHasChanges(false);
  };

  //reset button appear if changes occured
  const checkForChanges = () => {
    setHasChanges(
      fontSizeIndex !== DEFAULT_VALUES.fontSizeIndex ||
      fontWeight !== DEFAULT_VALUES.fontWeight ||
      contentWidth !== DEFAULT_VALUES.contentWidth ||
      textAlignment !== DEFAULT_VALUES.textAlignment ||
      wordSpacingIndex !== DEFAULT_VALUES.wordSpacingIndex ||
      letterSpacingIndex !== DEFAULT_VALUES.letterSpacingIndex ||
      lineSpacingIndex !== DEFAULT_VALUES.lineSpacingIndex
    );
  };

  // Using useEffect to check for changes whenever settings are updated
  useEffect(() => {
    checkForChanges();
  }, [fontSizeIndex, fontWeight, contentWidth, textAlignment, wordSpacingIndex, letterSpacingIndex, lineSpacingIndex]);

  const handleMenuToggle = (menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const toggleThemeMenu = () => handleMenuToggle('theme');
  const toggleContentAdjustment = () => handleMenuToggle('content');

  const handleAdvancedToggle = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleFontSizeChange = (e) => {
    setFontSizeIndex(Number(e.target.value));
  };

  const handleFontWeightChange = (e) => {
    const newWeight = e.target.value;
    setFontWeight(newWeight);
  };

  const handleTextAlignmentChange = (alignment) => {
    setTextAlignment(alignment);
    document.body.classList.remove('text-align-left', 'text-align-center', 'text-align-right', 'text-align-justify');
    document.body.classList.add(`text-align-${alignment}`);
  };

  const handleWordSpacingChange = (e) => {
    const newIndex = Number(e.target.value);
    setWordSpacingIndex(newIndex);
    document.body.classList.remove('word-spacing-0', 'word-spacing-2', 'word-spacing-4', 'word-spacing-6', 'word-spacing-8');
    document.body.classList.add(`word-spacing-${WORD_SPACING_STEPS[newIndex]}`);
  };

  const handleLetterSpacingChange = (e) => {
    const newIndex = Number(e.target.value);
    setLetterSpacingIndex(newIndex);
    document.body.classList.remove('letter-spacing-0', 'letter-spacing-1', 'letter-spacing-2', 'letter-spacing-3', 'letter-spacing-4');
    document.body.classList.add(`letter-spacing-${LETTER_SPACING_STEPS[newIndex]}`);
  };

  const handleLineSpacingChange = (e) => {
    const newIndex = Number(e.target.value);
    setLineSpacingIndex(newIndex);
    document.body.classList.remove('line-height-1', 'line-height-1-5', 'line-height-1-8', 'line-height-2', 'line-height-2-5');
    document.body.classList.add(`line-height-${LINE_SPACING_STEPS[newIndex]}`);
  };

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setContentWidth(newWidth);
    document.documentElement.style.setProperty('--read-mode-content-width', `${newWidth}vw`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (readerToolbarRef.current && !readerToolbarRef.current.contains(event.target)) {
        setActiveMenu(null); // Close all menus when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (activeMenu === 'content') {
      console.log('Generating ticks for content menu...');
      // generateTicks('font-size-slider', FONT_SIZE_CLASSES.length, FONT_SIZE_CLASSES.map(f => f.replace('font-size-', '')));
      // generateTicks('word-spacing-slider', WORD_SPACING_STEPS.length, WORD_SPACING_STEPS);
      generateTicks('font-size-slider', FONT_SIZE_CLASSES.length);
      generateTicks('word-spacing-slider', WORD_SPACING_STEPS.length);
      generateTicks('letter-spacing-slider', LETTER_SPACING_STEPS.length);
      // generateTicks('width-slider', 46, Array.from({ length: 46 }, (_, i) => i + 30 + '%'));
      generateTicks('line-spacing-slider', LINE_SPACING_STEPS.length);
    }
  }, [activeMenu]);



  return (
    isReadMode && (
      <div className="reader-toolbar" ref={readerToolbarRef} onClick={closeAccessibilityMenu}>


        <button
          onClick={toggleContentAdjustment}
          aria-label="Font"
          className={activeMenu === 'content' ? 'active' : ''}
        >
          <IoText />
        </button>

        <button
          onClick={toggleThemeMenu}
          aria-label="Theme"
          className={activeMenu === 'theme' ? 'active' : ''}
        >
          <IoIosColorPalette />
        </button>

        <button onClick={onClose} aria-label="Close Reader View">
          <IoClose />
        </button>

        {activeMenu === 'content' && (

          <div className="content-adjustment-menu">
            <div className='heading'>
              <div className="reader-toolbar-heading">Text</div>
              {hasChanges && (
                <button
                  onClick={resetAllSettings}
                  aria-label="Reset All Settings"
                  className="reset-button"
                >
                  <div className="button-text">Reset All</div>
                </button>
              )}
            </div>

            {/* <h2 className='mb-4'>Text</h2> */}

            <div className="reader-toolbar-text">Text Size</div>
            <div className="slider-wrapper mt-4 mb-7">
              <MdOutlineTextFields size={32} />
              <div className="slider-adjustment">
                <input
                  id="font-size-slider"
                  type="range"
                  min="0"
                  max={FONT_SIZE_CLASSES.length - 1}
                  step="1"
                  value={fontSizeIndex}
                  onChange={handleFontSizeChange}
                  aria-label="Font Size"
                  className="slider"
                />
                <div className="ticks-container" id="font-size-slider-ticks"></div>
              </div>
            </div>

            <div className="content-adjustment-option">
              <div>
                <div className="reader-toolbar-text">Font Family</div>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  aria-label="Font Family"
                >
                  {FONT_FAMILIES.map((family) => (
                    <option key={family} value={family}>
                      {family.charAt(0).toUpperCase() + family.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="reader-toolbar-text">Font Weight</div>
                {/* <div className="content-adjustment-option"> */}
                <select value={fontWeight} onChange={handleFontWeightChange}>
                  <option value={FONT_WEIGHTS.default}>Default</option>
                  <option value={FONT_WEIGHTS.regular}>Regular</option>
                  <option value={FONT_WEIGHTS.bold}>Bold</option>
                  <option value={FONT_WEIGHTS.bolder}>Bolder</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="reader-toolbar-heading">Advanced</div>
              <button
                onClick={handleAdvancedToggle}
                className={`advanced-toggle-button ${showAdvanced ? 'active' : ''}`}
              >
                {showAdvanced ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>
            </div>
            {showAdvanced && (
              <>
                <div className="reader-toolbar-text">Word Spacing</div>
                <div className="slider-wrapper mt-4 mb-7">
                  <MdOutlineSpaceBar size={32} />
                  <div className="slider-adjustment">
                    <input
                      id="word-spacing-slider"
                      type="range"
                      min="0"
                      max={WORD_SPACING_STEPS.length - 1}
                      value={wordSpacingIndex}
                      onChange={handleWordSpacingChange}
                      className="slider"
                    />
                    <div className="ticks-container" id="word-spacing-slider-ticks"></div>
                    {/* <span>{WORD_SPACING_STEPS[wordSpacingIndex]}px</span> */}
                  </div>
                </div>

                <div className="reader-toolbar-text">Character Spacing</div>
                <div className="slider-wrapper mt-4 mb-7">
                  <CgFontSpacing size={32} />
                  <div className="slider-adjustment">
                    <input
                      id="letter-spacing-slider"
                      type="range"
                      min="0"
                      max={LETTER_SPACING_STEPS.length - 1}
                      value={letterSpacingIndex}
                      onChange={handleLetterSpacingChange}
                      className="slider"
                    />
                    <div className="ticks-container" id="letter-spacing-slider-ticks"></div>
                    {/* <span>{LETTER_SPACING_STEPS[letterSpacingIndex]}px</span> */}
                  </div>
                </div>
              </>
            )}

            <div className="horizontal-line-container">
              <div className="horizontal-line"></div>
            </div>
            <div className="reader-toolbar-heading mt-4 mb-4">Layout</div>

            <div className="reader-toolbar-text">Content Width</div>
            <div className="slider-wrapper mt-4 mb-7">
              <AiOutlineColumnWidth size={32} />
              <div className="slider-adjustment">
                <input
                  id="width-slider"
                  type="range"
                  min="30"
                  max="75"
                  value={contentWidth}
                  onChange={handleWidthChange}
                  className="slider"
                />
                {/* <div className="ticks-container" id="width-slider-ticks"></div> */}
                {/* <span>{contentWidth}%</span> */}
              </div>
            </div>

            <div className="reader-toolbar-text">Line Spacing</div>
            <div className="slider-wrapper mt-4 mb-7">
              <TbLineHeight size={32} />
              <div className="slider-adjustment">
                <input
                  id="line-spacing-slider"
                  type="range"
                  min="0"
                  max={LINE_SPACING_STEPS.length - 1}
                  value={lineSpacingIndex}
                  onChange={handleLineSpacingChange}
                  className="slider"
                />
                <div className="ticks-container" id="line-spacing-slider-ticks"></div>
                {/* <span>{LINE_SPACING_STEPS[lineSpacingIndex]}</span> */}
              </div>
            </div>

            <div className="reader-toolbar-text">Text Alignment</div>
            <div className="content-adjustment-option">
              {TEXT_ALIGNMENTS.map(alignment => (
                <button
                  key={alignment}
                  onClick={() => handleTextAlignmentChange(alignment)}
                  className={textAlignment === alignment ? 'active' : ''}
                  aria-label={`Align Text ${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`}
                >
                  {alignment === 'left' && <PiTextAlignLeftBold />}
                  {alignment === 'center' && <PiTextAlignCenterBold />}
                  {alignment === 'right' && <PiTextAlignRightBold />}
                  {alignment === 'justify' && <PiTextAlignJustifyBold />}
                </button>
              ))}
            </div>

          </div>
        )}

        {
          activeMenu === 'theme' && (
            <div className="theme-menu">
              <button
                onClick={() => onChangeTheme('light-theme')}
                className={`light-button ${currentTheme === 'light-theme' ? 'active' : ''}`}
                aria-label="Light Mode"
              >
                Light
              </button>
              <button
                onClick={() => onChangeTheme('dark-theme')}
                className={`dark-button ${currentTheme === 'dark-theme' ? 'active' : ''}`}
                aria-label="Dark Mode"
              >
                Dark
              </button>
              <button
                onClick={() => onChangeTheme('sepia-theme')}
                className={`sepia-button ${currentTheme === 'sepia-theme' ? 'active' : ''}`}
                aria-label="Sepia Mode"
              >
                Sepia
              </button>
              <button
                onClick={() => onChangeTheme('contrast-theme')}
                className={`contrast-button ${currentTheme === 'contrast-theme' ? 'active' : ''}`}
                aria-label="Contrast Mode"
              >
                Contrast
              </button>
            </div >
          )}
      </div >
    )
  );
};

export default ReaderToolbar;
