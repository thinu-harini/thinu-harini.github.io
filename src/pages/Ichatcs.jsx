import React, { useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import Toolbar from "../components/Toolbar";
import useSearch from '../hooks/useSearch';
import IchatcsCover from '../assets/projects/ichatcs.png';
import ScrollButton from "../components/ScrollButton";
import IchatcsCover2 from '../assets/projects/groome.png';
import Minimap from "../components/Minimap";
const Ichatcs = () => {
  const contentRef = useRef(null);
  const [contentMarginLeft, setContentMarginLeft] = useState(0);

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
      style={{ marginLeft: `${contentMarginLeft}vw`, transition: 'margin-left 0.3s ease' }}
    >
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

      <div ref={contentRef} className="content" >
        <section data-section="1">
          <div className='sm:mt-12 mt-24 readable'>
            <h1 className="section-heading">Ichatcs</h1>
          </div>

          {/* <p className="content-subheading mb-10 readable">A Booking and Team Management Platform</p> */}

          <img
            src={IchatcsCover}
            alt='project_image'
            className='w-full h-auto object-cover rounded-2xl'
          />

          <div className="mt-10 readable" id="project-overview">
            <h2 className="casestudy-heading">Project overview</h2>
            <p className="casestudy-text">
              {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
            </p>
          </div>
        </section>
        <div className="mt-10 readable" id="design-process">
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

        <div className="mt-10 readable" id="design-iterations">
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


        <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <img
            src={IchatcsCover}
            alt='project_image'
            className='w-full h-auto object-cover rounded-2xl'
          />
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
          <img
            src={IchatcsCover}
            alt='project_image'
            className='w-full h-auto object-cover rounded-2xl'
          />
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <img
            src={IchatcsCover}
            alt='project_image'
            className='w-full h-auto object-cover rounded-2xl'
          />
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>  <div className="mt-10 readable" id="design-process">
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
        <div className="mt-10 readable" id="design-process">
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
        <div className="mt-10 readable" id="design-process">
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
        <div className="mt-10 readable" id="design-process">
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
        <div className="mt-10 readable" id="design-process">
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
        <div className="mt-10 readable" id="design-process">
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
        <div className="mt-10 readable" id="design-process">
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
        <div className="mt-10 readable" id="design-process">
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
        <div className="mt-10 readable" id="design-process">
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
        <div className="mt-10 readable" id="design-process">
          <h2 className="casestudy-heading">Design Process</h2>
          <h3 className="casestudy-subheading square-before">Stakeholder Interviews</h3>
          <p className="casestudy-text">
            {highlightText("lorem ipsum dolor sit amet, Lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
          </p>
          <h3 className="casestudy-subheading square-before">Userflows</h3>
          <p className="casestudy-text">
            {highlightText("fffffLorem ipsum dolor sit amet, lorem consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem")}
          </p>
        </div>


      </div>
    </div>
  );
};

export default SectionWrapper(Ichatcs, "Ichatcs");
