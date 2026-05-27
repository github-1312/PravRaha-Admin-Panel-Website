// Reusable Components
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
    success: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100',
    danger: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
