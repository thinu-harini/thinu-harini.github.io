import React, { useEffect } from 'react';
import { useAccessibility } from './AccessibilityContext';

const ReadingGuide = () => {
  const { isReadingGuideEnabled, guidePosition, updateGuidePosition } = useAccessibility();

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isReadingGuideEnabled) {
        const { clientX, clientY } = event;
        // Update the guide position
        updateGuidePosition(clientX, clientY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isReadingGuideEnabled, updateGuidePosition]);

  return (
    isReadingGuideEnabled && (
      <div
        className="reading-guide"
        style={{
          position: 'fixed',
          top: guidePosition.top,
          left: guidePosition.left,
        }}
      />
    )
  );
};

export default ReadingGuide;
