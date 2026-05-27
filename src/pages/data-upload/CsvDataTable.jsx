import React, { useState, useMemo, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useFileData } from "../../query/csv/useCsvQuery";

const toCamel = (str) =>
  str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^./, (c) => c.toLowerCase());

const safe = (value) => (value === null || value === undefined ? "" : value);

const flattenObject = (obj, prefix = "") =>
  Object.entries(obj || {}).reduce((acc, [key, val]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(acc, flattenObject(val, newKey));
    } else {
      acc[newKey] = val;
    }
    return acc;
  }, {});

const CSVDataTable = () => {
  const { fileId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useFileData({
    fileId,
    page: currentPage,
    limit: rowsPerPage,
  });

  const records = data?.records || [];
  const totalRecords = data?.totalRecords || 0;
  const totalPages = data?.totalPages || 1;

  // Flatten records + merge extra fields dynamically
  const processedRecords = useMemo(() => {
    return records.map((row) => {
      const flattened = flattenObject(row);

      // Extract extra fields dynamically
      const reservedKeys = new Set([
        "firstName",
        "lastName",
        "fullName",
        "email",
        "phone",
        "companyId",
        "companyName",
        "title",
        "department",
        "linkedin",
        "twitter",
        "facebook",
        "website",
        "seniority",
        "functions",
        "enriched",
        "enrichmentLevel",
        "source",
        "qualityScore",
        "tags",
        "extraFields",
        "address.street",
        "address.city",
        "address.state",
        "address.postalCode",
        "address.country",
      ]);

      const extraFields = Object.fromEntries(
        Object.entries(flattened)
          .filter(([key]) => !reservedKeys.has(key))
          .map(([key, value]) => [toCamel(key), safe(value)])
      );

      return { ...flattened, ...extraFields };
    });
  }, [records]);

  // Determine columns dynamically
  const allColumns = useMemo(() => {
    const allKeys = Array.from(
      new Set(processedRecords.flatMap((row) => Object.keys(row || {})))
    );

    const preferredOrder = [
      "firstName",
      "lastName",
      "fullName",
      "email",
      "phone",
      "companyName",
      "title",
      "department",
      "linkedin",
      "website",
      "address.city",
      "address.state",
      "address.country",
    ];

    const sortedKeys = allKeys.sort((a, b) => {
      const aIndex = preferredOrder.indexOf(a);
      const bIndex = preferredOrder.indexOf(b);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.localeCompare(b);
    });

    return sortedKeys.map((key) => ({
      key,
      label: key
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
    }));
  }, [processedRecords]);

  // Filtered data
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return processedRecords;

    const lowerSearch = searchTerm.toLowerCase();

    return processedRecords.filter((row) =>
      Object.values(row).some((value) => {
        if (value === null || value === undefined) return false;

        if (Array.isArray(value)) {
          return value.some(
            (item) => item && item.toString().toLowerCase().includes(lowerSearch)
          );
        }

        return value.toString().toLowerCase().includes(lowerSearch);
      })
    );
  }, [processedRecords, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (isLoading) {
    return (
      <div className="p-6 text-gray-500 dark:text-gray-300">
        Loading CSV data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500 dark:text-red-400">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Your CSV Data
        </h2>

        <div className="relative w-full max-w-md mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search across all columns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Showing {filteredData.length} of {totalRecords} records
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {allColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={allColumns.length}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No matching data found
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700"
                >
                  {allColumns.map((column) => {
                    const value = row[column.key];

                    if (Array.isArray(value)) {
                      const display = value.slice(0, 3).join(", ");
                      const hiddenCount =
                        value.length > 3 ? ` +${value.length - 3} more` : "";
                      return (
                        <td
                          key={column.key}
                          className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap"
                          title={value.join(", ")}
                        >
                          {display}
                          <span className="text-gray-400">{hiddenCount}</span>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={column.key}
                        className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap"
                      >
                        {safe(value) || "-"}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages >= 1 && (
        <div className="mt-6 flex items-center justify-between flex-col gap-2 xs:flex-row">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Rows per page:
            </label>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1 border rounded bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }

                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "border dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default CSVDataTable;
