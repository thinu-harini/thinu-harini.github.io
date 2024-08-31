import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import '../assets/styles/SearchBar.css';

const SearchBar = ({ onSearch, onNavigate, currentIndex, totalResults, isVisible, onClose }) => {
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

  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className='search-bar'>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />

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

      <button
        onClick={handleCloseClick}
        aria-label="Close Search Bar"
      >
        <IoClose size={28} />
      </button>
    </div>
  );
};

export default SearchBar;
