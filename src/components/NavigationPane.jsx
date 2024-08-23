import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { FaTimes } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import Resizer from './Resizer';
import { MdOutlineDragIndicator } from 'react-icons/md';

const NavPane = ({ sections, onResize }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [width, setWidth] = useState(20);
  const navPaneRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) {
        setWidth(40);
      } else if (screenWidth < 768) {
        setWidth(40);
      } else if (screenWidth < 992) {
        setWidth(35);
      } else if (screenWidth < 1200) {
        setWidth(25);
      } else {
        setWidth(20);
      }
    };

    updateWidth(); // Set initial width on component mount
    window.addEventListener('resize', updateWidth); // Update on window resize

    return () => window.removeEventListener('resize', updateWidth); // Clean up event listener
  }, []);

  useEffect(() => {
    if (onResize) {
      onResize(isVisible ? width : 0); // Pass width only when visible
    }
  }, [width, isVisible, onResize]);

  const toggleNavPaneVisibility = () => {
    setIsVisible(prev => !prev);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;

    const handleMouseMove = (e) => {
      const newWidth = Math.max(10, width + (e.clientX - startX) / window.innerWidth * 100);
      setWidth(newWidth);
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

    const handleTouchMove = (e) => handleResize(e.touches[0].clientX);
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div>
      <button
        onClick={toggleNavPaneVisibility}
        className="navigation-button"
        aria-label={isVisible ? 'Hide Navigation' : 'Show Navigation'}
      >
        <IoLayers />
      </button>

      <div
        className={`navigation-pane-container ${isVisible ? 'visible' : 'hidden'}`}
        style={{ width: `${width}vw` }}
        ref={navPaneRef}
      >
        <div className="navigation-pane">
          <button
            onClick={toggleNavPaneVisibility}
            className="navigation-pane-header"
          >
            <h3 className="button-text font-semibold">Navigation</h3>
            <FaTimes
              className='navigation-pane-header-icon'
              onClick={toggleNavPaneVisibility}
            />
          </button>
          <ul className="mt-2 p-2">
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
    </div>
  );
};

export default NavPane;

