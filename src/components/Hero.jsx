import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

import { TypeAnimation } from 'react-type-animation';

import { SectionWrapper } from "../hoc";
import { Canvas } from '@react-three/fiber'
import CanvasLoader from './CanvasLoader';
import SocialIcons from './SocialIcons';
import { useAccessibility } from './AccessibilityContext';
import '../assets/styles/Hero.css';
import useScrollPosition from '../hooks/useScrollPosition';
const HeroGirlModel = React.lazy(() => import('../models/HeroGirl'));

const Hero = () => {
  const { isReadMode, isTooltipMode, contentWidth } = useAccessibility();
  const isInView = useScrollPosition(200);

  const adjustGirlForScreenSize = () => {
    let screenScale = window.innerWidth < 768 ? [2.6, 2.6, 2.6] : [4.4, 4.4, 4.4];
    let screenPosition = window.innerWidth < 768 ? [0.1, -2.6, 0.1] : [1, -3.8, -4];
    return [screenScale, screenPosition, [-0.1, -0.1, 0]];
  };

  const [girlScale, girlPosition, girlRotation] = adjustGirlForScreenSize();

  return (
    <div>
      {isReadMode ? (
        <div className="read-mode-content readable">
          <h1>About</h1>
          <h2>Hi, Thinu here</h2>
          <p>
            I am a UI/UX designer on a mission to level up experiences
            in the digital world with creative thinking and problem-solving
            characteristics.
            I play the missions creating seamless interactions that bridge
            the gap between user needs and business goals.
          </p>
          <a
            className="read-mode-link"
            href="https://drive.google.com/file/d/1RYFG573_ciYfX3PbBi4RoAHWWK94Jp-B/view?usp=sharing"
            download="cv_thinu_premachandra.pdf"
            target="_blank"
          >
            <p>Download my résumé</p>
          </a>
          <p>Let's Connect :</p>
          <a
            className="read-mode-link"
            href="https://dribbble.com/thinu_harini"
            target="_blank"
          >
            <p>Dribbble</p>
          </a>
        </div>
      ) : (

        <div style={{
          width: `${contentWidth}%`,
          justifyContent: 'center',
          margin: '0 auto',
          transition: 'width 0.3s ease'
        }}>
          <div className={`motion-container xl:mt-18 lg:mt-16 md:mt-10 gap-10 overflow-hidden`}>
            <div className={`left-div md:h-auto h-auto`}>
              <div className="hero-board" id="hero-left-content">
                <h1 className="hero-heading readable">
                  Hi, <span className="hero-highlight-text">Thinu</span> here
                </h1>

                <p className="hero-subheading">A&nbsp;
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

                <p className="hero-text mt-6 readable">
                  I am a UI/UX designer on a mission to level up experiences
                  in the digital world with creative thinking and problem-solving
                  characteristics.
                  I play the missions creating seamless interactions that bridge
                  the gap between user needs and business goals.
                </p>

                <div className="button-text flex-row items-start mt-6">
                  <Link to="/contact" className="button mr-2 mb-2" data-tooltip={isTooltipMode ? 'Go to contact page' : null}>
                    Contact
                  </Link>

                  <a
                    className="button"
                    href="https://drive.google.com/file/d/1RYFG573_ciYfX3PbBi4RoAHWWK94Jp-B/view?usp=sharing" download="cv_thinu_premachandra.pdf"
                    target="_blank"
                    data-tooltip={isTooltipMode ? 'Download my résumé' : null}
                  >
                    Résumé
                  </a>
                  {/* <Tech /> */}
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4 mb-0">
                  <p className="hero-text">
                    Let's Connect :
                  </p>
                  <SocialIcons />
                </div>
              </div>
            </div>

            <div
              className={`right-div xl:flex-1 md:h-[560px] h-[450px]`}
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
                    isInView={isInView}
                  // isRotating={isRotating}
                  // setIsRotating={setIsRotating}
                  // setCurrentStage={setCurrentStage}
                  />

                </Suspense>

              </Canvas>
            </div>
          </div >
        </div>
      )}
    </div >
  )
};

export default SectionWrapper(Hero, "hero");
