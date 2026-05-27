const Card = ({ children, className = '' }) => (
  <div
    className={`
      bg-white dark:bg-gray-800 
      rounded-lg shadow-sm 
      border border-gray-200 dark:border-gray-700 
      p-4
      flex flex-col
      sm:flex-row sm:items-center sm:justify-between
      gap-4
      ${className}
    `}
  >
    {children}
  </div>
);

export default Card;
