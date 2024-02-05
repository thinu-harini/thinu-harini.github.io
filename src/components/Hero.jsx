import { motion } from 'framer-motion';

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';
import { TypeAnimation } from 'react-type-animation';
// import Button from './button';

const Hero = () => {

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>Hi, <span className="text-[#915eff]">Thinu</span> here</h1>
          <p className={`${styles.heroSubText} text-white`}>I am a </p> <br />

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
            className={`${styles.heroSubText} text-white`}
            speed={50}
            // style={{fontSize: '2em', display: 'inline-block' }}
            repeat={Infinity}
          />

          {/* <p className={`${styles.heroContent} mt-2 text-white-100`}>
            Let's bake some amazing customer experiences! I am a graduate from Faculty of IT,<br className="sm:block hidden" />
            University of Moratuwa. I am an enthusiastic and innovative UX/UI Designer with a<br className="sm:block hidden" />
            keen eye for user-centric solutions. My focus is on creating seamless interactions<br className="sm:block hidden" />
            that bridge the gap between user needs and business goals.<br className="sm:block hidden" />
          </p> */}

          <div>
          <button className='bg-tertiary py-3 px-8 rounded-lg outline-none w-fit text-white font-bold shadow-md shadow-primary'>
            Download Résumé
            </button>
            <button className='bg-tertiary py-3 px-8 rounded-lg outline-none w-fit text-white font-bold shadow-md shadow-primary'>
            Visit Dribbble
            </button>
          </div>

        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
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
    </section >
  )
}

export default Hero