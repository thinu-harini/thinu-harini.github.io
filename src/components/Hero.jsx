/*
Author: Ivan Norman (https://sketchfab.com/vanidza)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/cartoon-girl-a4bf221f620e49f8bc7af53e6d6a4f3c
Title: Cartoon girl
*/

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';

import { slideIn } from "../utils/motion";
import { TypeAnimation } from 'react-type-animation';

import { styles } from '../styles';
import { SectionWrapper } from "../hoc";
import { GirlCanvas } from './canvas';
import SocialIcons from './SocialIcons';

import { Canvas } from '@react-three/fiber'
import Loader from './Loader';
import Animal from '../models/Animal';
import Sky from '../models/Sky';
import HomeInfo from '../components/HomeInfo.jsx';

const Hero = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustAnimalForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;
    // let screenPosition = [0, 0, 0];
    let rotation = [0.1, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [2.4, 2.4, 2.4];
      screenPosition = [0, -2.55, 0];
    } else {
      screenScale = [4, 4, 4];
      screenPosition = [1, -3.5, -4];
    }

    // let screenScale = null;
    // let screenPosition = [0, -6.5, -43];
    // let rotation = [0.1, 47, 0];

    // if (window.innerWidth < 768) {
    //   screenScale = [0.9, 0.9, 0.9];
    // } else {
    //   screenScale = [1, 1, 1];
    // }

    return [screenScale, screenPosition, rotation]
  }

  const [animalScale, animalPosition, animalRotation] = adjustAnimalForScreenSize();

  return (
    // flex-col-reverse
    // <div className={`xl:mt-8 flex xl:flex-row gap-10 overflow-hidden`}></div>
    <div className={`motion-container xl:mt-8 gap-10 overflow-hidden`}>
      {/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div> */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className={`leftDiv px-8 py-8 rounded-2xl flex-[1.75]`}
      // className={`hero-bg flex-[1.75] px-8 py-8 rounded-2xl`}
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

            <a className="button" href="https://drive.google.com/file/d/1sMoRZWh8Hw3RyWdPOz16HU8iiVdWUrAX/view?usp=drive_link" download="cv_thinu_premachandra.pdf" target="_blank">
              Download Résumé
            </a>
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("up", "tween", 0.8, 1)}
        className={`rightDiv xl:flex-1 xl:h-auto md:h-[550px] h-[450px]`}
      >
        <div className='absolute top-24 left-0 right-0 z-10 flex items-center justify-center'>
          {currentStage && <HomeInfo currentStage={currentStage} />}
        </div>
        <Canvas
          className={`w-full h-screen relative ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
          camera={{ near: 0.1, far: 200, fov: 45, position: [-1, 0, 7] }}
        // shadows
        // frameloop='demand'
        // dpr={[1, 2]}
        // gl={{ preserveDrawingBuffer: true }}
        // camera={{
        //   fov: 45,
        //   near: 0.1,
        //   far: 200,
        //   position: [-4, 3, 6],
        // }}
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
              position={[-20, 50, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
              shadow-mapSize={{ width: 1024, height: 1024 }}
            />

            {/* <Sky isRotating={isRotating} /> */}
            <Animal
              position={animalPosition}
              scale={animalScale}
              rotation={animalRotation}
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
            />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* scroll button */}
      <div className='absolute bottom-20 w-full flex justify-center items-center'
        style={{ left: '50%', transform: 'translateX(-50%)' }}>
        <a href='#about'>
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary justify-center items-start p-2 hidden sm:flex">
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>

    </div >
  )
}

// export default Hero;
export default SectionWrapper(Hero, "home");
