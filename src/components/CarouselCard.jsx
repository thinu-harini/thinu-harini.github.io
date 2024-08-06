import React from 'react';
import { styles } from '../styles';

const CarouselCard = ({ title, subtitle, paragraph, link }) => {
  return (
    <div className="slide-content">
      <h1 className={`${styles.contentHeadText}`}>{title}</h1>
      <h2 className={`${styles.contentSubText}`}>{subtitle}</h2>
      <p className={`${styles.content}`}>{paragraph}</p>
    </div>
  );
};

export default CarouselCard;