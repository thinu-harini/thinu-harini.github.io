import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from "../utils/motion";
import { writings } from '../constants';
import { SectionWrapper } from '../hoc';
import { Footer } from '../components';
import ProgressBar from '../components/ProgressBar';
import { useAccessibility } from '../components/AccessibilityContext';
import '../assets/styles/Projects.css';
import ScrollButton from '../components/ScrollButton';

const WritingCard = ({
  name,
  description,
  alt,
  tags,
  image,
}) => {
  const { isReadMode } = useAccessibility();

  return (
    <div className={`${isReadMode ? 'read-mode' : ''}`}>
      {isReadMode ? (
        <div className="read-mode-content">
          <h2>{name}</h2>
          <img
            src={image}
            alt={alt}
            className='w-full h-full object-cover rounded-2xl'
          />
          <p>{description}</p>
          <div className='mt-4 gap-2'>
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className="mt-2"
                style={{ color: 'var(--content)', margin: 0 }}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className='project-card readable'>
            <div className='image-container relative w-full h-64 md:h-56'>
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
        </>
      )}
    </div>
  );
};

const Writings = () => {
  const { isReadMode, contentWidth } = useAccessibility();

  return (
    <>
      {isReadMode ? (
        <div className="read-mode-content">
          <h1>Writings.</h1>
          {writings.map((writing, index) => (
            <WritingCard key={`writing-${index}`} {...writing} />
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
          <motion.div
            variants={textVariant()}
            className='sm:mt-12 mt-16'
          >
            <h1 className="section-heading readable">Writings.</h1>
          </motion.div>
          <div className='project-cards-container'>
            {writings.map((writing, index) => (
              <WritingCard key={`writing-${index}`} {...writing} />
            ))}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Writings, "writings")




