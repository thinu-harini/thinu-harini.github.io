import React, { useRef, useState } from "react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import NavPane from "../components/NavigationPane";
import Minimap from "../components/Minimap";
import ProgressBar from "../components/ProgressBar";
import { useAccessibility } from "../components/AccessibilityContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Groome = () => {
  const contentRef = useRef(null);
  const [isNavPaneVisible, setIsNavPaneVisible] = useState(true);

  const sections = [
    { id: 'project-overview', title: 'Project Overview' },
    { id: 'problem', title: 'Exploring The Problem' },
    { id: 'design-process', title: 'Design Process' },
    { id: 'design-iterations', title: 'Design Iterations' }
  ];
  const { startReadingFromElement } = useAccessibility();

  const toggleNavPaneVisibility = () => {
    setIsNavPaneVisible(!isNavPaneVisible);
  };

  return (
    <div>
      <ProgressBar />
      <Minimap contentRef={contentRef} mode="proportional" />

      <button
        onClick={toggleNavPaneVisibility}
        className="fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded"
        aria-label={isNavPaneVisible ? 'Hide Navigation' : 'Show Navigation'}
      >
        {isNavPaneVisible ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <NavPane sections={sections} isVisible={isNavPaneVisible} />

      <div ref={contentRef}>
        <div className='sm:mt-12 mt-24'>
          <h1
            className="section-heading"
          >
            Groome
          </h1>
        </div>

        <p className="content-subheading mb-10" >
          A Booking and Team Management Platform
        </p>

        <img
          src='src/assets/projects/groome.png'
          alt='project_image'
          className='w-full h-auto object-cover rounded-2xl'
        />

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
        <div className="xl:mt-12 lg:mt-12 md:mt-12">
          <p
            className="casestudy-text"

          >
            <span style={{ fontWeight: 'bold' }}>Roles & Responsibilities:</span> User Research, UX design, UI design
          </p>
          {/* <p className={`casestudy-text}`}><span style={{ fontWeight: 'bold' }}>Date:</span> August 2020 - September 2020</p> */}
          <p
            className="casestudy-text"

          >
            <span style={{ fontWeight: 'bold' }}>Tools Used:</span> Adobe XD, Usertesting.com, Miro
          </p>
        </div>

        <div className="mt-10" id="project-overview" onClick={() => startReadingFromElement('project-overview')}>
          <h2
            className="casestudy-heading"

          >
            Project overview
          </h2>

          <p
            className="casestudy-text"

          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        </div>

        <div className="mt-10" id="problem" onClick={() => startReadingFromElement('problem')}>
          <h2
            className="casestudy-heading"
          >
            Exploring The Problem
          </h2>

          <h3
            className="casestudy-subheading square-before"

          >
            Project Scope
          </h3>

          <p
            className="casestudy-text"

          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>

          <h3
            className="casestudy-subheading square-before"

          >
            Problem Statement
          </h3>

          <p
            className="casestudy-text"

          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        </div>

        <div className="mt-10" id="design-process" onClick={() => startReadingFromElement('design-process')}>
          <h2
            className="casestudy-heading"
          >
            Design Process
          </h2>

          <h3
            className="casestudy-subheading square-before"

          >
            Stakeholder Interviews
          </h3>

          <p
            className="casestudy-text"

          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
          </p>

          <h3
            className="casestudy-subheading square-before">

            Userflows
          </h3>

          <p
            className="casestudy-text"

          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
          </p>
        </div>

        <div className="mt-10" id="design-iterations" onClick={() => startReadingFromElement('design-iterations')}>
          <h3
            className="casestudy-heading"

          >
            Design Iterations
          </h3>

          <p
            className="casestudy-text"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
          </p>

        </div>

        {/* 
        <div className="mt-10">
          <p className={`casestudy-text}`}>Next Project</p>
          <p className={`casestudy-text}`}>Link to next project</p>
        </div> */}

      </div>
    </div>
  )
};

export default SectionWrapper(Groome, "Groome");