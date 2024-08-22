import React, { useEffect, useState } from 'react';
import { NightCanvas, DayCanvas } from '../components/canvas';
import Carousel from '../components/Carousel';
import { HexagonCanvas } from '../components';
import wall from '../assets/wall5.svg';
import roof from '../assets/roof.svg';
import { Link } from 'react-router-dom';

const Home = ({ isDark }) => {

  return (
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

      <div className="hexagon-canvas">
        <HexagonCanvas />
      </div>

    </div>
  );
};

export default Home;
