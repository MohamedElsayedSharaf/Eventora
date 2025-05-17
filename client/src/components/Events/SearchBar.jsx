import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ 
  placeholder = 'Search...',
  debounceTime = 300,
  onSearch,
  className = '',
  inputClassName = '',
  iconClassName = '',
  clearButtonClassName = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceTime, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className={`h-5 w-5 ${iconClassName} ${isFocused ? 'text-primary-500' : 'text-gray-400'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        className={`block w-full pl-10 pr-10 py-2 border ${isFocused ? 'border-primary-300 dark:border-primary-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${inputClassName}`}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Search"
      />

      {searchTerm && (
        <button
          type="button"
          className={`absolute inset-y-0 right-0 pr-3 flex items-center ${clearButtonClassName}`}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg
            className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  debounceTime: PropTypes.number,
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  clearButtonClassName: PropTypes.string
};

export default SearchBar;