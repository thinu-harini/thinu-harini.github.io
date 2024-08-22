import React, { Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import CanvasLoader from "./CanvasLoader.jsx";
import HomeGirlModel from "../models/HomeGirl.jsx";
import CarouselCard from '../components/CarouselCard';
import { carouselItems } from "../constants";

const adjustGirlForScreenSize = () => {
  let screenScale = null;
  let screenPosition = null;
  let rotation = [-0.1, -0.4, 0];

  const aspectRatio = window.innerWidth / window.innerHeight;

  if (window.innerWidth < 768) {
    screenScale = [2.2, 2.2, 2.2];
    screenPosition = [-0.1, -2.2, 1];
  } else if (aspectRatio < 1.5) { //min 992
    screenScale = [2.6, 2.6, 2.6];
    screenPosition = [0.2, -3, -2];
  } else {
    screenScale = [4.2, 4.2, 4.2];
    screenPosition = [0.5, -4, -3];
  }
  return [screenScale, screenPosition, rotation];
};

const initializeSlides = (slides, angle) => {
  slides.forEach((slide, index) => {
    gsap.set(slide, {
      css: {
        rotationY: index * angle,
        transformOrigin: '50% 50% -300',
      },
    });
    slide.dataset.rotationY = index * angle;
  });
};

const Carousel = () => {
  const [girlScale, girlPosition, girlRotation] = adjustGirlForScreenSize();
  const [messageVisible, setMessageVisible] = useState(true);
  const carouselStageRef = useRef(null);
  const slidesRef = useRef([]);
  const dragStartX = useRef(0);
  const lastDragX = useRef(0);
  const isDragging = useRef(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const angle = 360 / carouselItems.length;
  const rotationDuration = 0.8; // Duration in seconds
  const sensitivity = 3; // Drag sensitivity
  const [carouselRotation, setCarouselRotation] = useState(0);
  const [modelRotationKey, setModelRotationKey] = useState(0);
  const [lastAction, setLastAction] = useState(null); // Track the last action

  // Function to rotate the carousel in a given direction
  const rotateCarousel = (direction) => {
    const slides = slidesRef.current;
    const angleOffset = direction === 'next' ? -angle : angle;

    slides.forEach((slide) => {
      const y1 = +slide.dataset.rotationY;
      const y2 = y1 + angleOffset;
      slide.dataset.rotationY = y2;
      gsap.to(slide, {
        duration: rotationDuration,
        rotationY: y2,
        ease: 'power2.inOut',
      });
    });

    setCarouselRotation((prevRotation) => prevRotation + angleOffset);
    setModelRotationKey((prev) => prev + 1);
    setLastAction(direction);
  };

  // Handlers for next and previous actions
  const handleNext = () => rotateCarousel('next');
  const handlePrev = () => rotateCarousel('prev');

  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Auto-rotate
  useEffect(() => {
    const intervalId = setInterval(handleNext, 10000);
    return () => clearInterval(intervalId);
  }, [carouselRotation]);

  useEffect(() => {
    const carouselStage = carouselStageRef.current;
    const slides = slidesRef.current;

    gsap.set(carouselStage, {
      css: {
        perspective: 1100,
        transformStyle: 'preserve-3d',
        transform: 'rotateX(-1deg)',
      },
    });

    initializeSlides(slides, angle);

    // Event handler for mouse wheel scrolling
    const handleScroll = throttle((event) => {
      if (messageVisible) setMessageVisible(false);
      event.deltaY > 0 ? handleNext() : handlePrev();
    }, 600);

    // Handle pointer events(mouse or touch)
    const handleDragStart = (event) => {
      if (messageVisible) setMessageVisible(false);
      isDragging.current = true;
      dragStartX.current = event.clientX || event.touches[0].clientX;
      lastDragX.current = dragStartX.current;
    };

    const handleDragMove = (event) => {
      if (!isDragging.current) return;

      const x = event.clientX || event.touches[0].clientX;
      const dragDistance = x - dragStartX.current;
      const dragAngle = (dragDistance / window.innerWidth) * angle * sensitivity;

      slides.forEach((slide) => {
        const currentRotationY = +slide.dataset.rotationY;
        gsap.set(slide, {
          rotationY: currentRotationY + dragAngle,
        });
      });

      lastDragX.current = x;
    };

    const handleDragEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const dragDistance = lastDragX.current - dragStartX.current;

      if (Math.abs(dragDistance) > 0) {
        dragDistance > 0 ? handlePrev() : handleNext();
      }

      // Reset dragging variables
      dragStartX.current = 0;
      lastDragX.current = 0;
    };

    // Handle keydown events
    const handleKeyDown = throttle((event) => {
      if (messageVisible) setMessageVisible(false);
      if (event.key === 'ArrowRight') handleNext();
      else if (event.key === 'ArrowLeft') handlePrev();
    }, 800);

    // Add event listeners for drag, scroll, and keydown actions
    carouselStage.addEventListener('mousedown', handleDragStart);
    carouselStage.addEventListener('mousemove', handleDragMove);
    carouselStage.addEventListener('mouseup', handleDragEnd);
    carouselStage.addEventListener('mouseleave', handleDragEnd);
    carouselStage.addEventListener('touchstart', handleDragStart);
    carouselStage.addEventListener('touchmove', handleDragMove);
    carouselStage.addEventListener('touchend', handleDragEnd);
    carouselStage.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listeners on component unmount
    return () => {
      carouselStage.removeEventListener('wheel', handleScroll);
      carouselStage.removeEventListener('mousedown', handleDragStart);
      carouselStage.removeEventListener('mousemove', handleDragMove);
      carouselStage.removeEventListener('mouseup', handleDragEnd);
      carouselStage.removeEventListener('mouseleave', handleDragEnd);
      carouselStage.removeEventListener('touchstart', handleDragStart);
      carouselStage.removeEventListener('touchmove', handleDragMove);
      carouselStage.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [angle, sensitivity]);

  // const handleDoubleClick = (link) => {
  //   navigate(link);
  // };

  const handleSlideClick = (link) => {
    navigate(link); // Use navigate to change routes
  };

  return (
    <div className="carousel-container">
      <div className="carousel-stage" ref={carouselStageRef}>
        {carouselItems.map((item, i) => (
          <div
            className="slide"
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            onClick={() => handleSlideClick(item.link)}
          // onDoubleClick={() => handleDoubleClick(item.link)}
          >
            <CarouselCard
              title={item.title}
              subtitle={item.subtitle}
              list={item.list}
              // image={item.image}
              link={item.link}
            />
          </div>
        ))}

        {/* girl model */}
        <div className="model-container">
          <Canvas
            camera={{ near: 0.1, far: 1000, fov: 45, position: [-1, 0, 7] }}
            className="canvas-wrapper"
          >
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={1} />
            <hemisphereLight
              skyColor="#b1e1ff"
              groundColor="#000000"
              intensity={0.5}
            />
            <pointLight position={[-1, 0.5, 1]} intensity={1} />
            <pointLight position={[-1, -2, 1]} intensity={1} />
            <Suspense fallback={<CanvasLoader />}>
              <HomeGirlModel
                scale={girlScale}
                position={girlPosition}
                rotation={girlRotation}
                rotationDuration={rotationDuration}
                key={modelRotationKey}
                modelRotationDirection={lastAction === 'prev' ? -1 : 1}
              />
            </Suspense>
          </Canvas>
        </div>

        {messageVisible && (
          <>
            <div className="content-subheading overlay-message desktop-message">
              <p>
                Scroll or use arrow keys to explore
              </p>
            </div>

            <div className="content-subheading overlay-message mobile-message">
              <p>
                Swipe to explore
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Carousel;

