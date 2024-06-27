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
        <p className={`${styles.sectionSubText}`}>Get to know me</p>
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

          <p className={`${styles.aboutContent}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        </div >

      ) : (

        <div className={'slideIn'}>
          {/* <p className={`${styles.sectionContent}`}>
            By working in different projects, I have gained proficiency in different tools.
            Here are some tools and technologies I have been working with. You can find the
            relevant projects I have done with these tools and technologies in projects section.
          </p> */}
          <Tech />
        </div>

      )}
    </>
  )
}

export default SectionWrapper(About, "about");