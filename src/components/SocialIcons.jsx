import React from 'react';
import { FaLinkedin, FaBehanceSquare, FaMediumM } from 'react-icons/fa';
import { PiDribbbleLogoFill } from "react-icons/pi";
import { IoMail } from "react-icons/io5";

const SocialIcons = () => {
  return (
    <div className="social-icons">
      <a
        href="https://www.linkedin.com/in/thinu-harini/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        title="LinkedIn Profile"
        className="social-icon"
      >
        <FaLinkedin />
      </a>

      <a href="https://dribbble.com/thinu_harini"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Dribbble Profile"
        title="Dribbble Profile"
        className="social-icon"
      >
        <PiDribbbleLogoFill />
      </a>

      {/* <a href="https://www.behance.net/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Behance Profile"
        title="Behance Profile"
        className="social-icon"
      >
        <FaBehanceSquare />
      </a> */}

      {/* <a href="https://medium.com/@thinu.harini"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Medium Profile"
        title="Medium Profile"
        className="social-icon"
      >
        <FaMediumM />
      </a> */}

      <a
        href="mailto:thinu.harini@gmail.com"
        rel="noopener noreferrer"
        aria-label="Email"
        title="Email"
        className="social-icon"
      >
        <IoMail />
      </a>
    </div>
  );
};

export default SocialIcons;
