import React, { useState } from 'react';
import Minimap from "../components/Minimap";
import NavPane from "../components/NavigationPane";
import SearchBar from '../components/SearchBar';
import { IoLayers } from 'react-icons/io5';
import { FaMapMarkedAlt, FaTimes } from 'react-icons/fa';
import { BiSolidSearchAlt2 } from 'react-icons/bi';
import GradientMapMarkedAlt from './GradientMapMarkedAlt';

const Toolbar = ({ sections, onResize, onToggleNavPane, contentRef, onSearch, onNavigate, currentIndex, totalResults, isSearchBarVisible, toggleSearchBarVisibility }) => {
  const [isNavPaneVisible, setIsNavPaneVisible] = useState(false);
  const [navPaneWidth, setNavPaneWidth] = useState(20);
  const [isMinimapVisible, setIsMinimapVisible] = useState(true);

  const toggleNavPaneVisibility = () => {
    setIsNavPaneVisible(prev => {
      const newVisibility = !prev;
      onToggleNavPane(newVisibility ? navPaneWidth : 0);
      return newVisibility;
    });
  };

  const handleResize = (width) => {
    setNavPaneWidth(width);
    onResize(width);
  };

  const toggleMinimapVisibility = () => {
    setIsMinimapVisible(prev => !prev);
  };

  const handleSearchBarToggle = () => {
    toggleSearchBarVisibility();
  };

  return (
    <div>
      <div className="toolbar">
        <button
          onClick={toggleNavPaneVisibility}
          className={`glow-button ${isNavPaneVisible ? 'active' : ''}`}
          // className="navigation-button"
          aria-label={isNavPaneVisible ? 'Hide Navigation' : 'Show Navigation'}
        >
          <IoLayers className="glow-icon" />
        </button>

        <button
          onClick={toggleMinimapVisibility}
          className={`glow-button ${isMinimapVisible ? 'active' : ''}`}
          // className="minimap-toggle-button"
          aria-label={isMinimapVisible ? 'Hide Minimap' : 'Show Minimap'}
        >
          <GradientMapMarkedAlt className="glow-icon" />
          {/* <FaMapMarkedAlt className="glow-icon" /> */}
        </button>

        <button
          onClick={handleSearchBarToggle}
          className={`glow-button ${isSearchBarVisible ? 'active' : ''}`}
          aria-label={isSearchBarVisible ? 'Hide Search Bar' : 'Show Search Bar'}
        >
          <BiSolidSearchAlt2 className="glow-icon" />
        </button>
      </div>

      {isNavPaneVisible && (
        <NavPane sections={sections} onResize={handleResize} width={navPaneWidth} />
      )}

      {isMinimapVisible && (
        <Minimap
          contentRef={contentRef}
          isVisible={isMinimapVisible}
          onToggle={toggleMinimapVisibility}
        />
      )}

      {isSearchBarVisible && (
        <SearchBar
          onSearch={onSearch}
          onNavigate={onNavigate}
          currentIndex={currentIndex}
          totalResults={totalResults}
        />
      )}
    </div>
  );
};

export default Toolbar;
