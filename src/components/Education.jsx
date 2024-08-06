import React, { useState } from "react";
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
          <p className={`${styles.educationTopic}`}>{degree}</p>
          <p className={`${styles.heroContent}`}>{place}</p>
        </li>
      </ul>
    </div>
  );
};

const Education = () => {

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>Education.</h2>
      </motion.div>

      <div>
        {education.map((edu, index) => (
          <EducationInfo
            key={`education-${index}`}
            degree={edu.degree}
            place={edu.place}
          />
        ))}
      </div >

      {/* <div className={'slideIn'}>
        <Tech />
      </div> */}

    </>
  )
}

export default SectionWrapper(Education, "education");