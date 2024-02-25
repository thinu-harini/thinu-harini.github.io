import React from 'react'
import { motion } from 'framer-motion';
import { styles } from '../styles';

const Alert = ({ type, text }) => {
  // const imageSrc = type === "danger" ? "./src/assets/failed.png" : "./src/assets/alert.png";
  const bgColor = type === "danger" ? 'var(--danger-bg)' : 'var(--success-bg)';

  return (
    <motion.div
      initial={{ y: '-5vh' }}
      animate={{ y: 0 }}
      exit={{ y: '-5vh' }}
      transition={{ type: 'tween', ease: 'easeIn', duration: 0.2 }}
      className='fixed top-32 left-0 right-0 flex justify-center items-center'
    >
      <div
        className='p-4 rounded-lg shadow-lg flex flex-col items-center'
        style={{
          width: '260px',
          height: 'auto',
          backgroundColor: bgColor,
          color: `var(--${type}-topic)`,
          zIndex: 100,
        }}
        role='alert'
      >

        {/* <img
          src={imageSrc}
          alt={type}
          className='w-48 h-48 mt-4 mb-4'
          style={{ marginTop: '-6rem' }}
        /> */}

        <p className={`${type === "danger" ? "text-red" : "text-blue"} mb-4 uppercase font-semibold `}>
          {type === "danger" ? "Error!" : "Success"}
        </p>

        <p className={`${styles.experienceContent}`} style={{ color: 'var(--alert-content)', textAlign: 'center' }}>
          {text}
        </p>

      </div>
    </motion.div>
  );
};

export default Alert;