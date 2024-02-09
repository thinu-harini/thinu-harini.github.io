import React from 'react';
import { motion } from 'framer-motion';

import { slideIn } from "../utils/motion";
import { TypeAnimation } from 'react-type-animation';

import { styles } from '../styles';
import { SectionWrapper } from "../hoc";
import { GirlCanvas } from './canvas';
import SocialIcons from './SocialIcons';

const Hero = () => {
  return (
    // <div className="relative w-full h-screen mx-auto">
    <div className={`xl:mt-8 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[1.75] bg-black-100 bg-opacity-50 px-8 py-8 rounded-2xl'
      >
        <h1 className={`${styles.heroHeadText}`}>
          Hi, <span className="text-[#915eff]">Thinu</span> here
        </h1>

        <h2 className={`${styles.heroSubText}`}>I am a&nbsp;
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              'UX Researcher',
              1000, // wait 1s before replacing the word
              'UI Developer ',
              1000,
              'Creative Designer ',
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ display: 'inline-block' }}
            repeat={Infinity}
          />
        </h2>

        {/* <p className='mt-4 text-[17px] max-w-3xl leading-[30px]'> */}
        <p className={`${styles.heroContent} mt-2 text-white-100`}>
          A UI/UX designer on a mission to level up experiences
          in the digital world with creative thinking and problem-solving
          characteristics and strengths like effective communication.
          Equipped with qualitative and quantitative research armors,
          I play the missions creating seamless interactions that bridge
          the gap between user needs and business goals.
        </p>

        <div >
          <h1 className={`${styles.heroContentA} italic`}>
            Let's Connect.
          </h1>
          <SocialIcons />
        </div>

        <div className={`${styles.paddingB} flex flex-row items-start gap-4`}>
          <button>
            {/* <a className="button" href="src/assets/cv.pdf" download="cv_thinu_premachandra.pdf"> */}
            <a className="button" href="https://drive.google.com/file/d/1sMoRZWh8Hw3RyWdPOz16HU8iiVdWUrAX/view?usp=drive_link" download="cv_thinu_premachandra.pdf" target="_blank">
              Download Résumé
            </a>
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("up", "tween", 0.8, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <GirlCanvas />
      </motion.div>

      <div
        className='hidden xs:block absolute xs:bottom-15 bottom-20 w-auto flex justify-center items-center'
        style={{ left: '50%', transform: 'translateX(-50%)' }}>
        <a href='#about'>
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.dev
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
      {/* </div> */}
    </div >
  )
}

// export default Hero;
export default SectionWrapper(Hero, "hero");
