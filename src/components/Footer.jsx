import React from "react";
import SocialIcons from './SocialIcons';
import { Link } from "react-router-dom";
import { useAccessibility } from "./AccessibilityContext";

const Footer = () => {
  const { isTooltipMode } = useAccessibility();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div id="footer" className="footer">

      <div className="flex flex-col items-center md:items-center">
        <Link to="/contact" className="button-text button" data-tooltip={isTooltipMode ? 'Go to contact page' : null}>
          Contact
        </Link>

        <div className="flex flex-row gap-4 mt-8 items-center">
          <p className="hero-text">Let's Connect :</p>
          <SocialIcons />
        </div>

      </div>

      <div className="content-text footer-content text-center mt-8">
        Designed and built by Thinu Harini <br />
        &#169; thinu-harini.github.io | All rights reserved
      </div>
    </div>
  )
}

export default Footer;
