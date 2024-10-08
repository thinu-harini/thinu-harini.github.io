import React from 'react'

const Alert = ({ type, hideAlert }) => {
  const bgColor = type === "danger" ? 'var(--danger-bg)' : 'var(--success-bg)';

  return (
    <div
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

        <p className="content-text mt-4 uppercase font-semibold"
          style={{ color: 'var(--alert-text)' }}>
          {type === "danger" ? "Error!" : "Success"}
        </p>

        <p
          className="content-text mt-4"
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
    </div>
  );
};

export default Alert;