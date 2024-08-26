// import { useState, useEffect } from 'react';

// const useSearch = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [currentResultIndex, setCurrentResultIndex] = useState(-1);
//   const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query) {
//       const results = [];
//       // Query all text-containing elements
//       document.querySelectorAll('h1, h2, h3, p, span').forEach((element) => {
//         const text = element.textContent || '';
//         const regex = new RegExp(query, 'gi');
//         let match;

//         // Find all matches in the text
//         while ((match = regex.exec(text)) !== null) {
//           results.push({ element, index: match.index, text });
//         }
//       });
//       console.log('Search Results:', results);
//       setSearchResults(results);
//       setCurrentResultIndex(results.length > 0 ? 0 : -1);
//     } else {
//       setSearchResults([]);
//       setCurrentResultIndex(-1);
//     }
//   };

//   const handleNavigate = (direction) => {
//     if (searchResults.length === 0) return;

//     const newIndex = direction === 'next'
//       ? (currentResultIndex + 1) % searchResults.length
//       : (currentResultIndex - 1 + searchResults.length) % searchResults.length;

//     setCurrentResultIndex(newIndex);
//     const result = searchResults[newIndex];

//     console.log('Navigating to result:', newIndex, result);
//     result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//   };

//   const highlightText = (text) => {
//     if (!searchQuery) return text;

//     const regex = new RegExp(`(${searchQuery})`, 'gi');
//     let lastIndex = 0;
//     const parts = [];

//     // Create a list of highlighted parts
//     text.replace(regex, (match, p1, offset) => {
//       const before = text.slice(lastIndex, offset);
//       lastIndex = offset + match.length;

//       // Determine if this match is the active one
//       const isActive = searchResults[currentResultIndex]?.text === text && searchResults[currentResultIndex]?.index === offset;

//       // Add text before the match
//       if (before) {
//         parts.push(before);
//       }

//       // Add the highlighted match
//       parts.push(
//         <mark key={offset} style={{ backgroundColor: isActive ? 'orange' : 'yellow' }}>
//           {match}
//         </mark>
//       );

//       return match; // Return match to continue the replacement
//     });

//     // Add the remaining text after the last match
//     if (lastIndex < text.length) {
//       parts.push(text.slice(lastIndex));
//     }

//     return parts;
//   };

//   const toggleSearchBarVisibility = () => {
//     setIsSearchBarVisible(prev => !prev);
//   };

//   useEffect(() => {
//     if (currentResultIndex >= 0 && searchResults.length > 0) {
//       const result = searchResults[currentResultIndex];
//       console.log('Scrolling to result:', currentResultIndex, result); // Debugging statement
//       result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   }, [currentResultIndex, searchResults]);

//   return { searchQuery, searchResults, currentResultIndex, handleSearch, handleNavigate, highlightText, isSearchBarVisible, toggleSearchBarVisibility };
// };

// export default useSearch;

import { useState, useEffect } from 'react';

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(-1);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const results = [];
      // Query all text-containing elements
      document.querySelectorAll('h1, h2, h3, p, span').forEach((element) => {
        const text = element.textContent || '';
        const regex = new RegExp(query, 'gi');
        let match;

        // Find all matches in the text
        while ((match = regex.exec(text)) !== null) {
          results.push({ element, index: match.index, text });
        }
      });
      console.log('Search Results:', results);
      setSearchResults(results);
      setCurrentResultIndex(results.length > 0 ? 0 : -1);
    } else {
      setSearchResults([]);
      setCurrentResultIndex(-1);
    }
  };

  const handleNavigate = (direction) => {
    if (searchResults.length === 0) return;

    const newIndex = direction === 'next'
      ? (currentResultIndex + 1) % searchResults.length
      : (currentResultIndex - 1 + searchResults.length) % searchResults.length;

    setCurrentResultIndex(newIndex);
    const result = searchResults[newIndex];

    console.log('Navigating to result:', newIndex, result);
    result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const highlightText = (text) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    let lastIndex = 0;
    const parts = [];

    text.replace(regex, (match, p1, offset) => {
      const before = text.slice(lastIndex, offset);
      lastIndex = offset + match.length;

      const isActive = searchResults[currentResultIndex]?.text === text && searchResults[currentResultIndex]?.index === offset;

      if (before) {
        parts.push(before);
      }

      parts.push(
        <mark key={offset} style={{ backgroundColor: isActive ? 'orange' : 'yellow' }}>
          {match}
        </mark>
      );

      return match;
    });

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  const toggleSearchBarVisibility = () => {
    setIsSearchBarVisible(prev => !prev);
  };

  useEffect(() => {
    if (!isSearchBarVisible) {
      // Clear search query and results when search bar is hidden
      setSearchQuery('');
      setSearchResults([]);
      setCurrentResultIndex(-1);
    }
  }, [isSearchBarVisible]);

  useEffect(() => {
    if (currentResultIndex >= 0 && searchResults.length > 0) {
      const result = searchResults[currentResultIndex];
      console.log('Scrolling to result:', currentResultIndex, result); // Debugging statement
      result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentResultIndex, searchResults]);

  return { searchQuery, searchResults, currentResultIndex, handleSearch, handleNavigate, highlightText, isSearchBarVisible, toggleSearchBarVisibility };
};

export default useSearch;
