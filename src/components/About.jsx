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
    <div className='mt-5 slideIn'>
      <h3 className={styles.aboutTopic}>{degree}</h3>
      <p className={styles.aboutContent}>{place}</p>
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
        <p className={styles.sectionSubText}>Get to know me</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
      </motion.div>

      <div className="tabs mt-6">
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

        <div className={'slideIn'}>

          {/* <div className='flex flex-wrap gap-7'> */}
          {education.map((edu, index) => (
            <EducationInfo
              key={`education-${index}`}
              degree={edu.degree}
              place={edu.place}
            />
          ))}
          {/* </div> */}
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