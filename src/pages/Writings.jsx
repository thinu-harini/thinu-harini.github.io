import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from "../utils/motion";
import { writings } from '../constants';
import { SectionWrapper } from '../hoc';
import { Footer } from '../components';

const WritingCard = ({
  name,
  description,
  alt,
  tags,
  image,
}) => {
  return (
    <div className='project-card md:w-[360px] w-full'>
      <div className='relative w-full h-[230px] image-container'>
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

    </div >
  );
};

const Writings = () => {

  return (
    <>
      <motion.div
        variants={textVariant()}
        className='sm:mt-12 mt-16'
      >
        <h1 className="section-heading">Writings.</h1>
      </motion.div>

      <div className='mt-10 flex flex-wrap gap-7'>
        {writings.map((writing, index) => (
          <WritingCard key={`writing-${index}`} {...writing} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default SectionWrapper(Writings, "writings")



