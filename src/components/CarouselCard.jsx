import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Carousel.css';

const CarouselCard = ({ title, subtitle, list, link }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(link);
  };

  return (
    <div className="slide-content readable">
      <h1 className="content-heading mb-6">{title}</h1>
      <h2 className="content-subheading mb-2">{subtitle}</h2>

      {list && list.length > 0 && (
        <ul className="item-list">
          {list.map((item, index) => (
            <li key={index} className="list-item">{item}</li>
          ))}
        </ul>
      )}
      <button onClick={handleButtonClick} className="carousel-slide-button">
        <h2 className="content-subheading"> Navigate to {title} &gt;&gt; </h2>
      </button>
    </div>
  );
};

export default CarouselCard;
