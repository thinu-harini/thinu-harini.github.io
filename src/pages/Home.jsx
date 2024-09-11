import React from 'react';
import { NightCanvas, DayCanvas } from '../components/canvas';
import Carousel from '../components/Carousel';
import { SocialIcons } from '../components';
import wall from '../assets/wall.png';
import roof from '../assets/roof.png';
import floor from '../assets/floor.png';
import { Link, useNavigate } from 'react-router-dom';
import { carouselItems } from "../constants";
import { useAccessibility } from '../components/AccessibilityContext';
import '../assets/styles/Home.css';
import { styles } from '../styles';

const Home = ({ isDark }) => {
  const { isReadMode } = useAccessibility();
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <div className={`${isReadMode ? 'read-mode' : ''}`}>
      {
        isReadMode ? (
          <div className="read-mode-content readable" >
            <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
              <h1>Welcome to My Portfolio</h1>
              <p>Explore my areas of work:</p>
              <ul className="carousel-items-list">
                {carouselItems.map((item, index) => (
                  <li key={index} className="carousel-item">
                    <h2>{item.title}</h2>
                    <p>{item.subtitle}</p>
                    <p className="read-mode-link mb-4"
                      onClick={() => handleNavigation(item.link)}
                    >
                      Navigate to {item.title}
                    </p>
                  </li>
                ))}
              </ul>
            </div >
          </div >
        ) : (
          <>
            <div className="home-container">
              {isDark ? <NightCanvas /> : <DayCanvas />}

              <div className="wall-layer">
                <img src={wall} alt="wall_image" className="wall-bg" />
              </div>

              {/* <div className="floor-layer">
                <img src={floor} alt="floor_image" className="floor-bg" />
              </div> */}

              <div className="home-content">
                <Carousel />

                {/* <div className='home-button-container'>
                  <Link to="/contact" className="button-text button">
                    Contact
                  </Link>

                  <SocialIcons />
                </div> */}

              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default Home;