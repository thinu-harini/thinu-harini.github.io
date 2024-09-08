import React, { useState, useEffect, useRef } from 'react';

const CipherText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^';
  const solveMilliseconds = 800;
  const characterSelectionMilliseconds = 10;
  const delayMilliseconds = 200;

  useEffect(() => {
    const scrambleText = () => {
      const elementCharacters = [...text];
      const lockMilliseconds = delayMilliseconds * elementCharacters.length + solveMilliseconds;

      let delay = 0;

      elementCharacters.forEach((character, index) => {
        setTimeout(() => {
          const intervalId = setInterval(() => {
            const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
            setDisplayText((prevText) => replaceCharacter(prevText, index, randomCharacter));

            setTimeout(() => {
              clearInterval(intervalId);
              setDisplayText((prevText) => replaceCharacter(prevText, index, elementCharacters[index]));
            }, solveMilliseconds);
          }, characterSelectionMilliseconds);
        }, delay === 0 ? (delay += 1) : (delay += delayMilliseconds));
      });

      setTimeout(() => {
        setDisplayText(text); // Reset to original text after scrambling
      }, lockMilliseconds);
    };

    if (isVisible) {
      scrambleText();
    }
  }, [isVisible, text]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after the heading is in view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in view
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  const replaceCharacter = (str, index, chr) => {
    return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
  };

  return (
    <h1 ref={headingRef} className="section-heading readable">
      {displayText || text}
    </h1>
  );
};

export default CipherText;
