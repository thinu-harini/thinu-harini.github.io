import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { TbSquareRoundedChevronDownFilled, TbSquareRoundedChevronUpFilled } from 'react-icons/tb';

const SearchBar = ({ onSearch, onNavigate, currentIndex, totalResults }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='search-bar'>
      <input
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
