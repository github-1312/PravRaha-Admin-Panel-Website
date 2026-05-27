const Textarea = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    )}
    <textarea
      {...props}
      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[100px]"
    />
    {error && (
      <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
    )}
  </div>
);

export default Textarea;
