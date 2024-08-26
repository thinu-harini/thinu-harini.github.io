import React, { useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import ProgressBar from "../components/ProgressBar";
import { useAccessibility } from "../components/AccessibilityContext";
import Toolbar from "../components/Toolbar";
import useSearch from '../hooks/useSearch';
import IchatcsCover from '../assets/projects/ichatcs.png';

const Ichatcs = () => {
  const { startReadingFromElement } = useAccessibility();
  const contentRef = useRef(null);
  const [contentMarginLeft, setContentMarginLeft] = useState(0);

  // Use the custom hook
  const { searchQuery, searchResults, currentResultIndex, handleSearch, handleNavigate, highlightText, isSearchBarVisible, toggleSearchBarVisibility } = useSearch();

  const sections = [
    { id: 'project-overview', title: 'Project Overview' },
    { id: 'problem', title: 'Exploring The Problem' },
    { id: 'design-process', title: 'Design Process' },
    { id: 'design-iterations', title: 'Design Iterations' },
  ];

  const handleResize = (navWidth) => {
    setContentMarginLeft(navWidth);
  };

  const toggleNavPane = (navWidth) => {
    setContentMarginLeft(navWidth);
  };

  return (
    <div
      style={{ marginLeft: `${contentMarginLeft}vw`, transition: 'margin-left 0.3s ease' }}
    >
      <ProgressBar />
      <Toolbar
        sections={sections}
        onResize={handleResize}
        onToggleNavPane={toggleNavPane}
        contentRef={contentRef}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        currentIndex={currentResultIndex}
        totalResults={searchResults.length}
        isSearchBarVisible={isSearchBarVisible}
        toggleSearchBarVisibility={toggleSearchBarVisibility}
      />

      <div ref={contentRef} >
        <div className='sm:mt-12 mt-32'>
          <h1 className="section-heading">Ichatcs</h1>
        </div>

        <p className="content-subheading mb-10">A Booking and Team Management Platform</p>

        <img
          src={IchatcsCover}
          alt='project_image'
          className='w-full h-auto object-cover rounded-2xl'
        />

        <div className="mt-10" id="project-overview" onClick={() => startReadingFromElement('lorem project-overview')}>
          <h2 className="casestudy-heading">Project overview</h2>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
        </div>

        <div className="mt-10" id="design-process" onClick={() => startReadingFromElement('design-process')}>
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>

        <div className="mt-10" id="design-iterations" onClick={() => startReadingFromElement('design-iterations')}>
          <h3 className="casestudy-heading">Design Iterations</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, loremconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, loremconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <p className="casestudy-text">
            {highlightText("Lorem dd  ipsum dolor sit amet, loremconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum ipsum dd dolor sit amet, loremconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
        </div>

      </div>
    </div>
  );
};

export default SectionWrapper(Ichatcs, "Ichatcs");
