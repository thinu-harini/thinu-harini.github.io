import React, { useState } from 'react';
import { IoIosColorPalette } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { styles } from '../styles';

const ReaderToolbar = ({ onClose, currentTheme, onChangeTheme }) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const toggleThemeMenu = () => setIsThemeMenuOpen(!isThemeMenuOpen);

  return (
    <div className="reader-toolbar">
      <button onClick={onClose} aria-label="Close Reader View">
        <IoClose />
      </button>

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
    </div>
  );
};

export default ReaderToolbar;

