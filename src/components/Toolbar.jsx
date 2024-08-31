import React, { useEffect, useRef, useState } from 'react';
import Minimap from "../components/Minimap";
import NavPane from "../components/NavigationPane";
import SearchBar from '../components/SearchBar';
import ProgressBar from './ProgressBar';
import { IoLayers } from 'react-icons/io5';
import { FaGlasses, FaMapMarkedAlt } from 'react-icons/fa';
import { BiSolidSearchAlt2 } from 'react-icons/bi';
import { GiLifeBar } from 'react-icons/gi';
import '../assets/styles/Toolbar.css';

const Toolbar = ({ sections, onResize, onToggleNavPane, contentRef, onSearch, onNavigate, currentIndex, totalResults }) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [isNavPaneVisible, setIsNavPaneVisible] = useState(false);
  const [navPaneWidth, setNavPaneWidth] = useState(20);
  const [isMinimapVisible, setIsMinimapVisible] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(true);

  const toolbarRef = useRef(null);
  const toolbarButtonRef = useRef(null);

  // Handle clicks outside the toolbar
  useEffect(() => {
    function handleClickOutside(event) {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target) && !toolbarButtonRef.current.contains(event.target)) {
        setIsToolbarVisible(false);
      }
    }

    if (isToolbarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isToolbarVisible]);

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

  const toggleSearchBarVisibility = () => {
    setIsSearchBarVisible(prev => !prev);
  };

  const handleSearchBarClose = () => {
    setIsSearchBarVisible(false);
  };

  const toggleProgressBarVisibility = () => {
    setIsProgressBarVisible(prev => !prev);
  };

  const toggleToolbarVisibility = () => {
    setIsToolbarVisible(prev => !prev);
  };

  return (
    <div>
      <button
        ref={toolbarButtonRef}
        onClick={toggleToolbarVisibility}
        className="toolbar-button"
        aria-label={isToolbarVisible ? 'Hide Toolbar' : 'Show Toolbar'}
      >
        <FaGlasses />
      </button>

      {isToolbarVisible && (
        <div ref={toolbarRef} className="toolbar">
          <button
            onClick={toggleNavPaneVisibility}
            className={`toolbar-option ${isNavPaneVisible ? 'active' : ''}`}
            aria-label={isNavPaneVisible ? 'Hide Navigation' : 'Show Navigation'}
          >
            <IoLayers />
            <div className="button-text ml-2">Navigation Pane</div>
          </button>

          <button
            onClick={toggleMinimapVisibility}
            className={`toolbar-option ${isMinimapVisible ? 'active' : ''}`}
            aria-label={isMinimapVisible ? 'Hide Minimap' : 'Show Minimap'}
          >
            <FaMapMarkedAlt />
            <div className="button-text ml-2">Minimap</div>
          </button>

          <button
            onClick={toggleSearchBarVisibility}
            className={`toolbar-option ${isSearchBarVisible ? 'active' : ''}`}
            aria-label={isSearchBarVisible ? 'Hide Search Bar' : 'Show Search Bar'}
          >
            <BiSolidSearchAlt2 />
            <div className="button-text ml-2">Search Bar</div>
          </button>

          <button
            onClick={toggleProgressBarVisibility}
            className={`toolbar-option ${isProgressBarVisible ? 'active' : ''}`}
            aria-label={isProgressBarVisible ? 'Hide Progress Bar' : 'Show Progress Bar'}
          >
            <GiLifeBar />
            <div className="button-text ml-2">Progress Bar</div>
          </button>
        </div>
      )}

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
          isVisible={isSearchBarVisible}
          onClose={handleSearchBarClose}
        />
      )}

      {isProgressBarVisible && (
        <ProgressBar />
      )}
    </div>
  );
};

export default Toolbar;
