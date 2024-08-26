import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SearchBar = ({ onSearch, onNavigate, currentIndex, totalResults, isVisible }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus(); // Focus on input when search bar is visible
    }
  }, [isVisible]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='search-bar'>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />

      <div className='search-controls'>
        {totalResults > 0 && (
          <p>{`${currentIndex + 1}/${totalResults}`}</p>
        )}
        <button
          onClick={() => onNavigate('previous')}
          disabled={totalResults === 0}
          aria-label="Previous result"
        >
          <FaChevronUp />
        </button>
        <button
          onClick={() => onNavigate('next')}
          disabled={totalResults === 0}
          aria-label="Next result"
        >
          <FaChevronDown />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
