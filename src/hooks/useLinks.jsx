import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useLinks = () => {
  const [links, setLinks] = useState([]);
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    const extractLinks = () => {
      // Select all anchor tags on the current page
      const linkElements = document.querySelectorAll('a');

      // Map over the link elements to extract relevant information
      const linksArray = Array.from(linkElements).map(link => {
        const text = link.getAttribute('aria-label') ||
          link.getAttribute('title') ||
          link.innerText.trim() ||
          'Unnamed Link';

        return {
          text: text || 'Unnamed Link',
          href: link.href,
        };
      });

      // Remove duplicate links based on href
      const uniqueLinks = Array.from(
        new Map(linksArray.map(link => [link.href, link])).values()
      );

      // Update the state with the unique links
      setLinks(uniqueLinks);
    };

    // Extract links when the component mounts and whenever location changes
    extractLinks();

    // Optional cleanup for when component unmounts or location changes
    return () => {
      setLinks([]);
    };
  }, [location]);

  return links;
};

export default useLinks;

