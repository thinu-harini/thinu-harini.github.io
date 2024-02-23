import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import { SplashAnimation } from './SplashAnimation';

const SplashScreen = ({ setLoading }) => {
  const [theme, setTheme] = useState('light'); // Set your desired background color here

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    const fetchData = async () => {
      // Simulate a delay (replace this with your actual data fetching logic)
      await new Promise((resolve) => setTimeout(resolve, 2400));
      setLoading(false); // Set loading to false when your data is ready
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
      return theme === 'dark' ? '#050816' : '#ffffff';
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

  return (
    <div className="splash-screen">
      <SplashAnimation />
    </div>
  );
};

SplashScreen.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default SplashScreen;