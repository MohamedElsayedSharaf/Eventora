import PropTypes from 'prop-types';

const LoadingSpinner = ({ 
  size = 'medium',
  color = 'primary',
  className = ''
}) => {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-[3px]',
    xlarge: 'h-16 w-16 border-4'
  };

  const colorClasses = {
    primary: 'border-t-primary-500 border-b-primary-500',
    secondary: 'border-t-secondary-500 border-b-secondary-500',
    white: 'border-t-white border-b-white',
    gray: 'border-t-gray-500 border-b-gray-500',
    dark: 'border-t-gray-800 border-b-gray-800 dark:border-t-gray-200 dark:border-b-gray-200'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} border-transparent`}
        aria-label="Loading"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'gray', 'dark']),
  className: PropTypes.string
};

export default LoadingSpinner;