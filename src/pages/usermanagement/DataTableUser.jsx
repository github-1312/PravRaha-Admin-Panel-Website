


import { Edit, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const DataTable = ({ 
  data, 
  columns, 
  onView, 
  onEdit, 
  onDelete, 
  filters: filterDefs, 
  filterValues = {},
  onFilterChange,
  totalPages = 1,
  currentPage = 1,
  totalUsers = 0,
  onPageChange
}) => {
  const [searchTerm, setSearchTerm] = useState(filterValues.search || '');

  // 🔹 Unified filter change handler
  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filterValues,
      [key]: value || ''
    };
    onFilterChange(newFilters);
  };

  // 🔹 Handle search — trigger API filtering via `search` key
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Slight debounce behavior (optional small delay)
    const delayDebounce = setTimeout(() => {
      handleFilterChange('search', value);
    }, 400);

    return () => clearTimeout(delayDebounce);
  };

  // 🔹 Pagination info
  const startItem = data?.length > 0 ? (currentPage - 1) * 10 + 1 : 0;
  const endItem = Math.min(currentPage * 10, totalUsers);

  // 🔹 Generate visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, '...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="card p-4">
      <div className="flex flex-wrap gap-4 mb-4 items-center justify-between">
        {/* 🔹 Search Input (API based) */}
        <input
          type="text"
          placeholder="Search users..."
          className="input-field max-w-xs p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* 🔹 Filters */}
        <div className="flex flex-wrap gap-3">
          {filterDefs?.map(filter => (
            <select
              key={filter.key}
              className="select-field p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={filterValues[filter.key] || ''}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            >
              {filter.options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {data?.length > 0 ? (
              data.map(row => (
                <tr key={row._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => onView(row)} 
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 p-1 mx-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => onEdit(row)} 
                      className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-600 p-1 mx-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => onDelete(row)} 
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600 p-1 mx-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + 1} 
                  className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No users available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      {totalPages >= 1 && (
        <div className="flex items-center justify-between mt-6 px-2">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{startItem}</span> to{' '}
            <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{totalUsers}</span> users
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              } dark:border-gray-600 transition`}
              title="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-1">
              {getPageNumbers().map((page, idx) => (
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg border font-medium transition ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              } dark:border-gray-600 transition`}
              title="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
