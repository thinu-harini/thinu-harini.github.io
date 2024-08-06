import React from 'react';
import { styles } from '../styles';
import { writings } from '../constants';
import { SectionWrapper } from '../hoc';

const WritingCard = ({
  name,
  description,
  tags,
  image,
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

    </div >
  );
};

const Writings = () => {
  return (
    <>
      <div className='mt-10'>
        <h2 className={styles.sectionHeadText}>Writings.</h2>
      </div>

      <div className='mt-10 flex flex-wrap gap-7'>
        {writings.map((writing, index) => (
          <WritingCard key={`writing-${index}`} {...writing} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Writings, "writings")




