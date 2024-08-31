import React from "react";
import { motion } from "framer-motion";
import SocialIcons from './SocialIcons';
import { FaAnglesUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div id="footer" className="footer">

      {/* <div className='scroll-up-button relative bottom-6 flex justify-center items-center py-6' style={{ left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}>
        <motion.div
          animate={{
            y: [0, 24, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
          onClick={scrollToTop}
        >
          <FaAnglesUp size={32} />
        </motion.div>
      </div> */}

      <div className="flex flex-col items-center md:items-center">
        <Link to="/contact" className="button-text button" >
          Contact
        </Link>

        <div className="flex flex-row gap-4 mt-8">
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
