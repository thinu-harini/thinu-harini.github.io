import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';

import { slideIn } from "../utils/motion";
import { TypeAnimation } from 'react-type-animation';

import { styles } from '../styles';
import { SectionWrapper } from "../hoc";

import SocialIcons from './SocialIcons';
import { Canvas } from '@react-three/fiber'
import Loader from './Loader';

import Girl from '../models/Girl.jsx';
import HomeInfo from '../components/HomeInfo.jsx';
import Bird from '../models/Bird.jsx';

const Hero = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustGirlForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;
    let rotation = [0.1, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [2.4, 2.4, 2.4];
      screenPosition = [0, -2.55, 0];
    } else {
      screenScale = [4, 4, 4];
      screenPosition = [0.55, -3.8, -4];
    }

    return [screenScale, screenPosition, rotation]
  }

  // const adjustBirdForScreenSize = () => {
  //   let screenScale, screenPosition;
  //   if (window.innerWidth < 768) {
  //     screenScale = [1, 1, 1];
  //     screenPosition = [0, 0, 0];
  //   } else {
  //     screenScale = [1.2, 1.2, 1.2];
  //     screenPosition = [-0.8, -2.5, 0];
  //   }
  //   console.log("Screen Scale:", screenScale);
  //   console.log("Screen Position:", screenPosition);
  //   return [screenScale, screenPosition];
  // };

  const [girlScale, girlPosition, girlRotation] = adjustGirlForScreenSize();
  // const [birdScale, birdPosition] = adjustBirdForScreenSize();

  return (
    <div className={`motion-container xl:mt-8 lg:mt-8 md:mt-8 gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className={`leftDiv px-8 py-8 rounded-2xl md:h-auto h-auto`}
      >
        <h1 className={`${styles.heroHeadText}`}>
          Hi, <span className="highlight-text">Thinu</span> here
        </h1>

        <h2 className={`${styles.heroSubText}`}>I am a&nbsp;
          <TypeAnimation
            sequence={[
              'UX Researcher',
              1000, // wait 1s
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

        <p className={`${styles.heroContent}`}>
          A UI/UX designer on a mission to level up experiences
          in the digital world with creative thinking and problem-solving
          characteristics and strengths like effective communication.
          Equipped with qualitative and quantitative research armors,
          I play the missions creating seamless interactions that bridge
          the gap between user needs and business goals.
        </p>

        <div className="items-center gap-4 mt-4 flex">
          <h1 className={`${styles.heroContentA} italic`}>
            Let's Connect :
          </h1>
          <SocialIcons />
        </div>

        <div className={`${styles.paddingB} flex-row items-start gap-4`}>
          <button>
            <a className="button" href="https://drive.google.com/file/d/1sMoRZWh8Hw3RyWdPOz16HU8iiVdWUrAX/view?usp=drive_link" download="cv_thinu_premachandra.pdf" target="_blank">
              Download Résumé
            </a>
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("up", "tween", 0.8, 1)}
        className={`rightDiv xl:flex-1 xl:h-auto md:h-[600px] h-[450px]`}
      >
        <div className='absolute top-24 left-0 right-0 z-10 flex items-center justify-center'>
          {currentStage && <HomeInfo currentStage={currentStage} />}
        </div>

        <Canvas
          className={`w-full h-screen relative ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
          camera={{ near: 0.1, far: 1000, fov: 45, position: [-1, 0, 7] }}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <hemisphereLight
              skyColor='#b1e1ff'
              groundColor='#000000'
              intensity={1}
            />
            <pointLight intensity={1} />
            <spotLight
              position={[0, 50, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
              castShadow
              shadow-mapSize={{ width: 1024, height: 1024 }}
            />
            {/* <Bird
              scale={birdScale}
              position={birdPosition}
              // rotation={[0, 20, 0]}
              isRotating={isRotating}
            /> */}
            {/* <Sky isRotating={isRotating} /> */}

            <Girl
              scale={girlScale}
              position={girlPosition}
              rotation={girlRotation}
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
            />

          </Suspense>
        </Canvas>

      </motion.div>

      {/* scroll button */}
      <div className='absolute z-20 bottom-12 flex justify-center items-center'
        style={{ left: '50%', transform: 'translateX(-50%)' }}>
        <a href='#about'>
          <div className="scroll-button w-[35px] h-[64px] rounded-3xl border-4  justify-center items-start p-2 hidden md:flex">
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className='scroll-button-motion w-3 h-3 rounded-full mb-1'
            />
          </div>
        </a>
      </div>

    </div >
  )
}

// export default Hero;
export default SectionWrapper(Hero, "home");
