// import React from 'react';
// import { motion } from 'framer-motion';
// import { textVariant } from "../utils/motion";
// import { Link } from 'react-router-dom';
// import { projects } from '../constants';
// import { SectionWrapper } from '../hoc';

// import { PiDribbbleLogoFill } from "react-icons/pi";
// import { HiNewspaper } from "react-icons/hi2";
// import { Footer } from '../components';
// import ProgressBar from '../components/ProgressBar';
// import '../assets/styles/Projects.css';

// const ProjectCard = ({
//   name,
//   image,
//   alt,
//   description,
//   tags,
//   case_study_link,
//   dribbble_link,
// }) => {
//   return (
//     <div className='project-card'>
//       <div className='relative w-full h-64 md:h-56 image-container'>
//         <img
//           src={image}
//           alt={alt}
//           className='w-full h-full object-cover rounded-2xl'
//         />
//       </div>

//       <div className='mt-5'>
//         <h2 className="content-heading">{name}</h2>
//         <p className="content-text mt-2">{description}</p>
//       </div>

//       <div className='mt-4 flex flex-wrap gap-2'>
//         {tags.map((tag) => (
//           <p
//             key={`${name}-${tag.name}`}
//             className="content-text mt-2"
//             style={{ color: 'var(--content)', margin: 0 }}
//           >
//             #{tag.name}
//           </p>
//         ))}

//       </div>

//       <div className='flex gap-1 mt-2 justify-end'>

//         {/* conditionally render links */}
//         {case_study_link && (
//           <Link
//             to={case_study_link}
//             className='icon-button'
//             aria-label='View case study'
//             title='Case Study'
//           >
//             <HiNewspaper />
//           </Link>
//         )}

//         {dribbble_link && (
//           <Link
//             to={dribbble_link}
//             className='icon-button'
//             aria-label='View prototype'
//             title='Dribbble shots'
//           >
//             <PiDribbbleLogoFill />
//           </Link>
//         )}
//       </div>

//       {/* github link for code */}

//       {/* live project link */}

//     </div >
//   );
// };

// const Projects = () => {

//   return (
//     <>
//       <ProgressBar />
//       <div>
//         <motion.div
//           variants={textVariant()}
//           className='sm:mt-12 mt-16'
//         >
//           <h1 className="section-heading">Projects.</h1>
//         </motion.div>

//         <div className='project-cards-container mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
//           {projects.map((project, index) => (
// <ProjectCard key={`project-${index}`} {...project} />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default SectionWrapper(Projects, "projects")



import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from "../utils/motion";
import { Link } from 'react-router-dom';
import { projects } from '../constants';
import { SectionWrapper } from '../hoc';

import { PiDribbbleLogoFill } from "react-icons/pi";
import { HiNewspaper } from "react-icons/hi2";
import { Footer } from '../components';
import ProgressBar from '../components/ProgressBar';
import { useAccessibility } from '../components/AccessibilityContext';
import '../assets/styles/Projects.css';
import ScrollButton from '../components/ScrollButton';

const ProjectCard = ({
  name,
  image,
  alt,
  description,
  tags,
  case_study_link,
  dribbble_link,
}) => {
  const { isReadMode } = useAccessibility(); // Access read mode state

  return (
    <div className={`project-card ${isReadMode ? 'read-mode' : ''}`}>
      {
        isReadMode ? (
          <div className="read-mode-content" >
            <h2>{name}</h2>
            <img
              src={image}
              alt={alt}
              className='w-full h-full object-cover rounded-2xl mt-4 mb-4'
            />
            <p>{description}</p>
            <div className='mt-2 gap-2'>
              {tags.map((tag) => (
                <p
                  key={`${name}-${tag.name}`}
                  className="mt-2"
                  style={{ color: 'var(--content)', margin: 0 }}
                >
                  #{tag.name}
                </p>
              ))
              }
            </div >
          </div >
        ) : (
          <>
            <div className='readable'>
              {/* <div className='image-container relative w-full h-64 md:h-56'> */}
              <div className='image-container relative w-full'>
                <img
                  src={image}
                  alt={alt}
                  className='w-full h-full object-cover rounded-2xl'
                />
              </div>

              <div className='mt-5'>
                <h2 className="content-heading">{name}</h2>
                <p className="content-text mt-2">{description}</p>
              </div>

              <div className='mt-4 flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <p
                    key={`${name}-${tag.name}`}
                    className="content-text mt-2"
                    style={{ color: 'var(--content)', margin: 0 }}
                  >
                    #{tag.name}
                  </p>
                ))}

              </div>

              <div className='flex md:gap-1 gap-2 justify-end'>

                {/* conditionally render links */}
                {case_study_link && (
                  <Link
                    to={case_study_link}
                    className='icon-button icon-button-padding'
                    aria-label='View case study'
                    title='Case Study'
                  >
                    <HiNewspaper />
                  </Link>
                )}

                {dribbble_link && (
                  <Link
                    to={dribbble_link}
                    className='icon-button icon-button-padding'
                    aria-label='View prototype'
                    title='Dribbble shots'
                  >
                    <PiDribbbleLogoFill />
                  </Link>
                )}
              </div>

              {/* github link for code */}

              {/* live project link */}

            </div >
          </>
        )
      }
    </div >
  );
};

const Projects = () => {
  const { isReadMode, contentWidth } = useAccessibility();

  return (
    <>
      {isReadMode ? (
        <div className="read-mode-content">
          <h1>Projects.</h1>
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} {...project} />
          ))}
        </div>
      ) : (
        <div
          style={{
            width: `${contentWidth}%`,
            justifyContent: 'center',
            margin: '0 auto',
            transition: 'width 0.3s ease'
          }}>
          <ScrollButton />
          <ProgressBar />
          <div>
            <motion.div
              variants={textVariant()}
              className='sm:mt-12 mt-16'
            >
              <h1 className="section-heading readable">Projects.</h1>
            </motion.div>
            <div className='project-cards-container'>
              {projects.map((project, index) => (
                <ProjectCard key={`project-${index}`} {...project} />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Projects, "projects")

