/*
https://www.freepik.com/free-vector/mountains-cleft-view-from-bottom-night-scenery-landscape-with-high-rocks-full-moon-with-stars-glowing-peaks_13194970.htm#page=1&query=Scene&position=38"
Image by upklyak
on Freepik
*/

import { TypeAnimation } from "react-type-animation";
import { styles } from "../styles";
import { motion } from 'framer-motion';

import moon from '../assets/moon.png';
import mountains from '../assets/mountains.png';
import girl from '../assets/girl.png';
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      let moonElement = document.getElementById('moon');
      let mountainsElement = document.getElementById('mountains');
      let hometextElement = document.getElementById('hometext');

      let value = window.scrollY;
      moonElement.style.top = value * 1.05 + 'px';
      mountainsElement.style.top = value * 0 + 'px';
      hometextElement.style.marginRight = value * 4 + 'px';
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative">
      <div className="homesection" >
        <img src={moon} className="moon" id="moon" />
        <img src={mountains} className="mountains" id="mountains" />

        <div className="hometext" id="hometext" >
          <h2 className={`${styles.homeText}`}>
            <TypeAnimation
              sequence={['Hello World!']}
              wrapper="span"
              speed={10}
              style={{ display: 'inline-block' }}
            />
          </h2>
        </div>

      </div >
      <img src={girl} className="girl" id="girl" />
    </section>
  )
}

export default Home;
