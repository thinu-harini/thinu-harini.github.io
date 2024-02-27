import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { TbArrowBigUpLinesFilled } from "react-icons/tb";

const ScrollButton = () => {
  const controls = useAnimation();

  const scrollToTop = () => {
    const targetElement = document.getElementById('home');

    if (targetElement) {
      const offset = targetElement.offsetTop;

      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  controls.set({
    background: 'linear-gradient(45deg, #ff8a00, #e52e71)' // Set initial gradient background
  });

  return (
    <div className='absolute z-20 bottom-20 flex justify-center items-center' style={{ left: '50%', transform: 'translateX(-50%)' }}>
      <motion.div
        animate={{
          y: [0, 24, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut'
        }}
        whileHover={{ scale: 1.2 }}
        onClick={scrollToTop}
        style={{
          cursor: 'pointer',
          background: controls // Apply gradient background dynamically
        }}
        onMouseEnter={() => controls.start({ background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)' })} // Change gradient on hover
        onMouseLeave={() => controls.start({ background: 'linear-gradient(45deg, #ff8a00, #e52e71)' })} // Reset gradient on leave
      >
        <TbArrowBigUpLinesFilled size={24} color="#fff" />
      </motion.div>
    </div>
  );
};

export default ScrollButton;
