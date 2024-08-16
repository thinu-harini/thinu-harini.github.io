import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level (1 = 100%)
  const [isBigCursor, setIsBigCursor] = useState(false); // New state for big cursor

  const [synth, setSynth] = useState(window.speechSynthesis);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [isReading, setIsReading] = useState(false); // Track reading status
  const [rate, setRate] = useState(1); // Default rate

  const location = useLocation();

  const toggleDyslexiaFont = () => {
    setIsDyslexiaFont(prev => !prev);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5)); // Max zoom level (150%)
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5)); // Min zoom level (50%)
  };

  const toggleBigCursor = () => {
    setIsBigCursor(prev => !prev);
  };


  // Screen Reader

  // Helper function to get text excluding specific elements
  const getFilteredText = () => {
    // Get the filtered text excluding specific elements
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


  // const startReading = (text, rateOverride = rate) => {
  //   if (synth) {
  //     const utterance = new SpeechSynthesisUtterance(text);
  //     utterance.rate = rateOverride; // Use the provided rate or default rate
  //     setCurrentUtterance(utterance);
  //     synth.speak(utterance);
  //     setIsReading(true); // Set reading status
  //   }
  // };

  const startReading = (text, rateOverride = rate) => {
    if (synth) {
      // First, announce
      const activationMessage = new SpeechSynthesisUtterance('Screen Reader Enabled');
      activationMessage.rate = rateOverride;

      // Create a new utterance for the main content
      const mainUtterance = new SpeechSynthesisUtterance(text);
      mainUtterance.rate = rateOverride; // Use the provided rate or default rate

      // Queue the activation message and then the main content
      synth.speak(activationMessage);
      activationMessage.onend = () => {
        synth.speak(mainUtterance);
      };

      setCurrentUtterance(mainUtterance); // Set the current utterance to the main content
      setIsReading(true); // Set reading status
    }
  };

  const stopReading = () => {
    if (synth && currentUtterance) {
      synth.cancel();
      setCurrentUtterance(null);
      setIsReading(false); // Set reading status
    }
  };


  // const stopReading = () => {
  //   if (synth) {
  //     // Announce "Screen Reader Disabled" message
  //     const deactivationMessage = new SpeechSynthesisUtterance('Screen Reader Disabled');
  //     deactivationMessage.rate = rate;

  //     // Speak the deactivation message and then cancel the current speech
  //     synth.speak(deactivationMessage);
  //     deactivationMessage.onend = () => {
  //       synth.cancel();
  //       setCurrentUtterance(null);
  //       setIsReading(false);
  //     };
  //   }
  // };

  // Cleanup on component unmount or when navigating away
  useEffect(() => {
    // Stop reading when location changes (i.e., user navigates to a different page)
    stopReading();
  }, [location]);

  // toggle Reading function
  const toggleReading = () => {
    const text = getFilteredText(); // Get the updated filtered text
    if (isReading) {
      stopReading();
    } else {
      startReading(text);
    }
  };

  const increaseSpeed = () => {
    setRate(prev => {
      const newRate = Math.min(prev + 0.5, 2);
      if (isReading) {
        stopReading(); // Stop current speech
        const text = getFilteredText(); // Recalculate text
        startReading(text, newRate); // Restart with updated rate and text
      }
      return newRate;
    });
  };

  const decreaseSpeed = () => {
    setRate(prev => {
      const newRate = Math.max(prev - 0.2, 0.5); // Minimum rate limit
      if (isReading) {
        stopReading(); // Stop current speech
        const text = getFilteredText(); // Recalculate text
        startReading(text, newRate); // Restart with updated rate and text
      }
      return newRate;
    });
  };

  useEffect(() => {
    console.log('Current rate:', rate); // Debugging output
  }, [rate]);

  //Dyslexia friendly
  useEffect(() => {
    if (isDyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [isDyslexiaFont]);

  useEffect(() => {
    document.body.style.zoom = zoomLevel;
  }, [zoomLevel]);

  // Apply big cursor style conditionally
  useEffect(() => {
    if (isBigCursor) {
      document.body.classList.add('big-cursor');
    } else {
      document.body.classList.remove('big-cursor');
    }
  }, [isBigCursor]);

  return (
    <AccessibilityContext.Provider value={{
      isDyslexiaFont,
      toggleDyslexiaFont,
      zoomIn,
      zoomOut,
      isBigCursor,
      toggleBigCursor,
      toggleReading,
      increaseSpeed,
      decreaseSpeed,
      isReading
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
