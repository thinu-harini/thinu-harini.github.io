import React from 'react';
import { styles } from '../styles';

const CarouselCard = ({ title, subtitle }) => {
  return (
    <div className="slide-content">
      <h1 className={`${styles.contentHeadText} mb-6`}>{title}</h1>
      <p className={`${styles.contentSubText}`}>{subtitle}</p>
      <p className={`${styles.contentSubText} absolute m-4 right-0 bottom-0`}> Click to navigate &gt;&gt;</p>
    </div>
  );
};

export default CarouselCard;