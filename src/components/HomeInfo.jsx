import React from 'react';
import { HiCursorClick } from "react-icons/hi";
import { GiClick } from "react-icons/gi";

const InfoBox = ({ link, btnText }) => {
  const handleClick = () => {
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='info-box'>
      <button className={`neo-btn`} onClick={handleClick}>
        {btnText}
        {window.innerWidth <= 767 ? (
          <>
            <span className="icon-wrapper">
              <GiClick className="icon-touch" />
            </span>
          </>
        ) : (
          <>
            <span className="icon-wrapper">
              <HiCursorClick className="icon-click" />
            </span>
          </>
        )}
      </button>
    </div>
  );
};

const renderContent = {
  1: (
    <InfoBox
      btnText="Shall we jump straight into my portfolio?"
      link="#projects"
    />
  ),
  2: (
    <InfoBox
      btnText="Or maybe some details about me first?"
      link="#about"
    />
  ),
  3: (
    <InfoBox
      btnText="Wanna know about my work history?"
      link="#experience"
    />
  ),
  4: (
    <InfoBox
      btnText="Let's get in touch amigo!"
      link="#contact"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo;
