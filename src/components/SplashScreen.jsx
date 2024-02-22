import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import { SplashAnimation } from './SplashAnimation';

const SplashScreen = ({ setLoading }) => {
  const splashScreenBackgroundColor = '#050816'; // Set your desired background color here

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    const fetchData = async () => {
      // Simulate a delay (replace this with your actual data fetching logic)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false); // Set loading to false when your data is ready
    };

    fetchData();
  }, [setLoading]); // Run the effect when setLoading changes

  return <div className="splash-screen" style={{ backgroundColor: splashScreenBackgroundColor }}>
    <SplashAnimation />
  </div>;
};

SplashScreen.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default SplashScreen;
