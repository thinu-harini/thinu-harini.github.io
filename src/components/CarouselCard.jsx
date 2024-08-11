import React from 'react';
import { styles } from '../styles';

const CarouselCard = ({ title, subtitle, image, alt, list }) => {
  return (
    <div className="slide-content">
      <h1 className={`${styles.contentHeadText} mb-6`}>{title}</h1>
      <p className={`${styles.contentSubText} mb-2`}>{subtitle}</p>

      {list && list.length > 0 && (
        <ul className="item-list">
          {list.map((item, index) => (
            <li key={index} className={`${styles.heroContent} list-item`}>{item}</li>
          ))}
        </ul>
      )}

      {/* <div className="slide-image-container">
        <img src={image} alt={alt} className="carousel-image" />
      </div> */}
      <p className={`${styles.contentSubText} absolute m-4 right-0 bottom-0`}> Click to navigate &gt;&gt;</p>
    </div>
  );
};

export default CarouselCard;