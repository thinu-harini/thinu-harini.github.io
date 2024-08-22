import React, { useState, useEffect } from 'react';

const Magnifier = ({ isActive }) => {
  const [magnifierStyle, setMagnifierStyle] = useState({});
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isActive) {
        const element = event.target;

        // Check if the element is a text-containing element
        if (element && element.textContent && element.textContent.trim()) {
          setTextContent(element.textContent.trim());
          setMagnifierStyle({
            left: `${event.clientX + 20}px`,
            top: `${event.clientY + 20}px`,
            display: 'block',
          });
        } else {
          setMagnifierStyle({ display: 'none' });
        }
      } else {
        setMagnifierStyle({ display: 'none' });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  return (
    <div
      className="magnifier"
      style={magnifierStyle}
    >
      <div className="magnifier-content">
        {textContent}
      </div>
    </div>
  );
};

export default Magnifier;
