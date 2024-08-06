import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import { SplashAnimation } from './SplashAnimation';
import { styles } from '../styles';

const SplashScreen = ({ setLoading }) => {
  const [theme, setTheme] = useState('light');
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Simulate an asynchronous operation
    const fetchData = async () => {
      // Simulate a delay 
      await new Promise((resolve) => setTimeout(resolve, 2400));
      setLoading(false); // Set loading to false when data is ready
    };

    fetchData();
  }, [setLoading]);

  useEffect(() => {
    // Check the theme and update the background color accordingly
    const updateBackgroundColor = () => {
      const body = document.querySelector('body');
      body.style.setProperty('--splash-screen-bg-color', getBackgroundColor());
    };

    // Function to determine the background color based on the theme
    const getBackgroundColor = () => {
      return theme === 'dark' ? '#171A2C' : '#ffffff';
    };

    // Initial update
    updateBackgroundColor();

    // Event listener for theme changes
    const themeChangeHandler = () => {
      setTheme(localStorage.theme); // Update the local state with the current theme
      updateBackgroundColor();
    };

    document.addEventListener('themeChange', themeChangeHandler);

    // Cleanup
    return () => {
      document.removeEventListener('themeChange', themeChangeHandler);
    };
  }, [theme]);

  // dots animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        switch (prev) {
          case '':
            return '.';
          case '.':
            return '..';
          case '..':
            return '...';
          case '...':
            return '';
          default:
            return '.';
        }
      });
    }, 500);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="splash-screen">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SplashAnimation />
        <div style={{ margin: '10px 0' }}></div>
        <p className={`${styles.splashScreenText}`}>
          Loading{dots}
        </p>
      </div>
    </div>
  );
};

SplashScreen.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default SplashScreen;