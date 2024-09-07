import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useHeadings = () => {
  const [headings, setHeadings] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const extractHeadings = () => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const headingsArray = Array.from(headingElements).map(heading => ({
        text: heading.innerText,
        level: parseInt(heading.tagName.replace('H', ''), 10),
      }));
      setHeadings(headingsArray);
    };

    extractHeadings();

    // Optionally, add a resize event listener to re-extract headings on resize
    window.addEventListener('resize', extractHeadings);

    return () => window.removeEventListener('resize', extractHeadings);
  }, [location]);

  return headings;
};

export default useHeadings;
