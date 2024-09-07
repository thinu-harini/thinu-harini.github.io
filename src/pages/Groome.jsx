import React, { useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import Toolbar from "../components/Toolbar";
import useSearch from '../hooks/useSearch';
import GroomeCover from '../assets/projects/groome.png';
import ScrollButton from "../components/ScrollButton";
import { useAccessibility } from "../components/AccessibilityContext";

const Groome = () => {

  const contentRef = useRef(null);
  const [contentMarginLeft, setContentMarginLeft] = useState(0);
  const { contentWidth } = useAccessibility();
  // Use the custom hook
  const { searchQuery, searchResults, currentResultIndex, handleSearch, handleNavigate, highlightText } = useSearch();

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
      style={{
        width: `${contentWidth}%`,
        justifyContent: 'center',
        margin: '0 auto',
        transition: 'width 0.3s ease'
      }}
    >
      <div style={{ marginLeft: `${contentMarginLeft}vw`, transition: 'margin-left 0.3s ease' }}>
        <ScrollButton />

        <Toolbar
          sections={sections}
          onResize={handleResize}
          onToggleNavPane={toggleNavPane}
          contentRef={contentRef}
          onSearch={handleSearch}
          onNavigate={handleNavigate}
          currentIndex={currentResultIndex}
          totalResults={searchResults.length}
        />

        <div ref={contentRef} className="content">
          <div className='sm:mt-12 mt-24 readable'>
            <h1 className="section-heading">Groome</h1>
          </div>

          <p className="content-subheading mb-6 readable">A Booking and Team Management Platform</p>

          <img
            src={GroomeCover}
            alt='project_image'
            className='object-cover rounded-2xl'
          />


          {/* <img
        src={image}
        alt={alt}
        className='w-full h-full object-cover rounded-2xl'
      /> */}

          {/* <div
            onClick={() => window.open(ui_link, "_blank")}
            className='purple-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
          >
            <Link
              to={ui_link}
              className='project-button'
            >
              <PiDribbbleLogoFill
                alt='prototype'
                className='project-button-icon object-contain'
                onClick={() => setToggle(!toggle)}
              />
            </Link>
          </div> */}

          <div className="xl:mt-12 lg:mt-12 md:mt-12 readable">
            <p className="casestudy-text">
              <span style={{ fontWeight: 'bold' }}>Roles & Responsibilities:</span> User Research, UX design, UI design
            </p>
            {/* <p className={`casestudy-text}`}><span style={{ fontWeight: 'bold' }}>Date:</span> August 2020 - September 2020</p> */}
            <p className="casestudy-text">
              <span style={{ fontWeight: 'bold' }}>Tools Used:</span> Adobe XD, Usertesting.com, Miro
            </p>
          </div>

          <div className="mt-10 readable" id="project-overview">
            <h2 className="casestudy-heading">Project overview</h2>
            <p className="casestudy-text">
              {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
            </p>
          </div>

          <div className="mt-10 readable" id="problem">
            <h2 className="casestudy-heading">Exploring The Problem</h2>
            <h3 className="casestudy-subheading square-before">Project Scope</h3>
            <p className="casestudy-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <h3 className="casestudy-subheading square-before">Problem Statement</h3>
            <p className="casestudy-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="mt-10 readable" id="design-process">
            <h2 className="casestudy-heading">Design Process</h2>
            <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
            <p className="casestudy-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <h3 className="casestudy-subheading square-before">Userflows</h3>
            <p className="casestudy-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="mt-10 readable" id="design-iterations">
            <h3 className="casestudy-heading">Design Iterations</h3>
            <p className="casestudy-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>





          {/*
        <div className="mt-10">
          <p className={`casestudy-text}`}>Next Project</p>
          <p className={`casestudy-text}`}>Link to next project</p>
        </div> */}

        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Groome, "Groome");

