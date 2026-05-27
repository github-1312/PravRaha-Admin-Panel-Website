
import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Building2, Users, X, Eye, Download, Calendar, XCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFetchCsvFiles, useUploadCsv } from '../../query/csv/useCsvQuery';
import { useSocket } from '../../services/socket.context';

const dataTypes = [
  {
    id: 'contacts',
    label: 'Contact Data',
    description: 'Upload customer contacts, leads, or personal information',
    icon: Users,
    color: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 'company',
    label: 'Company Data',
    description: 'Upload business information, vendors, or organizational data',
    icon: Building2,
    color: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300',
    iconColor: 'text-emerald-600 dark:text-emerald-400'
  }
];

const CsvDataManagement = () => {
  const [selectedDataType, setSelectedDataType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [apiFiles, setApiFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState(null);
  const navigation = useNavigate();
  

  
  const { mutate: uploadCsv } = useUploadCsv();
  const { data: files, refetch: fetchApiFiles } = useFetchCsvFiles();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // useEffect(()=>{
  //   if (!socket) return 
    
  // socket.on('fileupload',({type,message})=>{
  //   setToast({ type, message }) ;
  // })
  // },[socket])

  useEffect(() => {
    if (files && Array.isArray(files)) {
      setApiFiles(files);
    } else {
      setApiFiles([]);
    }
  }, [files]);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setCurrentChunk(0);

    uploadCsv(
      { 
        file: selectedFile, 
        type: selectedDataType 
      },
      {
        onProgress: (progress) => {
          setUploadProgress(progress.overallProgress);
          setCurrentChunk(progress.chunk);
          setTotalChunks(progress.totalChunks);
        },
        onSuccess: (response) => {
          showToast("success", "File uploaded successfully! Please wait while data is being processed.");
          
          const newUploadedFile = {
            id: Date.now(),
            name: selectedFile.name,
            type: selectedDataType,
            size: selectedFile.size,
            uploadDate: new Date().toISOString(),
            file: selectedFile,
          };

          setUploadedFiles((prev) => [newUploadedFile, ...prev]);
          setSelectedFile(null);
          setIsUploading(false);
          setUploadProgress(0);
          fetchApiFiles();
        },
        onError: (error) => {
          console.error("Upload failed:", error);
          showToast("error", error?.response?.data?.message || "Upload failed. Please try again.");
          setIsUploading(false);
          setUploadProgress(0);
        },
      }
    );
  };

  const handleFileSelect = (files) => {
    if (!selectedDataType) {
      alert("Please select a data type first");
      return;
    }

    const file = files[0];
    if (!file) {
      alert("Please select a file");
      return;
    }

    const fileName = file.name.toLowerCase();
    
    if (!(fileName.endsWith(".csv") || fileName.endsWith(".xlsx") || fileName.endsWith(".xls"))) {
      alert("Please select a CSV or XLSX file only");
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const removeUploadedFile = (fileId) => setUploadedFiles(prev => prev.filter(file => file.id !== fileId));

  const navigateToViewAll = () => navigation('/csv-data/all', { replace: true });
  const navigateToFile = (filename) => navigation(`/csv-data/${filename}`);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });

  const totalFiles = apiFiles.length + uploadedFiles.length;
  const hasFiles = totalFiles > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 p-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-lg border ${
              toast.type === "success"
                ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-300"
                : "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-300"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className={`ml-2 ${
                toast.type === "success"
                  ? "text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                  : "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CSV Data Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Upload and manage your CSV files with ease</p>
        </div>

        {/* Data Type Selection */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Select Data Type</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {dataTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedDataType(type.id)}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                    selectedDataType === type.id
                      ? `${type.color} border-current shadow-md scale-105`
                      : 'bg-gray-50 dark:bg-dark-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex flex-col xs:flex-row justify-center items-center xs:items-start space-x-4">
                    <Icon className={`w-8 h-8 mt-1 ${selectedDataType === type.id ? type.iconColor : 'text-gray-400 dark:text-gray-500'}`} />
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">{type.label}</h3>
                      <p className={`text-sm ${selectedDataType === type.id ? 'opacity-80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Upload CSV Files</h2>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                : selectedDataType && !isUploading
                ? 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-dark-700'
            } ${!selectedDataType || isUploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            onDrop={!isUploading ? handleDrop : undefined}
            onDragOver={!isUploading ? handleDragOver : undefined}
            onDragLeave={!isUploading ? handleDragLeave : undefined}
            onClick={() => !isUploading && selectedDataType && fileInputRef.current?.click()}
          >
            {isUploading ? (
              <>
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="w-full h-full rounded-full border-4 border-gray-200 dark:border-gray-600"></div>
                  <div 
                    className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
                    style={{ transform: `rotate(${uploadProgress * 3.6}deg)` }}
                  ></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Uploading {selectedFile?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Chunk {currentChunk} of {totalChunks} • {uploadProgress.toFixed(1)}%
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <>
                <Upload className={`w-12 h-12 mx-auto mb-4 ${selectedDataType ? 'text-gray-400 dark:text-gray-500' : 'text-gray-300 dark:text-gray-600'}`} />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {selectedDataType ? 'Drop your CSV files here' : 'Select a data type first'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedDataType ? 'or click to browse your computer' : 'Choose between Contact or Company data above'}
                </p>
                {selectedDataType && <div className="text-sm text-gray-500 dark:text-gray-400">Accepted formats: .csv, .xlsx, .xls files only (one file at a time)</div>}
              </>
            )}
          </div>
          <input 
            ref={fileInputRef} 
            type="file"  
            accept=".csv, .xlsx, .xls" 
            className="hidden" 
            onChange={(e) => handleFileSelect(e.target.files)} 
            disabled={!selectedDataType || isUploading} 
          />

          {/* File Preview */}
          {selectedFile && !isUploading && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Selected File</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-800 px-3 py-1 rounded-full border dark:border-gray-600">
                  Ready to upload
                </span>
              </div>
              <div className="mb-4">
                {(() => {
                  const typeInfo = dataTypes.find(type => type.id === selectedDataType);
                  const TypeIcon = typeInfo?.icon || FileText;
                  return (
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${typeInfo?.color || 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300'}`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(selectedFile.size)}</p>
                        </div>
                      </div>
                      <button onClick={removeSelectedFile} className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors" title="Remove file">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })()}
              </div>
              <button
                onClick={uploadFile}
                disabled={isUploading || !selectedFile}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  isUploading
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                }`}
              >
                {isUploading ? 'Uploading...' : 'Upload File'}
              </button>
            </div>
          )}
        </div>

        {/* Recent Files */}
        {hasFiles && (
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6 gap-3 flex-col xs:flex-row">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Recent Files</h2>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 px-3 py-1 rounded-full border dark:border-gray-600">
                  {totalFiles} file{totalFiles !== 1 ? 's' : ''}
                </span>
                <button onClick={() => navigateToViewAll()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">View All</button>
              </div>
            </div>
            <div className="grid gap-4">
              {/* Display API files first */}
              {apiFiles.slice(0, 5).map((file) => {
                const typeInfo = dataTypes.find(dt => dt.id === file.fileDataType) || {};
                const TypeIcon = typeInfo.icon || FileText;

                return (
                  <div
                    key={file._id}
                    className="flex items-center flex-col sm:flex-row justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow bg-gray-50 dark:bg-dark-700 hover:bg-white dark:hover:bg-dark-600 group"
                  >
                    {/* Left Section */}
                    <div className="flex flex-col xs:flex-row items-center space-x-3 flex-1">
                      <div className={`p-3 rounded-lg ${typeInfo.color || 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300'}`}>
                        <TypeIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                       <h3 className="sm:font-semibold text-[12px] xs:text-[14px] text-gray-800 dark:text-gray-200">
  {file.originalFileName.length > 10 ? `${file.originalFileName.slice(0, 10)}...` : file.originalFileName}
</h3>
                        <div className="flex flex-col xs:flex-row items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-[10px] xs:text-[12px]">
                              {formatDate(file.updatedAt)}
                            </span>
                          </span>
                          {file.totalRecords && (
                            <span className="text-[10px] xs:text-[12px]">
                              {file.totalRecords} records
                            </span>
                          )}
                          <span className="capitalize bg-gray-200 dark:bg-dark-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                            {file.type || "Unknown"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={file.filepath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Download CSV"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => navigateToFile(file._id)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        title="View File"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!hasFiles && !selectedFile && !isUploading && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">No files uploaded yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Select a data type and upload your first CSV file to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvDataManagement;