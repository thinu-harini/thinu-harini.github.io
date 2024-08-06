import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Groome = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (

    <div className={`mt-12`}>
      <motion.div variants={textVariant()}>
        {/* <h2 className={`${styles.sectionSubText}`}>Case Study</h2> */}
        <h1 className={`${styles.sectionHeadText}`}>Groome</h1>
        <p className={`${styles.aboutTopic} mb-10`}> A Booking and Team Management Platform </p>

        <img
          src='src/assets/projects/groome.png'
          alt='project_image'
          className='w-full h-full object-cover rounded-2xl'
        />
      </motion.div>

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
      <div className={`xl:mt-12 lg:mt-12 md:mt-12`}>
        <motion.div variants={textVariant()}>
          <p className={`${styles.caseStudyContent}`}><span style={{ fontWeight: 'bold' }}>Roles & Responsibilities:</span> User Research, UX design, UI design</p>
          {/* <p className={`${styles.caseStudyContent}`}><span style={{ fontWeight: 'bold' }}>Date:</span> August 2020 - September 2020</p> */}
          <p className={`${styles.caseStudyContent}`}><span style={{ fontWeight: 'bold' }}>Tools Used:</span> Adobe XD, Usertesting.com, Miro</p>
        </motion.div>
      </div>

      <div className="mt-10">
        <h2 className={`${styles.caseStudyTopicText}`}>Project overview</h2>
        <p className={`${styles.caseStudyContent}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </p>
      </div>

      <div className="mt-10">
        <h2 className={`${styles.caseStudyTopicText}`}>Exploring The Problem</h2>

        <h3 className={`${styles.caseStudySubTopicText} square-before`}>Project Scope</h3>
        <p className={`${styles.caseStudyContent}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </p>

        <h3 className={`${styles.caseStudySubTopicText} square-before`}>Problem Statement</h3>
        <p className={`${styles.caseStudyContent}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </p>
      </div>

      <div className="mt-10">
        <h3 className={`${styles.caseStudyTopicText}`}>Design Process</h3>

        <h3 className={`${styles.caseStudySubTopicText} square-before`}>Stakeholder Interviews</h3>
        <p className={`${styles.caseStudyContent}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
        </p>

        <h3 className={`${styles.caseStudySubTopicText} square-before`}>Userflows</h3>
        <p className={`${styles.caseStudyContent}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
        </p>
      </div>

      <div className="mt-10">
        <h3 className={`${styles.caseStudyTopicText}`}>Design Iterations</h3>
        <p className={`${styles.caseStudyContent}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
        </p>
      </div>

      {/* <div className="mt-10">
        <p className={`${styles.caseStudyContent}`}>Next Project</p>
        <p className={`${styles.caseStudyContent}`}>Link to next project</p>
      </div> */}

    </div>
  )
};

export default SectionWrapper(Groome, "Groome");