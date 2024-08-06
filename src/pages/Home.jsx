import React from 'react';
import { NightCanvas, DayCanvas } from '../components/canvas';
import Carousel from '../components/Carousel';
import { HexagonCanvas } from '../components';
import wall from '../assets/home_wallpaper.svg';

const Home = ({ isDark }) => {
  return (
    <div className="home-container">
      {isDark ? <NightCanvas /> : <DayCanvas />}
      {/* Wall layer with SVG mask for windows */}
      <div className="wall-layer">
        <img src={wall} alt="Wall with Windows" className="wall-with-windows" />
      </div>

      <div className="home-content">
        <Carousel />
      </div>

      {/* <div className="hexagon-canvas">
        <HexagonCanvas />
      </div> */}
    </div>
  );
};

export default Home;
