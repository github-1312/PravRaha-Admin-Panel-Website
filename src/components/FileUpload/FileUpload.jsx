import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';

const FileUpload = ({ onFileUpload, acceptedTypes = ['.csv', '.xlsx', '.xls'], maxSize = 10485760 }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsProcessing(true);
    
    for (const file of acceptedFiles) {
      try {
        let data = [];
        
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          // Parse CSV
          Papa.parse(file, {
            header: true,
            complete: (results) => {
              data = results.data;
              processFile(file, data);
            },
            error: (error) => {
              console.error('CSV parsing error:', error);
              addFileToList(file, 'error', 'Failed to parse CSV file');
            }
          });
        } else {
          // For Excel files, you would need a library like xlsx
          // For now, we'll just add it as uploaded
          addFileToList(file, 'success', 'File uploaded successfully');
          onFileUpload && onFileUpload(file, []);
        }
      } catch (error) {
        addFileToList(file, 'error', error.message);
      }
    }
    
    setIsProcessing(false);
  }, [onFileUpload]);

  const processFile = (file, data) => {
    addFileToList(file, 'success', `Processed ${data.length} records`);
    onFileUpload && onFileUpload(file, data);
  };

  const addFileToList = (file, status, message) => {
    const fileInfo = {
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      status,
      message,
      uploadedAt: new Date()
    };
    
    setUploadedFiles(prev => [...prev, fileInfo]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxSize,
    multiple: true
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        
        {isDragActive ? (
          <p className="text-primary-600 dark:text-primary-400">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Drag & drop files here, or click to select files
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Supports: {acceptedTypes.join(', ')} (Max: {formatFileSize(maxSize)})
            </p>
          </div>
        )}
        
        {isProcessing && (
          <div className="mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Processing files...</p>
          </div>
        )}
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 dark:text-white">Uploaded Files</h4>
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <File className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)} • {file.uploadedAt.toLocaleString()}
                  </p>
                  {file.message && (
                    <p className={`text-xs ${
                      file.status === 'success' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {file.message}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {file.status === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;