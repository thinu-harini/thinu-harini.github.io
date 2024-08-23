import React from 'react';

const Resizer = ({ onMouseDown, onTouchStart }) => {
  return (
    <div
      className="resizer"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        width: '5px',
        height: '100%',
        cursor: 'ew-resize',
        position: 'absolute',
        right: 0,
        top: 0,
        touchAction: 'none', // Prevent touch gestures from interfering
      }}
    />
  );
};

export default Resizer;
