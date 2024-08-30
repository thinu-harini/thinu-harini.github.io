import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { education } from "../constants";
import { useAccessibility } from "./AccessibilityContext";

const EducationInfo = ({ degree, place }) => {
  const { isReadMode } = useAccessibility();

  return (
    <div className={isReadMode ? 'read-mode' : ''}>
      {isReadMode ? (
        <div className="read-mode-content">
          <h2>{degree}</h2>
          <p>{place}</p>
        </div>
      ) : (
        <ul className='bullet mt-4'>
          <li>
            <p className="education-heading">{degree}</p>
            <p className="hero-text">{place}</p>
          </li>
        </ul>
      )}
    </div>
  );
};

const Education = () => {

  return (
    <>
      <div>
        <motion.div variants={textVariant()}>
          <h1
            className="section-heading readable"
            id="education-heading"
          >
            Education
          </h1>
        </motion.div>

        <div>

          {education.map((edu, index) => (
            <div
              key={`education-${index}`}
              id={`education-${index}`}
              className="education-section readable"
            >
              <EducationInfo
                degree={edu.degree}
                place={edu.place}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
