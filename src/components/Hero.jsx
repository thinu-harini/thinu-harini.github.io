import React from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from "../hoc";
import { ComputersCanvas } from './canvas';
import { TypeAnimation } from 'react-type-animation';
import Socials from './Socials';
// import { socialLinks } from '../constants';
// import { linkedin } from '../assets/linkedin.png';

const Hero = () => {
  return (
    <div className="relative w-full h-screen mx-auto">
      <div className={`xl:mt-12 xl:flex-row flex-col-reverse flex gap-2 overflow-hidden`}>
        <div className={`flex-[1.75]`}>
          <h1 className={`${styles.heroHeadText}`}>
            Hii, <span className="text-[#915eff]">Thinu</span> here
          </h1>

          <h2 className={`${styles.heroSubText}`}>I am a&nbsp;
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'UX Researcher',
                1000, // wait 1s before replacing the word
                'UI Developer',
                1000,
                'Creative Designer',
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ display: 'inline-block' }}
              // style={{fontSize: '2em', display: 'inline-block' }}
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
            <Socials />
          </div>

          <div className={`${styles.paddingB} flex flex-row items-start gap-4`}>
            <button className='py-6 shadow-md shadow-primary font-bold w-fit'>
              <a className="button" href="src/assets/cv.pdf" download="cv_thinu_premachandra.pdf">
                Download Résumé
              </a>
            </button>
          </div>
          {/* <button
              type='submit'
              className='py-4 rounded-lg w-fit text-white font-bold shadow-md shadow-primary'
            >
              <a className="button" href="https://dribbble.com/thinu_harini" target="_blank">
                Dribbble
              </a>
            </button> */}
        </div>

        <div className='xl:flex-1 xl:h-auto md:h-[550px] h-[250px]'>
          <ComputersCanvas />
        </div>
      </div>

      <div
        className='absolute xs:bottom-15 bottom-32 w-auto flex justify-center items-center'
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
