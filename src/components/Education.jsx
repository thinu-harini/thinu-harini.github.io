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
  const { isReadMode, contentWidth } = useAccessibility();

  return (
    <>
      {isReadMode ? (
        <div className="read-mode-content">
          <h1 className="readable">Education.</h1>
          {education.map((edu, index) => (
            <div
              key={`education-${index}`}
              id={`education-${index}`}
              className="readable"
            >
              <EducationInfo
                degree={edu.degree}
                place={edu.place}
              />
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          width: `${contentWidth}%`,
          justifyContent: 'center',
          margin: '0 auto',
          transition: 'width 0.3s ease'
        }}>
          <motion.div variants={textVariant()}>
            <h1 className="section-heading readable">
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
      )}
    </>
  );
};

export default SectionWrapper(Education, "education");
