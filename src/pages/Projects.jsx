import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { projects } from '../constants';
import { SectionWrapper } from '../hoc';

import { PiDribbbleLogoFill } from "react-icons/pi";
import { HiNewspaper } from "react-icons/hi2";
import { Footer } from '../components';

const ProjectCard = ({
  name,
  description,
  tags,
  image,
  case_study_link,
  ui_link,
}) => {
  return (
    <div className='project-card md:w-[360px] w-full'>
      <div className='relative w-full h-[230px]'>
        <img
          src={image}
          alt='project_image'
          className='w-full h-full object-cover rounded-2xl'
        />
      </div>

      <div className='mt-5'>
        <h3 className={styles.contentHeadText}>{name}</h3>
        <p className={styles.content}>{description}</p>
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <p
            key={`${name}-${tag.name}`}
            className={styles.content}
            style={{ color: 'var(--content)', margin: 0 }}
          >
            #{tag.name}
          </p>
        ))}

      </div>

      <div className='flex gap-2 mt-2 justify-end'>

        {/* case study link - conditionally render */}
        {case_study_link && (
          <Link
            to={case_study_link}
            className='project-button'
          >
            <HiNewspaper
              alt='case study'
              className='project-button-icon object-contain'
              onClick={() => setToggle(!toggle)}
            />
          </Link>
        )}

        {/* dribbble link - conditionally render */}
        {ui_link && (
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
        )}
      </div>

    </div >
  );
};

const Projects = () => {

  return (
    <>
      <div>
        {/* <p className={styles.sectionSubText}>My Work</p> */}
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </div>

      <div className='mt-10 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default SectionWrapper(Projects, "projects")

