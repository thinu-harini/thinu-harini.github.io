import React, { useState } from 'react';
import ReaderToolbar from './ReaderToolbar';
import { useAccessibility } from './AccessibilityContext';

const ReadModeToggle = () => {
  const { isReadMode, toggleReadMode } = useAccessibility();
  const [currentTheme, setCurrentTheme] = useState('sepia-theme');

  const changeTheme = (theme) => {
    // Remove previous theme
    if (currentTheme) {
      document.body.classList.remove(currentTheme);
    }
    // Add new theme
    setCurrentTheme(theme);
    document.body.classList.add(theme);
  };

  return (
    <>
      <button onClick={toggleReadMode} aria-label={isReadMode ? "Exit Read Mode" : "Enter Read Mode"}>
        {isReadMode ? 'Exit Read Mode' : 'Enter Read Mode'}
      </button>
      {isReadMode && (
        <ReaderToolbar
          onClose={toggleReadMode}
          currentTheme={currentTheme}
          onChangeTheme={changeTheme}
        />
      )}
    </>
  );
};

export default ReadModeToggle;
