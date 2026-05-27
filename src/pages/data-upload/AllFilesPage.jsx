import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Building2,
  Users,
  Search,
  Filter,
  Calendar,
  Download,
  Eye,
  ChevronDown,
  ArrowLeft,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFetchCsvFiles, useFileDelete } from "../../query/csv/useCsvQuery";
import toast from "react-hot-toast";

const AllFilesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");

  const navigate = useNavigate();

  const fileDeleteMutation = useFileDelete();

  // Use the actual hook to fetch CSV files
  const {
    data: files = [],
    isLoading: loading,
    error,
    refetch: fetchApiFiles,
  } = useFetchCsvFiles();



  const dataTypes = [
    { id: "all", label: "All Files", icon: FileText },
    {
      id: "contacts",
      label: "Contact Data",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: "company",
      label: "Company Data",
      icon: Building2,
      color: "text-emerald-600",
    },
  ];

  // Memoized filtered and sorted files
  const filteredFiles = useMemo(() => {
    if (!files || files.length === 0) return [];

    let filtered = [...files];

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((file) => file.type === selectedType);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((file) =>
        file.originalFileName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "name":
          aValue = a.originalFileName.toLowerCase();
          bValue = b.originalFileName.toLowerCase();
          break;
        case "rows":
          aValue = a.totalRecords || 0;
          bValue = b.totalRecords || 0;
          break;
        case "date":
        default:
          aValue = new Date(a.updatedAt || 0);
          bValue = new Date(b.updatedAt || 0);
          break;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [files, searchTerm, selectedType, sortBy, sortOrder]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const navigateToFile = (filename) => {
    console.log(`Navigate to: /csv-data/${encodeURIComponent(filename)}`);
    navigate(`/csv-data/${filename}`);
  };

  const navigateBack = () => {
    navigate("/data-management", { replace: true });
  };

  const handleDelete=(fileId)=>{

 
          fileDeleteMutation.mutateAsync({fileId:fileId},{
            onSuccess:(data)=>{
              toast.success(data?.message);
            },
            onError:(error)=>{
              toast.error(error);
            }
          })
  



  }

  const downloadFile = (file) => {
    console.log(`Download file: ${file.name}`);
    // You can implement actual download logic here
    alert(`Would download: ${file.name}`);
  };

  const handleRefresh = () => {
    fetchApiFiles();
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Failed to load files
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error?.message || "There was an error loading your CSV files."}
          </p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading files...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={navigateBack}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Back to main page"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  All CSV Files
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage and view your uploaded CSV files
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
                title="Refresh files"
              >
                Refresh
              </button>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {/* Grid View Button */}
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                      ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm"
                      : "text-gray-600 dark:text-gray-300"
                    }`}
                  title="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>

                {/* List View Button */}
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "list"
                      ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm"
                      : "text-gray-600 dark:text-gray-300"
                    }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 bg-white dark:bg-dark-900">
        {/* Filters and Search */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none bg-white dark:bg-dark-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
              >
                {dataTypes.map((type) => (
                  <option
                    key={type.id}
                    value={type.id}
                    className="dark:bg-dark-700 dark:text-gray-100"
                  >
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none" />
            </div>

            {/* Sort Options */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-dark-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
              >
                <option
                  value="date"
                  className="dark:bg-dark-700 dark:text-gray-100"
                >
                  Date
                </option>
                <option
                  value="name"
                  className="dark:bg-dark-700 dark:text-gray-100"
                >
                  Name
                </option>
                <option
                  value="rows"
                  className="dark:bg-dark-700 dark:text-gray-100"
                >
                  Records
                </option>
              </select>

              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors"
                title={`Sort ${sortOrder === "asc" ? "descending" : "ascending"
                  }`}
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                ) : (
                  <SortDesc className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Files */}
          <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
            <div className="flex items-center  md:flex-col space-x-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl text-center font-bold text-gray-900 dark:text-gray-100">
                  {filteredFiles.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Files
                </p>
              </div>
            </div>
          </div>

          {/* Company Files */}
          <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
            <div className="flex items-center md:flex-col space-x-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                  {
                    filteredFiles.filter((f) => f.type === "company")
                      .length
                  }
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Company Files
                </p>
              </div>
            </div>
          </div>

          {/* Contact Files */}
          <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
            <div className="flex items-center md:flex-col space-x-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                  {
                    filteredFiles.filter((f) => f.type === "contacts")
                      .length
                  }
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contact Files
                </p>
              </div>
            </div>
          </div>

          {/* Total Records */}
          <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
            <div className="flex items-center md:flex-col space-x-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl text-center font-bold text-gray-900 dark:text-gray-100">
                  {filteredFiles
                    .reduce((sum, file) => sum + (file.totalRecords || 0), 0)
                    .toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Records
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Files Grid/List */}
        {filteredFiles.length === 0 ? (
          <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center transition-colors duration-300">
            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
              {files.length === 0 ? "No CSV files found" : "No files found"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {files.length === 0
                ? "Upload some CSV files to get started"
                : searchTerm
                  ? "Try adjusting your search terms"
                  : "No files match the selected filters"}
            </p>
          </div>
        ) : (
          <div
            className={`${viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
              } bg-gray-50 dark:bg-dark-900 transition-colors duration-300`}
          >
            {filteredFiles.map((file) => {
              const typeInfo = dataTypes.find(
                (type) => type.id === file.type
              );
              const TypeIcon = typeInfo?.icon || FileText;

              if (viewMode === "list") {
                return (
                  <div
                    key={file._id}
                    title={`${file.originalFileName}`}
                    className="bg-white relative dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex flex-col sm:flex-row  items-center justify-between">
                      <div className="flex flex-col sm:flex-row items-center space-x-4 flex-1">
                        <div
                          className={`p-3 rounded-lg ${file.type === "contacts"
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                              : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                            }`}
                        >
                          <TypeIcon className="w-6 h-6" />
                        </div>
                        <div className="flex justify-between text-sm absolute top-2 right-10">

                          <span
                            className={`text-sm font-medium ${file.uploadStatus === "completed"
                                ? "text-green-600 dark:text-green-400"
                                : file.uploadStatus === "processing"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : file.uploadStatus === "failed"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-gray-600 dark:text-gray-400"
                              }`}
                          >
                            {file.uploadStatus
                              ? file.uploadStatus.charAt(0).toUpperCase() +
                              file.uploadStatus.slice(1)
                              : "Unknown"}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className=" text-gray-800  dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {file.originalFileName.length > 10
                              ? `${file.originalFileName.slice(0, 10)}...`
                              : file.originalFileName}
                          </h3>
                          <div className="flex flex-col gap-3 xs:flex-row   justify-center xs:justify-betwen items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>
                              {(file.totalRecords || 0).toLocaleString()}{" "}
                              records
                            </span>
                            <span>{file.totalColumns || 0} columns</span>
                            <span>{formatDate(file.updatedAt)}</span>
                            <span
                              className={`capitalize px-2 py-1 rounded text-xs ${file.fileDataType === "contacts"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-800/50 dark:text-blue-300"
                                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/50 dark:text-emerald-300"
                                }`}
                            >
                              {file.fileDataType || "unknown"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => navigateToFile(file._id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/40 rounded-lg transition-colors"
                          title="View file data"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadFile(file)}
                          className="p-2 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Download file"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                         <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(file._id);
                          }}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                          title="Delete file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={file._id}
                   title={`${file.originalFileName}`}
                  className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer"
                  onClick={() => navigateToFile(file._id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg ${file.type === "contacts"
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"
                        }`}
                    >
                      <TypeIcon className="w-8 h-8" />
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${file.type === "contacts"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                        }`}
                    >
                      {file.type || "unknown"}
                    </span>
                  </div>

                  <h3 className=" text-gray-800  dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {file.originalFileName.length > 10
                      ? `${file.originalFileName.slice(0, 10)}...`
                      : file.originalFileName}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Records:
                      </span>
                      <span className="text-gray-700 dark:text-gray-200">
                        {(file.totalRecords || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Columns:
                      </span>
                      <span className="text-gray-700 dark:text-gray-200">
                        {file.totalColumns || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        uploadStatus:
                      </span>
                      <span
                        className={`text-sm font-medium ${file.uploadStatus === "completed"
                            ? "text-green-600 dark:text-green-400"
                            : file.uploadStatus === "processing"
                              ? "text-blue-600 dark:text-blue-400"
                              : file.uploadStatus === "failed"
                                ? "text-red-600 dark:text-red-400"
                                : "text-gray-600 dark:text-gray-400"
                          }`}
                      >
                        {file.uploadStatus
                          ? file.uploadStatus.charAt(0).toUpperCase() +
                          file.uploadStatus.slice(1)
                          : "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(file.updatedAt)}
                      </span>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(file);
                          }}
                          className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          title="Download file"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(file._id);
                          }}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                          title="Delete file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFilesPage;
