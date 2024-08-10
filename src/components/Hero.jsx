import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

import { slideIn } from "../utils/motion";
import { TypeAnimation } from 'react-type-animation';

import { styles } from '../styles';
import { SectionWrapper } from "../hoc";

import { Canvas } from '@react-three/fiber'
import CanvasLoader from './CanvasLoader';
import HeroGirlModel from '../models/HeroGirl';
import SocialIcons from './SocialIcons';

const Hero = () => {

  const adjustGirlForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;
    let rotation = [-0.1, -0.1, 0];

    if (window.innerWidth < 768) {
      screenScale = [2.5, 2.5, 2.5];
      screenPosition = [0.1, -2.5, 0];
    }
    else {
      screenScale = [4, 4, 4];
      screenPosition = [1, -3.8, -4];
    }
    return [screenScale, screenPosition, rotation]
  }
  const [girlScale, girlPosition, girlRotation] = adjustGirlForScreenSize();

  return (
    <div className={`motion-container xl:mt-18 lg:mt-16 md:mt-10 gap-10 overflow-hidden`}>
      <motion.div
        // variants={slideIn("up", "tween", 0.2, 1)}
        className={`left-div px-10 py-8 rounded-2xl md:h-auto h-auto`}
      >
        <h1 className={`${styles.heroHeadText}`}>
          Hi, <span className="highlight-text">Thinu</span> here
        </h1>

        <p className={`${styles.heroSubText}`}>A&nbsp;
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
        </p>

        <p className={`${styles.heroContent} mt-6`}>
          I am a UI/UX designer on a mission to level up experiences
          in the digital world with creative thinking and problem-solving
          characteristics.
          I play the missions creating seamless interactions that bridge
          the gap between user needs and business goals.
        </p>

        <div className={`${styles.buttonText} flex-row items-start mt-6`}>
          <Link to="/contact" className="button">
            Contact
          </Link>

          <a className="button" href="https://drive.google.com/file/d/1RYFG573_ciYfX3PbBi4RoAHWWK94Jp-B/view?usp=sharing" download="cv_thinu_premachandra.pdf" target="_blank">
            Résumé
          </a>
        </div>

        <div className="items-center gap-4 flex mt-8 mb-0">
          <p className={`${styles.heroContent}`}>
            Let's Connect :
          </p>
          <SocialIcons />
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("up", "tween", 0.8, 1)}
        className={`right-div xl:flex-1 xl:h-auto md:h-[600px] h-[450px]`}
      >
        <Canvas
          className={`h-screen relative`}
          camera={{ near: 0.1, far: 1000, fov: 45, position: [-1, 0, 7] }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={1} />
            <hemisphereLight
              skyColor='#b1e1ff'
              groundColor='#000000'
              intensity={1}
            />
            <pointLight position={[0, 0, 0]} intensity={1} />

            <HeroGirlModel
              scale={girlScale}
              position={girlPosition}
              rotation={girlRotation}
            // isRotating={isRotating}
            // setIsRotating={setIsRotating}
            // setCurrentStage={setCurrentStage}
            />

          </Suspense>
        </Canvas>
      </motion.div>

    </div >
  )
}

export default SectionWrapper(Hero, "home");
