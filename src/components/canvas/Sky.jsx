import React from 'react';
import cloud from '/src/assets/cloud.png';

const SkyCanvas = () => {
  return (
    <div className='sky-canvas w-full h-auto absolute inset-0 z-[-1]'>
      <div className="cloud">
        <img src={cloud} className="cloud1" />
        <img src={cloud} className="cloud2" />
        <img src={cloud} className="cloud3" />
        <img src={cloud} className="cloud4" />
        <img src={cloud} className="cloud1" />
        <img src={cloud} className="cloud2" />
        <img src={cloud} className="cloud3" />
        <img src={cloud} className="cloud4" />
        <img src={cloud} className="cloud1" />
        <img src={cloud} className="cloud2" />
      </div>
    </div>
  );
};

export default SkyCanvas;
