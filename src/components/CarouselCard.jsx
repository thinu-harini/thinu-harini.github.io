import React from 'react';

const CarouselCard = ({ title, subtitle, list }) => {
  return (
    <div className="slide-content">
      <h1 className="content-heading mb-6">{title}</h1>
      <p className="content-subheading mb-2">{subtitle}</p>

      {list && list.length > 0 && (
        <ul className="item-list">
          {list.map((item, index) => (
            <li key={index} className="hero-text list-item">{item}</li>
          ))}
        </ul>
      )}

      <p className="content-subheading absolute m-4 right-0 bottom-0"> Click to navigate &gt;&gt;</p>
    </div>
  );
};

export default CarouselCard;