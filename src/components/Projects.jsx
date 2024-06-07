import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { projects } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { dribbble } from "../assets";

const ProjectCard = ({
  name,
  description,
  tags,
  image,
  source_code_link,
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
        <h3 className={styles.experienceHeadText}>{name}</h3>
        <p className={styles.cardContent}>{description}</p>
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <p
            key={`${name}-${tag.name}`}
            className={`text-[14px]`}
            style={{ color: 'var(--tag-color)' }}
          >
            #{tag.name}
          </p>
        ))}
      </div>

      {/* <div className='absolute inset-0 flex justify-end m-3 card-img_hover'> */}
      <div className='flex justify-end mb-3 card-img_hover'>
        {/* <div
          onClick={() => window.open(source_code_link, "_blank")}
          className='purple-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
        > */}

        <Link
          to={source_code_link}
          className='purple-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
        >
          <img
            src={dribbble}
            alt='source code'
            className='w-2/3 h-2/3 object-contain'
          />
        </Link>

      </div>

    </div >
  );
};

const Projects = () => {

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </div>

      {/* <div className='w-full flex'>
//         <motion.p
//           variants={fadeIn("", "", 0.1, 1)}
//           className={`${styles.sectionContent}`}
//         >
//           Following projects showcases my skills and experience through
//           real-world examples of my work. Each project is briefly described with
//           links to case studies and live demos in it. It reflects my
//           ability to solve complex problems, work with different technologies,
//           and manage projects effectively.
//         </motion.p>
//       </div> */}

      <div className='mt-10 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} />
        ))}
      </div>

    </>
  );
};

export default SectionWrapper(Projects, "projects")

