const Button = ({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  loading=false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:ring-gray-400",
    outline:
      "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-400",
    ghost:
      "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-300",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}  // maybe disable when loading
      {...props}  // no loading here
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
