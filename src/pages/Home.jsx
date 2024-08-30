// import React, { useEffect, useState } from 'react';
// import { NightCanvas, DayCanvas } from '../components/canvas';
// import Carousel from '../components/Carousel';
// import { HexagonCanvas } from '../components';
// import wall from '../assets/wall5.svg';
// import roof from '../assets/roof.svg';
// import { Link } from 'react-router-dom';
// import '../assets/styles/Home.css';

// const Home = ({ isDark }) => {

//   return (
//     <div className="home-container">
//       {isDark ? <NightCanvas /> : <DayCanvas />}

//       <div className="roof-layer">
//         <img src={roof} alt="roof_image" className="roof-bg" />
//       </div>

//       <div className="wall-layer">
//         <img src={wall} alt="wall_image" className="wall-bg" />
//       </div>

//       <div className="home-content">
//         <Carousel />

//         <div className='button-container'>
//           <Link to="/contact" className="button-text button">
//             Contact
//           </Link>
//         </div>

//       </div>

//       <div className="hexagon-canvas">
//         <HexagonCanvas />
//       </div>

//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { NightCanvas, DayCanvas } from '../components/canvas';
import Carousel from '../components/Carousel';
import { HexagonCanvas } from '../components';
import wall from '../assets/wall5.svg';
import roof from '../assets/roof.svg';
import { Link, useNavigate } from 'react-router-dom';
import { carouselItems } from "../constants";
import { useAccessibility } from '../components/AccessibilityContext';
import '../assets/styles/Home.css';

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
          <div className="read-mode-content" >
            <h1>Welcome to My Portfolio</h1>
            <p>Explore my areas of work:</p>
            <ul className="carousel-items-list">
              {carouselItems.map((item, index) => (
                <li key={index} className="carousel-item">
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
                  <Link to={item.link} className="button-text button">
                    Learn More
                  </Link>
                  <p className="read-mode-link"
                    onClick={() => handleNavigation(item.link)}
                  >
                    Navigate to {item.title}
                  </p>
                </li>
              ))}
            </ul>
          </div >
        ) : (
          <>
            <div className="home-container">
              {isDark ? <NightCanvas /> : <DayCanvas />}

              <div className="roof-layer">
                <img src={roof} alt="roof_image" className="roof-bg" />
              </div>

              <div className="wall-layer">
                <img src={wall} alt="wall_image" className="wall-bg" />
              </div>

              <div className="home-content">
                <Carousel />

                <div className='button-container'>
                  <Link to="/contact" className="button-text button">
                    Contact
                  </Link>
                </div>

              </div>

              {/* <div className="hexagon-canvas">
                <HexagonCanvas />
              </div> */}

            </div>
          </>
        )}
    </div>
  );
};

export default Home;