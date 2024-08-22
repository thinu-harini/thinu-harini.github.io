import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);
  const [isBigCursor, setIsBigCursor] = useState(false);

  const [synth, setSynth] = useState(window.speechSynthesis);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [isReading, setIsReading] = useState(false); // Track reading status
  const [rate, setRate] = useState(1); // Default rate
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [textToRead, setTextToRead] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isScreenReaderExpanded, setIsScreenReaderExpanded] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [highlightLinks, setHighlightLinks] = useState(false);

  const [areImagesHidden, setAreImagesHidden] = useState(false);
  const [isReadingGuideEnabled, setIsReadingGuideEnabled] = useState(false);
  const [guidePosition, setGuidePosition] = useState({ top: 0, left: 0 });
  const [isReadingMaskEnabled, setIsReadingMaskEnabled] = useState(false);
  const [maskDimensions, setMaskDimensions] = useState({ x: 0, y: 0, width: 300, height: 200 });

  const [contrastTheme, setContrastTheme] = useState('default');
  const [previousThemes, setPreviousThemes] = useState({ isDark: false, contrastTheme: 'default' });
  const [isReadMode, setIsReadMode] = useState(false);

  const location = useLocation();

  const [isDark, setIsDark] = useLocalStorage('isDark', window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleDyslexiaFont = () => {
    setIsDyslexiaFont(prev => !prev);
  };

  const toggleBigCursor = () => {
    setIsBigCursor(prev => !prev);
  };


  // Screen Reader

  // Helper function to get text excluding specific elements
  const getFilteredText = () => {
    const bodyText = document.body.innerText;
    const excludedElements = ['navbar', 'footer', 'nav-menu', 'accessibility-menu'];

    let filteredText = bodyText;

    excludedElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const elementText = element.innerText;
        filteredText = filteredText.replace(elementText, '');
      }
    });

    return filteredText;
  };

  const announceMessage = (message) => {
    if (synth) {
      const announcement = new SpeechSynthesisUtterance(message);
      announcement.rate = rate; // Use the current rate
      announcement.voice = selectedVoice;
      synth.speak(announcement);
    }
  };

  const startReading = (text, rateOverride = 1) => {
    if (synth) {
      if (!isReading) {
        announceMessage('Screen Reader Enabled. You can click on the area you want to be read');
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rateOverride;
      utterance.voice = selectedVoice;
      utterance.onend = () => setIsReading(false);
      synth.speak(utterance);
      setCurrentUtterance(utterance);
      setTextToRead(text);
      setIsReading(true);
      setIsPaused(false);
    }
  };

  const stopReading = () => {
    if (synth) {
      synth.cancel();
      setCurrentUtterance(null);
      setIsReading(false);
      setIsPaused(false);
      clearHighlight();
    }
  };

  const togglePauseResume = () => {
    if (isReading) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
    }
  };

  const adjustRate = (newRate) => {
    setRate(newRate);
    if (synth.speaking) {
      synth.cancel();
      const text = getFilteredText();
      announceMessage('Playback rate adjusted.');
      startReading(text, newRate); // Directly restart reading
    } else {
      announceMessage('Playback rate adjusted.');
    }
  };

  const startReadingFromElement = (elementId) => {
    if (!isReading) {
      return;
    }
    clearHighlight(); // Clear previous highlights
    highlightElement(elementId); // Highlight the new element
    if (synth) {
      const element = document.getElementById(elementId);
      if (element) {
        const text = element.innerText;
        if (currentUtterance) synth.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        synth.speak(utterance);
        setCurrentUtterance(utterance);
        setIsReading(true);
      }
    }
  };

  // highlight option
  const highlightElement = (elementId) => {
    if (highlightEnabled) {
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.add('highlight');
      }
    }
  };

  const clearHighlight = () => {
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(el => el.classList.remove('highlight'));
  };

  const getVoices = () => {
    return synth.getVoices();
  };

  const setVoice = (voice) => {
    if (voice && synth) {
      if (currentUtterance) {
        synth.cancel(); // Cancel current speech
      }
      const utterance = new SpeechSynthesisUtterance(textToRead); // Use the current text
      utterance.voice = voice;
      utterance.rate = rate; // Apply the current rate
      utterance.onend = () => setIsReading(false);
      synth.speak(utterance);
      setCurrentUtterance(utterance);
    }
  };

  //Toggle reading
  const toggleReading = () => {
    if (isReading) {
      stopReading(); // Stop reading
    } else {
      startReading(getFilteredText()); // Start reading
    }
  };

  // Toggle Highlight
  const toggleHighlight = () => {
    setHighlightEnabled(prev => !prev);
    if (!highlightEnabled) {
      clearHighlight(); // Ensure highlight is cleared if turning off
    }
  };

  // Cleanup on component unmount or when navigating away
  useEffect(() => {
    stopReading();
    setIsScreenReaderExpanded(false);
  }, [location]);

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
      // Save the current themes and dark mode state
      setPreviousThemes({
        isDark,
        contrastTheme,
      });

      // Remove all current themes and dark mode
      document.body.classList.remove('dark', 'light-theme', 'sepia-theme', 'contrast-theme');
      setIsDark(false); // Disable dark mode
      setContrastTheme('default'); // Reset contrast theme

      // Apply read mode specific themes
      document.body.classList.add('read-mode', 'dark-theme'); // Apply read mode theme
    } else {
      // Remove read mode specific themes
      document.body.classList.remove('read-mode', 'dark-theme', 'light-theme', 'sepia-theme', 'contrast-theme');

      // Restore previous themes and dark mode state
      if (previousThemes.isDark) {
        document.body.classList.add('dark');
        setIsDark(true);
      }
      if (previousThemes.contrastTheme && previousThemes.contrastTheme !== 'default') {
        document.body.classList.add(previousThemes.contrastTheme);
        setContrastTheme(previousThemes.contrastTheme);
      } else {
        setContrastTheme('default'); // Reset to default if not set
      }
    }
  }, [isReadMode]);

  const toggleReadMode = () => setIsReadMode(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{
      isDyslexiaFont,
      toggleDyslexiaFont,
      isBigCursor,
      toggleBigCursor,
      isReading,
      toggleReading,
      isPaused,
      togglePauseResume,
      rate,
      adjustRate,
      startReadingFromElement,
      toggleHighlight,
      highlightEnabled,
      setVoice,
      getVoices,
      setIsScreenReaderExpanded,
      highlightLinks,
      toggleHighlightLinks,
      isDark,
      toggleDarkMode,
      contrastTheme,
      toggleContrastTheme,
      resetContrastTheme,
      handleContrastToggle,
      handleResetContrast,
      areImagesHidden,
      toggleHideImages,
      isReadingGuideEnabled,
      toggleReadingGuide,
      guidePosition,
      updateGuidePosition,
      isReadingMaskEnabled,
      toggleReadingMask,
      maskDimensions,
      updateMaskDimensions,
      isReadMode,
      toggleReadMode,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
