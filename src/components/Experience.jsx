import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRightFilled } from "react-icons/tb";
const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(null);

  const handlePrevCard = () => {
    const newActiveTab = activeTab - 1;
    if (newActiveTab >= 0) {
      setActiveTab(newActiveTab);
      scrollToCard(newActiveTab);
    }
  };

  const handleNextCard = () => {
    const newActiveTab = activeTab + 1;
    if (newActiveTab < experiences.length) {
      setActiveTab(newActiveTab);
      scrollToCard(newActiveTab);
    }
  };

  //swiping for small screens
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (!touchStartX.current) return;

    const touchEndX = event.changedTouches[0].clientX;
    const touchDifference = touchEndX - touchStartX.current;

    if (Math.abs(touchDifference) > 50) { // threshold
      const direction = touchDifference > 0 ? -1 : 1;
      const newActiveTab = activeTab + direction;

      if (newActiveTab >= 0 && newActiveTab < experiences.length) {
        setActiveTab(newActiveTab);
        scrollToCard(newActiveTab);
      }
    }

    touchStartX.current = null;
  };

  //scrolling 
  const scrollToCard = (index) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector('.experience-card').offsetWidth;
      let scrollLeft;

      if (window.innerWidth < 768) { // Small screens
        scrollLeft = index * cardWidth;
      } else { // Large screens
        const marginWidth = 40;
        scrollLeft = index * (cardWidth + marginWidth);
      }

      sliderRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  };

  //active tab large screens
  const handleCardClick = (index) => {
    setActiveTab(index);
    scrollToCard(index);
  };

  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Journey So Far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="tabs mt-6 mb-6">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(index);
              scrollToCard(index);
            }}
          >
            {experience.tab_name}
          </div>
        ))}
      </div>

      <div
        className='experience-slider-container relative overflow-hidden'
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className='experience-slider'>
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className={`experience-card ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <h3 className={`${styles.experienceHeadText}`}>
                {experience.title}
              </h3>

              <p
                className={`${styles.experienceSubText}`}
                style={{ margin: 0 }}
              >
                {experience.company_name}
              </p>

              <ul className='experience_bullets'>
                {experience.points.map((point, index) => (
                  <li
                    key={index}
                    className={`${styles.cardContent}`}
                  >
                    <span className="experience_bullets-marker"></span>
                    <div>
                      {point}
                    </div>
                  </li>
                ))}
              </ul>

              <p
                className={`${styles.experienceDate}`}
                style={{ marginTop: 20 }}
              >
                {experience.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Arrow buttons */}
      <button
        className="arrow-icon absolute top-1/2 left-4"
        onClick={handlePrevCard}
        disabled={activeTab === 0}
      >
        <TbSquareRoundedArrowLeftFilled />
      </button>

      <button
        className="arrow-icon absolute top-1/2 right-4"
        onClick={handleNextCard}
        disabled={activeTab === experiences.length - 1}
      >
        <TbSquareRoundedArrowRightFilled />
      </button>

      {/* Carousel Indicator */}
      <div className="carousel-indicator">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`indicator-line ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");
