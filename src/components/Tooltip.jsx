import React, { useState, useEffect } from 'react';
import { useAccessibility } from './AccessibilityContext';

const Tooltip = () => {
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const { isTooltipMode } = useAccessibility();

  useEffect(() => {
    const handleMouseOver = (event) => {
      if (isTooltipMode) {
        const text = event.target.getAttribute('data-tooltip');
        if (text) {
          const { clientX: left, clientY: top } = event;
          setTooltipPosition({ top: `${top + 10}px`, left: `${left + 10}px` });
          setTooltipText(text);
        }
      }
    };

    const handleMouseOut = () => {
      if (isTooltipMode) {
        setTooltipText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isTooltipMode]);

  return (
    <div
      className={`tooltip-container ${tooltipText ? 'show' : ''}`}
      style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
    >
      {tooltipText}
    </div>
  );
};

export default Tooltip;
