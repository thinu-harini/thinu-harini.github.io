import React, { useState, useEffect } from 'react';
import '../assets/styles/ScrollButton.css';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { motion } from "framer-motion";
import { FaAnglesUp } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { RiArrowDownDoubleLine, RiArrowUpDoubleLine } from 'react-icons/ri';

const ScrollButton = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // Calculate scroll percentage
    const scrollTotal = docHeight - winHeight;
    const scrollPercent = (scrollTop / scrollTotal) * 100;

    // Update state based on scroll position
    setScrollPercent(scrollPercent);
    setShowScrollToTop(scrollTop > 100);
  };

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 600);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Clean up event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className={`scroll-button-container ${showScrollToTop ? 'show' : ''}`}>
      <div
        className="scroll-button-progress"
        style={{ '--scroll-percent': `${scrollPercent}%` }} // Pass scrollPercent as CSS variable
      />
      <button
        className="scroll-button"
        onClick={scrollToTop}
      >
        {showScrollToTop ?
          <div>
            {isSmallScreen ? (
              <RiArrowUpDoubleLine className='scroll-button-icon' />
            ) : (
              <div className="w-[35px] h-[74px] flex justify-center items-start p-2">
                <motion.div
                  animate={{
                    y: [16, 0, 16],
                    opacity: [1, 0, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut'
                  }}
                >
                  <GoDotFill className='scroll-button-icon' />
                </motion.div>
              </div>
            )}
          </div>
          :
          <div>
            {isSmallScreen ? (
              <RiArrowDownDoubleLine className='scroll-button-icon' />
            ) : (
              <div className="w-[35px] h-[74px] flex justify-center items-start p-2">
                <motion.div
                  animate={{
                    y: [0, 16],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut'
                  }}
                >
                  <GoDotFill className='scroll-button-icon' />
                </motion.div>
              </div>
            )}

          </div>
        }
      </button>
    </div>
  );
};

export default ScrollButton;
