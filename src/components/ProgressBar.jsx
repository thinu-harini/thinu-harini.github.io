import React, { useEffect, useState } from 'react';
import '../assets/styles/ProgressBar.css';

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTotal = scrollHeight - clientHeight;
    const scrollPercent = (scrollTop / scrollTotal) * 100;

    setScrollProgress(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-bar-indicator" style={{ width: `${scrollProgress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
