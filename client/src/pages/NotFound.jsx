import { Link } from 'react-router-dom';
import Button from '../components/Ui/Button';
import { useTheme } from '@mui/material/styles';

const NotFound = () => {
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-white px-4"
      style={{
        backgroundColor: darkMode ? theme.palette.background.default : undefined,
      }}
    >
      <div className="text-center max-w-md mx-auto">
        {/* 404 Illustration (Optional) */}
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              color: darkMode ? theme.palette.text.disabled : '#9CA3AF', // gray-400
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1
          className="text-6xl font-bold mb-4"
          style={{
            color: darkMode ? theme.palette.common.white : undefined,
          }}
        >
          404
        </h1>
        <h2
          className="text-2xl font-semibold mb-2"
          style={{
            color: darkMode ? theme.palette.text.secondary : '#4B5563', // gray-700
          }}
        >
          Page Not Found
        </h2>
        <p
          className="mb-6"
          style={{
            color: darkMode ? theme.palette.text.secondary : '#6B7280', // gray-500
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <Link to="/">
          <Button variant="primary">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
