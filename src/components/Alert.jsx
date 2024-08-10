import React from 'react'
import { motion } from 'framer-motion';
import { styles } from '../styles';

const Alert = ({ type, hideAlert }) => {
  const bgColor = type === "danger" ? 'var(--danger-bg)' : 'var(--success-bg)';

  return (
    <motion.div
      initial={{ y: '-5vh' }}
      animate={{ y: 0 }}
      exit={{ y: '-5vh' }}
      transition={{ type: 'tween', ease: 'easeIn', duration: 0.2 }}
      className='fixed top-32 left-0 right-0 flex justify-center'
    >
      <div
        className='rounded-lg shadow-lg flex flex-col items-center p-4'
        style={{
          width: '280px',
          height: 'auto',
          backgroundColor: bgColor,
          color: `var(--${type}-topic)`,
          zIndex: 100,
        }}
        role='alert'
      >

        <p className={`${styles.content} uppercase font-semibold`}
          style={{ color: 'var(--alert-text)' }}>
          {type === "danger" ? "Error!" : "Success"}
        </p>

        <p
          className={`${styles.content}`}
          style={{ color: 'var(--alert-text)', textAlign: 'center' }}
        >
          {type === "danger" ? (
            <>
              Failed to send your message. Please try again or <a href="mailto:thinu.harini@gmail.com" className="alert-link">email me directly.</a>
            </>
          ) : (
            <>
              Thank you. I will get back to you as soon as possible.
            </>
          )}
        </p>

        {type === "danger" && (
          <button onClick={hideAlert} className="alert-button mt-6 mb-4">Close</button>
        )}

      </div>
    </motion.div>
  );
};

export default Alert;