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

          // Get the dimensions of the magnifier
          const magnifierWidth = 200; // Adjust based on actual width
          const magnifierHeight = 100; // Adjust based on actual height

          // Calculate new position
          let left = event.clientX + 20;
          let top = event.clientY + 20;

          // Adjust position if the magnifier is near the edge of the viewport
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          if (left + magnifierWidth > viewportWidth) {
            left = viewportWidth - magnifierWidth - 100;
          }

          if (top + magnifierHeight > viewportHeight) {
            top = viewportHeight - magnifierHeight - 20;
          }

          setMagnifierStyle({
            left: `${left}px`,
            top: `${top}px`,
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
