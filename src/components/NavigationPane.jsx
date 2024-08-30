import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import Resizer from './Resizer';
import { MdOutlineDragIndicator } from 'react-icons/md';
import '../assets/styles/NavigationPane.css';

const NavPane = ({ sections = [], onResize, width }) => {
  const [navWidth, setNavWidth] = useState(width || 20);
  const navPaneRef = useRef(null);

  // Update width based on screen size
  useEffect(() => {
    const updateWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) {
        setNavWidth(40);
      } else if (screenWidth < 768) {
        setNavWidth(35);
      } else if (screenWidth < 992) {
        setNavWidth(30);
      } else if (screenWidth < 1200) {
        setNavWidth(25);
      } else {
        setNavWidth(20);
      }
    };

    updateWidth(); // Set initial width
    window.addEventListener('resize', updateWidth); // Update on window resize

    return () => window.removeEventListener('resize', updateWidth); // Clean up
  }, []);

  useEffect(() => {
    if (onResize) {
      onResize(navWidth); // Notify parent component of width change
    }
  }, [navWidth, onResize]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;

    const handleMouseMove = (e) => {
      const newWidth = Math.max(10, navWidth + (e.clientX - startX) / window.innerWidth * 100);
      setNavWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const startX = e.touches[0].clientX;

    const handleTouchMove = (e) => {
      const newWidth = Math.max(10, navWidth + (e.touches[0].clientX - startX) / window.innerWidth * 100);
      setNavWidth(newWidth);
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div
      className="navigation-pane-container"
      style={{ width: `${navWidth}vw` }}
      ref={navPaneRef}
    >
      <div className="navigation-pane">
        <div className="navigation-pane-header">
          <h3 className='content-subheading'>Navigation</h3>
        </div>
        <ul className="mt-2 ml-2 p-2">
          {sections.map((section, index) => (
            <li key={index} className="mb-2">
              <Link
                to={section.id}
                smooth={true}
                duration={500}
                className="navigation-pane-content content-text"
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
        <Resizer onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} />
        <button
          className="resizer-button"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          aria-label="Resize Navigation Pane"
        >
          <MdOutlineDragIndicator />
        </button>
      </div>
    </div>
  );
};

export default NavPane;
