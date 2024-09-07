import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { experiences, tabNamesForSmallScreens } from '../constants';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import Footer from './Footer';
import { useAccessibility } from './AccessibilityContext';
import '../assets/styles/Experience.css';
import Tooltip from './Tooltip';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { isReadMode, contentWidth } = useAccessibility();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 993);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial screen size
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

      if (window.innerWidth < 993) {
        scrollLeft = index * cardWidth;
      } else {
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
      {isReadMode ? (
        <div className="read-mode-content">

          <h1 className="readable">Experience.</h1>
          {experiences.map((experience, index) => (
            <div
              className="readable"
              key={index}
            >
              <h2>{experience.title}</h2>
              <h3>{experience.company_name}</h3>
              <p>{experience.date}</p>
              <ul>
                {experience.points.map((point, index) => (
                  <li key={index}>
                    <p>
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
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
          <motion.div variants={textVariant()}>
            <h1 className="section-heading readable">Work Experience.</h1>
          </motion.div>

          <div className="button-text tabs mt-6 mb-6">
            {isSmallScreen ? (
              tabNamesForSmallScreens.map((tabName, index) => (
                <div
                  key={index}
                  className={`tab ${activeTab === index ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(index);
                    scrollToCard(index);
                  }}
                >
                  {tabName}
                </div>
              ))
            ) : (
              experiences.map((experience, index) => (
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
              ))
            )}
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
                  className={`experience-card ${activeTab === index ? 'active' : ''} readable`}
                  onClick={() => handleCardClick(index)}
                >
                  <h2 className="content-heading">
                    {experience.title}
                  </h2>

                  <h3 className="content-subheading">
                    {experience.company_name}
                  </h3>

                  <ul className='experience_bullets'>
                    {experience.points.map((point, index) => (
                      <li
                        key={index}
                        className="content-text mt-4"
                      >
                        <span className="experience_bullets-marker"></span>
                        <div>
                          {point}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <p
                    className="content-text mt-4"
                    style={{ fontWeight: '500', fontStyle: 'italic' }}
                  >
                    {experience.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Arrow buttons */}
          <button
            className="arrow-icon absolute left-4"
            style={{ top: '40%' }}
            onClick={handlePrevCard}
            disabled={activeTab === 0}
            aria-label="Previous Slide"
          >
            <TbSquareRoundedArrowLeftFilled data-tooltip="Switch theme" />
          </button>

          <button
            className="arrow-icon absolute right-4"
            style={{ top: '40%' }}
            onClick={handleNextCard}
            disabled={activeTab === experiences.length - 1}
            aria-label="Next Slide"
          >
            <TbSquareRoundedArrowRightFilled data-tooltip="Switch theme" />
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
          <Footer />
        </div>
      )}
      <Tooltip />
    </div >
  );
};

export default SectionWrapper(Experience, "experience");