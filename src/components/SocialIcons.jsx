import React from 'react';
import { FaLinkedin, FaBehanceSquare, FaMediumM } from 'react-icons/fa';
import { PiDribbbleLogoFill } from "react-icons/pi";
import { IoMail } from "react-icons/io5";

const SocialIcons = () => {
  return (
    <div className="social-icons">
      <a href="https://www.linkedin.com/in/thinu-harini/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
      <a href="https://dribbble.com/thinu_harini" target="_blank" rel="noopener noreferrer">
        <PiDribbbleLogoFill />
      </a>
      {/* <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer">
        <FaBehanceSquare />
      </a>
      <a href="https://medium.com/@thinu.harini" target="_blank" rel="noopener noreferrer">
        <FaMediumM />
      </a> */}
      <a href="mailto:thinu.harini@gmail.com" rel="noopener noreferrer">
        <IoMail />
      </a>
    </div>
  );
};

export default SocialIcons;
