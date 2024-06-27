import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import Tech from './Tech';
import { education } from "../constants";

const EducationInfo = ({ degree, place }) => {
  return (
    <div>
      <ul className='bullet mt-4'>
        <li>
          <h3 className={`${styles.aboutTopic}`}>{degree}</h3>
          <p className={`${styles.heroContent}`}>{place}</p>
        </li>
      </ul>
    </div>
  );
};

const About = () => {
  const [selectedTab, setSelectedTab] = useState("Education"); // Initial tab

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        {/* <p className={`${styles.sectionSubText}`}>Get to know me</p> */}
        <h2 className={`${styles.sectionHeadText}`}>About Me.</h2>
      </motion.div>

      <div className={`${styles.heroContent} tab_button mt-6 mb-6`}>
        <button
          className={selectedTab === "Education" ? "active" : ""}
          onClick={() => handleTabChange("Education")}
        >
          Education
        </button>
        <button
          className={selectedTab === "Skills" ? "active" : ""}
          onClick={() => handleTabChange("Skills")}
        >
          Skills
        </button>
      </div>

      {selectedTab === "Education" ? (

        <div>
          {/* {education.map((edu, index) => (
            <EducationInfo
              key={`education-${index}`}
              degree={edu.degree}
              place={edu.place}
            />
          ))} */}

          <p className={`${styles.aboutContent} mb-4`}>
            I am a graduate from University of Moratuwa in Information Technology.
          </p>
          <p className={`${styles.aboutContent} mb-4`}>
            I originally started off as a Computer Science major during undergrad, but quickly realized that I was fascinated by the 'Why' behind the code I was writing. This led me to exploring the field of UX, and after a few projects and freelance work, I fell in love with the art of problem solving.
          </p>
          <p className={`${styles.aboutContent} mb-4`}>
            I like to think of myself as a full-stack product designer who can lead a project from research & design to the prototyping phase to ensure a smooth developer handoff.
          </p>
        </div >

      ) : (

        <div className={'slideIn'}>
          <Tech />
        </div>

      )}
    </>
  )
}

export default SectionWrapper(About, "about");