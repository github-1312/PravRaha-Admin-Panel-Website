const Select = ({ label, options, value, onChange, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      {...props}
      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-white dark:bg-gray-800">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
