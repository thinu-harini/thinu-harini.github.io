import { useState, useEffect } from 'react';

const useScrollPosition = (offset = 0) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSectionTop = document.getElementById('hero').offsetTop;
      const heroSectionHeight = document.getElementById('hero').offsetHeight;

      if (scrollY + window.innerHeight > heroSectionTop + offset &&
        scrollY < heroSectionTop + heroSectionHeight) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]);

  return isInView;
};

export default useScrollPosition;
