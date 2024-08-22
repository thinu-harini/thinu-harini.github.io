import React from "react";
import { motion } from "framer-motion";

import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import Tech from './Tech';
import { education } from "../constants";

const EducationInfo = ({ degree, place }) => {
  return (
    <div>
      <ul className='bullet mt-4'>
        <li>
          <p className="education-heading">{degree}</p>
          <p className="hero-text">{place}</p>
        </li>
      </ul>
    </div>
  );
};

const Education = () => {

  return (
    <>
      <motion.div variants={textVariant()}>
        <h1 className="section-heading">Education.</h1>
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