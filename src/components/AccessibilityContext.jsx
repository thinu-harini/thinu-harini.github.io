import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);
  const [isBigCursor, setIsBigCursor] = useState(false); // New state for big cursor

  const [synth, setSynth] = useState(window.speechSynthesis);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [isReading, setIsReading] = useState(false); // Track reading status
  const [rate, setRate] = useState(1); // Default rate
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [textToRead, setTextToRead] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isScreenReaderExpanded, setIsScreenReaderExpanded] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const location = useLocation();

  const [isDesaturated, setIsDesaturated] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

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

  // Toggle desaturation
  const toggleDesaturation = () => {
    setIsDesaturated(prev => !prev);
  };

  // Apply desaturation style conditionally
  useEffect(() => {
    if (isDesaturated) {
      document.body.classList.add('desaturated');
    } else {
      document.body.classList.remove('desaturated');
    }
  }, [isDesaturated]);

  //highlight links
  // Toggle link highlighting
  const toggleHighlightLinks = () => {
    setHighlightLinks(prev => !prev);
  };

  // Apply link highlighting
  useEffect(() => {
    const links = document.querySelectorAll('a');
    if (highlightLinks) {
      links.forEach(link => link.classList.add('highlight-link'));
    } else {
      links.forEach(link => link.classList.remove('highlight-link'));
    }
  }, [highlightLinks]);

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
      isDesaturated,
      toggleDesaturation,
      highlightLinks,
      toggleHighlightLinks,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
