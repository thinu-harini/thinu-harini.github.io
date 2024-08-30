import React, { useState, useEffect } from 'react';
import '../assets/styles/ReaderToolbar.css';
import { useAccessibility } from './AccessibilityContext';
import { IoIosColorPalette } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import { TiMinus } from 'react-icons/ti';
import { IoClose, IoText } from 'react-icons/io5';
import { PiTextAlignCenterBold, PiTextAlignJustifyBold, PiTextAlignLeftBold, PiTextAlignRightBold } from 'react-icons/pi';
import { RiAddFill, RiSubtractFill } from 'react-icons/ri';

const FONT_SIZE_STEPS = [14, 18, 22];
const FONT_WEIGHTS = { regular: 400, bold: 700 };
const FONT_FAMILIES = ['sans-serif', 'serif', 'monospace'];
const TEXT_ALIGNMENTS = ['left', 'center', 'right', 'justify'];
const WORD_SPACING_STEPS = [0, 2, 4, 6, 8]; // Define your word spacing steps
const LETTER_SPACING_STEPS = [0, 1, 2, 3, 4]; // Define your letter spacing steps
const LINE_SPACING_STEPS = [1, 2, 3, 4, 5]; // line height values

const ReaderToolbar = ({ isReadMode, onClose, currentTheme, onChangeTheme }) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isContentAdjustmentOpen, setIsContentAdjustmentOpen] = useState(false);

  const [fontSizeIndex, setFontSizeIndex] = useState(1);
  const [fontWeight, setFontWeight] = useState(FONT_WEIGHTS.regular);
  const [contentWidth, setContentWidth] = useState(100);
  const [textAlignment, setTextAlignment] = useState('left');
  const [wordSpacingIndex, setWordSpacingIndex] = useState(0); // Default index
  const [letterSpacingIndex, setLetterSpacingIndex] = useState(0); // Default index
  const [lineSpacingIndex, setLineSpacingIndex] = useState(1); // Default line height

  const { currentFont, changeFont, isDyslexiaFont, toggleDyslexiaFont } = useAccessibility();

  useEffect(() => {
    if (!isReadMode) return;

    const bodyClassList = document.body.classList;
    bodyClassList.remove('font-size-14', 'font-size-18', 'font-size-22');
    bodyClassList.add(`font-size-${FONT_SIZE_STEPS[fontSizeIndex]}`);
    bodyClassList.remove(...bodyClassList.value.match(/font-weight-\d+/) || []);
    bodyClassList.add(`font-weight-${fontWeight}`);
    bodyClassList.remove(...bodyClassList.value.match(/letter-spacing-\d+/) || []);
    bodyClassList.add(`letter-spacing-${LETTER_SPACING_STEPS[letterSpacingIndex]}`);
    bodyClassList.remove(...bodyClassList.value.match(/line-height-\d+/) || []);
    bodyClassList.add(`line-height-${LINE_SPACING_STEPS[lineSpacingIndex]}`);
  }, [fontSizeIndex, fontWeight, letterSpacingIndex, lineSpacingIndex, isReadMode]);

  const toggleThemeMenu = () => setIsThemeMenuOpen(!isThemeMenuOpen);
  const toggleContentAdjustment = () => setIsContentAdjustmentOpen(!isContentAdjustmentOpen);

  const increaseTextSize = () => {
    setFontSizeIndex(prevIndex => Math.min(prevIndex + 1, FONT_SIZE_STEPS.length - 1));
  };

  const decreaseTextSize = () => {
    setFontSizeIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const resetTextSize = () => setFontSizeIndex(1);

  const handleFontWeightChange = (e) => {
    const newWeightLabel = e.target.value;
    const newWeight = FONT_WEIGHTS[newWeightLabel];
    setFontWeight(newWeight);
    document.body.classList.remove(...document.body.classList.value.match(/font-weight-\d+/) || []);
    document.body.classList.add(`font-weight-${newWeight}`);
  };

  const handleFontFamilyChange = (e) => {
    const newFont = e.target.value;
    changeFont(newFont);
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

  return (
    isReadMode && (
      <div className="reader-toolbar">
        <button onClick={onClose} aria-label="Close Reader View">
          <IoClose />
        </button>

        <button
          onClick={toggleContentAdjustment}
          aria-label="Font"
          className={isContentAdjustmentOpen ? 'active' : ''}
        >
          <IoText />
        </button>

        {isContentAdjustmentOpen && (
          <div className="content-adjustment-menu">
            <h2 className='mb-2'>Text</h2>
            <p className='mt-2'>Text Size</p>
            <div className="content-adjustment-option">
              <button
                onClick={increaseTextSize}
                aria-label="Increase Text Size"
              >
                <RiAddFill />
              </button>

              <button
                onClick={decreaseTextSize}
                aria-label="Decrease Text Size"
              >
                <RiSubtractFill />
              </button>

              <button
                onClick={resetTextSize}
                aria-label="Reset Text Size"
              >
                <div className="button-text">Reset</div>
              </button>
            </div>

            <div className="content-adjustment-option">
              <div className='mt-2'>
                <p>Font Family</p>
                <select
                  value={currentFont}
                  onChange={handleFontFamilyChange}
                  aria-label="Font Family"
                >
                  {FONT_FAMILIES.map(font => (
                    <option key={font} value={font}>
                      {font.charAt(0).toUpperCase() + font.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-2'>
                <p>Font Weight</p>
                {/* <div className="content-adjustment-option"> */}
                <select
                  value={Object.keys(FONT_WEIGHTS).find(key => FONT_WEIGHTS[key] === fontWeight)}
                  onChange={handleFontWeightChange}
                  aria-label="Font Weight"
                >
                  <option value="regular">Regular</option>
                  <option value="bold">Bold</option>
                </select>

                {/* <button
                onClick={() => changeFontWeight(0)}
                className={fontWeightIndex === 0 ? 'active' : ''}
                aria-label="Font Weight 400"
              >
                <div className="button-text">Regular</div>
              </button>
              <button
                onClick={() => changeFontWeight(1)}
                className={fontWeightIndex === 1 ? 'active' : ''}
                aria-label="Font Weight 700"
              >
                <div className="button-text">Bold</div>
              </button> */}

              </div>
            </div>

            <div>
              <button
                onClick={toggleDyslexiaFont}
                className={isDyslexiaFont ? 'active' : ''}
                aria-label="Dyslexia Font"
              >
                {isDyslexiaFont ?
                  <p>Dyslexia On</p>
                  :
                  <p>Dyslexia Off</p>
                }
              </button>
            </div>

            <h2 className='mt-4 mb-2'>Advanced</h2>
            {/* <p>Word Spacing</p> */}
            <div className="width-adjustment">
              <label htmlFor="width-adjustment-slider"><p>Word Spacing:</p></label>
              <input
                id="word-spacing-slider"
                type="range"
                min="0"
                max={WORD_SPACING_STEPS.length - 1}
                value={wordSpacingIndex}
                onChange={handleWordSpacingChange}
              />
              <span>{WORD_SPACING_STEPS[wordSpacingIndex]}px</span>
            </div>

            {/* <p>Character Spacing</p> */}
            <div className="width-adjustment">
              <label htmlFor="width-adjustment-slider"><p>Character Spacing:</p></label>
              <input
                id="letter-spacing-slider"
                type="range"
                min="0"
                max={LETTER_SPACING_STEPS.length - 1}
                value={letterSpacingIndex}
                onChange={handleLetterSpacingChange}
              />
              <span>{LETTER_SPACING_STEPS[letterSpacingIndex]}px</span>
            </div>

            <h2 className='mt-4 mb-2'>Layout</h2>

            <p>Text Alignment</p>
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

            {/* <p>Content Width</p> */}
            <div className="width-adjustment">
              <label htmlFor="width-slider"><p>Content Width:</p></label>
              <input
                id="width-slider"
                type="range"
                min="30"
                max="75"
                value={contentWidth}
                onChange={handleWidthChange}
              />
              {/* <span>{contentWidth}%</span> */}
            </div>

            {/* <p>Line Spacing</p> */}
            <div className="width-adjustment">
              <label htmlFor="width-slider"><p>Line Spacing:</p></label>
              <input
                id="line-spacing-slider"
                type="range"
                min="0"
                max={LINE_SPACING_STEPS.length - 1}
                value={lineSpacingIndex}
                onChange={handleLineSpacingChange}
              />
              <span>{LINE_SPACING_STEPS[lineSpacingIndex]}</span>
            </div>
          </div>
        )}

        <button
          onClick={toggleThemeMenu}
          aria-label="Theme"
          className={isThemeMenuOpen ? 'active' : ''}
        >
          <IoIosColorPalette />
        </button>
        {isThemeMenuOpen && (
          <div className="theme-menu">
            <button
              onClick={() => onChangeTheme('light-theme')}
              className={currentTheme === 'light-theme' ? 'active' : ''}
              aria-label="Light Mode"
            >
              <div className="button-text">Light Mode</div>
            </button>
            <button
              onClick={() => onChangeTheme('dark-theme')}
              className={currentTheme === 'dark-theme' ? 'active' : ''}
              aria-label="Dark Mode"
            >
              <div className="button-text">Dark Mode</div>
            </button>
            <button
              onClick={() => onChangeTheme('sepia-theme')}
              className={currentTheme === 'sepia-theme' ? 'active' : ''}
              aria-label="Sepia Mode"
            >
              <div className="button-text">Sepia Mode</div>
            </button>
            <button
              onClick={() => onChangeTheme('contrast-theme')}
              className={currentTheme === 'contrast-theme' ? 'active' : ''}
              aria-label="Contrast Mode"
            >
              <div className="button-text">Contrast Mode</div>
            </button>
          </div>
        )}
      </div >
    )
  );
};

export default ReaderToolbar;
