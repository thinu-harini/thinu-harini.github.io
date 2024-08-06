import React from "react";
import { styles } from "../styles";
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
    <div className="footer">

      <div className='scroll-down-button relative bottom-6 flex justify-center items-center' style={{ left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}>
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
      </div>

      <div className={`flex flex-col items-center md:items-center md:px-4 px-4 py-4`}>
        <button>
          <Link to="/contact" className="button">
            Say Hello
          </Link>
        </button>

        <p className={`${styles.heroContent}, py-2`}>
          Let's Connect.
        </p>
        <SocialIcons />
      </div>

      <div className={`${styles.content} footer-content text-center mt-4`}>
        Designed and built by Thinu Harini <br />
        &#169; thinu-harini.github.io | All rights reserved
      </div>

    </div>
  )
}

export default Footer;