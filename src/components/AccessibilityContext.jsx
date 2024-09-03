import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import '../assets/styles/AccessibilityMenu.css';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [textScale, setTextScale] = useState(1); // Text scaling factor
  const [lineHeightScale, setLineHeightScale] = useState(1); // Line height scaling factor
  const [wordSpacingScale, setWordSpacingScale] = useState(0.1);
  const [charSpacingScale, setCharSpacingScale] = useState(0.1);
  const [textAlign, setTextAlign] = useState('left');
  const [fontFamily, setFontFamily] = useState('Poppins');

  const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);
  const [isBigCursor, setIsBigCursor] = useState(false);

  const [highlightLinks, setHighlightLinks] = useState(false);
  const [areImagesHidden, setAreImagesHidden] = useState(false);
  const [isReadingGuideEnabled, setIsReadingGuideEnabled] = useState(false);
  const [guidePosition, setGuidePosition] = useState({ top: 0, left: 0 });
  const [isReadingMaskEnabled, setIsReadingMaskEnabled] = useState(false);
  const [maskDimensions, setMaskDimensions] = useState({ x: 0, y: 0, width: 300, height: 200 });

  const [contrastTheme, setContrastTheme] = useState('default');
  const [previousThemes, setPreviousThemes] = useState({ isDark: false, contrastTheme: 'default' });
  const [isReadMode, setIsReadMode] = useState(false);
  const [currentFont, setCurrentFont] = useState('sans-serif');

  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);
  const [textElements, setTextElements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [areHighlightsVisible, setAreHighlightsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const utteranceRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isAnimationsPaused, setIsAnimationsPaused] = useState(false);
  const [isDictionaryMode, setIsDictionaryMode] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [isTooltipMode, setIsTooltipMode] = useState(false);

  const location = useLocation();

  const [isDark, setIsDark] = useLocalStorage('isDark', window.matchMedia("(prefers-color-scheme: dark)").matches);

  //screen reader

  // Fetch available voices
  useEffect(() => {
    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setSelectedVoice(voices[0]);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const toggleScreenReader = () => {
    if (isScreenReaderActive) {
      window.speechSynthesis.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      textElements.forEach(el => el.classList.remove('screen-read-highlight'));
    } else {
      setCurrentIndex(0);
      setTextElements(Array.from(document.querySelectorAll('.readable')));
    }
    setIsScreenReaderActive(prev => !prev);
  };

  const togglePauseResume = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    const handlePause = () => setIsPaused(true);
    const handleResume = () => setIsPaused(false);

    window.speechSynthesis.onpause = handlePause;
    window.speechSynthesis.onresume = handleResume;

    return () => {
      window.speechSynthesis.onpause = null;
      window.speechSynthesis.onresume = null;
    };
  }, []);


  const toggleHighlightVisibility = () => {
    setAreHighlightsVisible(prev => !prev);
  };

  const moveToNextElement = () => {
    setCurrentIndex(prev => {
      const newIndex = Math.min(prev + 1, textElements.length - 1);
      if (newIndex !== prev) {
        return newIndex;
      }
      return prev;
    });
  };

  const moveToPreviousElement = () => {
    setCurrentIndex(prev => {
      const newIndex = Math.max(prev - 1, 0);
      if (newIndex !== prev) {
        return newIndex;
      }
      return prev;
    });
  };

  const setSpeechRate = (newRate) => {
    setRate(newRate);
    if (utteranceRef.current) {
      utteranceRef.current.rate = newRate;
    }
  };

  const setVoice = (voice) => {
    setSelectedVoice(voice);
    if (utteranceRef.current) {
      utteranceRef.current.voice = voice;
    }
  };

  const speakText = (index) => {
    if (index >= textElements.length) {
      // Speak the "screen reader ended" announcement after finishing reading all elements
      const endUtterance = new SpeechSynthesisUtterance("Screen reader ended.");
      endUtterance.rate = rate;
      if (selectedVoice) {
        endUtterance.voice = selectedVoice;
      }
      endUtterance.onend = () => {
        // Reset screen reader state after announcement
        setIsScreenReaderActive(false);
      };
      window.speechSynthesis.speak(endUtterance);
      return;
    }

    // Announce when the screen reader starts
    if (index === 0) {
      const startUtterance = new SpeechSynthesisUtterance("Screen reader started.");
      startUtterance.rate = rate;
      if (selectedVoice) {
        startUtterance.voice = selectedVoice;
      }
      window.speechSynthesis.speak(startUtterance);
    }

    const textToRead = textElements[index].innerText;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = rate;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utteranceRef.current = utterance;

    utterance.onstart = () => {
      textElements.forEach((el, i) => {
        if (i === index) {
          if (areHighlightsVisible) {
            el.classList.add('screen-read-highlight');
          } else {
            el.classList.remove('screen-read-highlight');
          }
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          el.classList.remove('screen-read-highlight');
        }
      });
    };

    utterance.onend = () => {
      if (textElements[index]) {
        textElements[index].classList.remove('screen-read-highlight');
      }

      if (isScreenReaderActive && currentIndex < textElements.length - 1) {
        timeoutRef.current = setTimeout(() => moveToNextElement(), 300);
      } else {
        // Ensure the "screen reader ended" announcement is added to the queue
        const endUtterance = new SpeechSynthesisUtterance("Screen reader ended.");
        endUtterance.rate = rate;
        if (selectedVoice) {
          endUtterance.voice = selectedVoice;
        }
        endUtterance.onend = () => {
          // Reset screen reader state after announcement
          setIsScreenReaderActive(false);
        };
        window.speechSynthesis.speak(endUtterance);
      }
    };

    // Resume speech if it was paused
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isScreenReaderActive) {
      speakText(currentIndex);
    } else {
      window.speechSynthesis.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      textElements.forEach(el => el.classList.remove('screen-read-highlight'));
    }

    return () => {
      window.speechSynthesis.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (utteranceRef.current) {
        utteranceRef.current.onend = null;
        utteranceRef.current.onstart = null;
      }
      textElements.forEach(el => el.classList.remove('screen-read-highlight'));
    };
  }, [isScreenReaderActive, currentIndex, rate, selectedVoice]);

  useEffect(() => {
    if (textElements[currentIndex]) {
      textElements[currentIndex].classList.toggle('screen-read-highlight', areHighlightsVisible);
    }
  }, [areHighlightsVisible, textElements, currentIndex]);

  // Stop screen reader on route change
  useEffect(() => {
    if (isScreenReaderActive) {
      window.speechSynthesis.cancel();
      setIsScreenReaderActive(false);
      textElements.forEach(el => el.classList.remove('screen-read-highlight'));
    }
  }, [location]);

  const toggleDyslexiaFont = () => {
    setIsDyslexiaFont(prev => !prev);
  };

  const toggleBigCursor = () => {
    setIsBigCursor(prev => !prev);
  };

  //Dyslexia friendly
  useEffect(() => {
    if (isDyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [isDyslexiaFont]);

  // Apply big cursor style conditionally
  useEffect(() => {
    if (isBigCursor) {
      document.body.classList.add('big-cursor');
    } else {
      document.body.classList.remove('big-cursor');
    }
  }, [isBigCursor]);

  //highlight links

  const toggleHighlightLinks = () => {
    setHighlightLinks(prev => !prev);
  };

  useEffect(() => {
    const links = document.querySelectorAll('a');
    if (highlightLinks) {
      links.forEach(link => link.classList.add('highlight-link'));
    } else {
      links.forEach(link => link.classList.remove('highlight-link'));
    }

    return () => {
      // Cleanup function to ensure highlights are cleared when the component unmounts or when highlightLinks changes
      const highlightedLinks = document.querySelectorAll('.highlight-link');
      highlightedLinks.forEach(link => link.classList.remove('highlight-link'));
    };
  }, [highlightLinks, location]);


  // Contrasts themes

  // Effect to manage dark mode and contrast theme classes
  useEffect(() => {
    // Remove previous theme classes
    document.body.classList.remove('dark', 'high-contrast', 'cyan-on-black', 'yellow-on-black', 'green-on-black');

    // Apply the correct theme
    if (contrastTheme !== 'default') {
      document.body.classList.add(contrastTheme);
      setIsDark(false); // Ensure dark mode is off when a contrast theme is applied
    } else if (isDark) {
      document.body.classList.add('dark');
    }
  }, [isDark, contrastTheme]);

  // Effect to handle contrast themes
  useEffect(() => {
    if (contrastTheme !== 'default') {
      setPreviousThemes({ isDark, contrastTheme });
      setIsDark(false); // Disable dark mode if a contrast theme is applied
    }
  }, [contrastTheme]);

  // Toggle contrast theme function
  const toggleContrastTheme = (theme) => {
    setContrastTheme(theme);
  };

  // Reset contrast theme to none
  const resetContrastTheme = () => {
    setContrastTheme('default');
    if (previousThemes.isDark) {
      setIsDark(true); // Reapply previous dark mode if it was active
    }
  };

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
    if (!isDark) {
      setContrastTheme('default'); // Ensure contrast theme is reset when dark mode is toggled on
    }
  };

  //theme switcher clicked on contrast
  useEffect(() => {
    const handleThemeChangeEvent = () => {
      if (contrastTheme) {
        setContrastTheme('default'); // Disable contrast mode on theme change
      }
    };
    document.addEventListener('themeChange', handleThemeChangeEvent);
    return () => {
      document.removeEventListener('themeChange', handleThemeChangeEvent);
    };
  }, [contrastTheme]);


  // Handle contrast theme button clicks
  const handleContrastToggle = (theme) => {
    toggleContrastTheme(theme);
  };

  // Handle reset contrast button click
  const handleResetContrast = () => {
    resetContrastTheme();
  };

  // Hide images

  useEffect(() => {
    if (areImagesHidden) {
      document.body.classList.add('hide-images');
    } else {
      document.body.classList.remove('hide-images');
    }
  }, [areImagesHidden]);

  // Handler to toggle the "Hide Images" feature
  const toggleHideImages = () => {
    setAreImagesHidden(prev => !prev);
  };

  // Toggle Reading Guide
  const toggleReadingGuide = () => {
    setIsReadingGuideEnabled(prev => !prev);
  };

  // Update guide position
  const updateGuidePosition = (x, y) => {
    setGuidePosition({ top: y, left: x });
  };

  // Reading Mask

  const toggleReadingMask = () => setIsReadingMaskEnabled(prev => !prev);
  const updateMaskDimensions = (dimensions) => setMaskDimensions(dimensions);

  //Read Mode

  useEffect(() => {
    console.log('Read mode changed:', isReadMode);
    console.log('Current themes:', { isDark, contrastTheme });
    console.log('Previous themes:', previousThemes);

    if (isReadMode) {
      setPreviousThemes({ isDark, contrastTheme });

      document.body.classList.remove('dark-theme', 'light-theme', 'sepia-theme', 'contrast-theme');
      setIsDark(false);
      setContrastTheme('default');

      document.body.classList.add('read-mode', 'dark-theme');
      if (isDyslexiaFont) {
        document.body.classList.add('dyslexia-font');
      } else {
        document.body.classList.remove('dyslexia-font');
      }
    } else {
      document.body.classList.remove('read-mode', 'dark-theme', 'light-theme', 'sepia-theme', 'contrast-theme', 'dyslexia-font');

      if (previousThemes.isDark) {
        document.body.classList.add('dark');
        setIsDark(true);
      }
      if (previousThemes.contrastTheme && previousThemes.contrastTheme !== 'default') {
        document.body.classList.add(previousThemes.contrastTheme);
        setContrastTheme(previousThemes.contrastTheme);
      } else {
        setContrastTheme('default');
      }
    }

    document.body.classList.add(currentFont);
  }, [isReadMode, currentFont, isDyslexiaFont]);

  const changeFont = (font) => {
    setCurrentFont(font);
    document.body.classList.remove('sans-serif', 'serif', 'monospace');
    document.body.classList.add(font);
  };

  const toggleReadMode = () => setIsReadMode(prev => !prev);


  const toggleAnimations = () => {
    setIsAnimationsPaused(prev => !prev);
    document.documentElement.style.setProperty('--animations-paused', !isAnimationsPaused ? 'paused' : 'running');
  };

  const toggleDictionaryMode = () => {
    setIsDictionaryMode(prev => {
      if (!prev) {
        // Reset selected word when turning off dictionary mode
        setSelectedWord('');
      }
      return !prev;
    });
    console.log('Dictionary mode toggled:', !isDictionaryMode); // Debugging
  };

  const toggleTooltipMode = () => {
    setIsTooltipMode(prev => !prev);
    console.log('Tooltip mode toggled:', !isTooltipMode); // Debugging
  };

  return (
    <AccessibilityContext.Provider value={{
      textScale, setTextScale,
      lineHeightScale, setLineHeightScale,
      wordSpacingScale, setWordSpacingScale,
      charSpacingScale, setCharSpacingScale,
      textAlign, setTextAlign,
      fontFamily, setFontFamily,

      isScreenReaderActive, toggleScreenReader,
      moveToNextElement,
      moveToPreviousElement,
      areHighlightsVisible, toggleHighlightVisibility,
      isPaused, togglePauseResume,
      setSpeechRate,
      rate,
      setVoice,
      selectedVoice,
      voices: window.speechSynthesis.getVoices(),

      isDyslexiaFont, toggleDyslexiaFont,
      isBigCursor, toggleBigCursor,
      highlightLinks, toggleHighlightLinks,
      isDark, toggleDarkMode,
      contrastTheme, toggleContrastTheme,
      resetContrastTheme,
      handleContrastToggle,
      handleResetContrast,
      areImagesHidden, toggleHideImages,
      isReadingGuideEnabled, toggleReadingGuide,
      guidePosition, updateGuidePosition,
      isReadingMaskEnabled, toggleReadingMask,
      maskDimensions, updateMaskDimensions,

      isReadMode, toggleReadMode,
      currentFont, changeFont,

      isAnimationsPaused, toggleAnimations,
      isDictionaryMode, toggleDictionaryMode,
      selectedWord, setSelectedWord,
      setWord: setSelectedWord,
      isTooltipMode, toggleTooltipMode,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);




