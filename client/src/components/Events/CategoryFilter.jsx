import PropTypes from 'prop-types';

const CategoryFilter = ({
  categories = [],
  selectedCategory = 'all',
  onCategoryChange,
  className = '',
  selectClassName = '',
  labelClassName = '',
  label = 'Filter by:',
  showLabel = true
}) => {
  const handleChange = (e) => {
    if (onCategoryChange) {
      onCategoryChange(e.target.value);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {showLabel && (
        <label
          htmlFor="category-filter"
          className={`mr-2 text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={handleChange}
        className={`block pl-3 pr-8 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 ${selectClassName}`}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string,
  showLabel: PropTypes.bool
};

CategoryFilter.defaultProps = {
  selectedCategory: 'all',
  className: '',
  selectClassName: '',
  labelClassName: '',
  label: 'Filter by:',
  showLabel: true
};

export default CategoryFilter;