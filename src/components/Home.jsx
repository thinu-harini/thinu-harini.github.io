/*
https://www.freepik.com/free-vector/mountains-cleft-view-from-bottom-night-scenery-landscape-with-high-rocks-full-moon-with-stars-glowing-peaks_13194970.htm#page=1&query=Scene&position=38"
Image by upklyak
on Freepik
*/

import { TypeAnimation } from "react-type-animation";
import { styles } from "../styles";
import { motion } from 'framer-motion';

import moon from '../assets/moon.png';
// import mountains_behind from '../assets/mountains_behind.png';
import mountains_front from '../assets/mountains_front.png';
import girl from '../assets/girl.png';
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      let moonElement = document.getElementById('moon');
      let mountainsFrontElement = document.getElementById('mountains_front');
      // let mountainsBehindElement = document.getElementById('mountains_behind');

      let value = window.scrollY;
      moonElement.style.top = value * 1.05 + 'px';
      mountainsFrontElement.style.top = value * 0 + 'px';
      // mountainsBehindElement.style.top = value * 0.5 + 'px';
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section>
      <div className="homesection" >
        <img src={moon} className="moon" id="moon" alt="Moon" />
        {/* <img src={mountains_behind} className="mountains_behind" id="mountains_behind" alt="Mountains Behind" /> */}
        <img src={mountains_front} className="mountains_front" id="mountains_front" alt="Mountains Front" />

        <div className="hometext" >
          <h2 className={`${styles.heroHeadText}`}>
            <TypeAnimation
              sequence={['Hello World!']}
              wrapper="span"
              speed={10}
              style={{ display: 'inline-block' }}
            />
          </h2>
        </div>

      </div >
      <img src={girl} className="girl" id="girl" alt="girl" />

    </section >
  )
}

export default Home;
