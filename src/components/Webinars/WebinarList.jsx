import React from "react";
import { Trash2, Edit, Video, Calendar, User, Clock } from "lucide-react";

export default function WebinarList({ webinars, onEdit, onDelete, isLoading }) {
  if (webinars.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-12">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Video className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
            No webinars yet
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Get started by adding your first webinar
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

  return (
    <div className="space-y-4">
      {webinars.map((webinar) => (
        <div
          key={webinar._id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow"
        >
          {/* Mobile Layout - Stacked */}
          <div className="block sm:hidden">
            {/* Header with Image and Actions */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Image */}
                <div className="flex-shrink-0">
                  {webinar.image ? (
                    <img
                      src={webinar.image}
                      alt={webinar.title}
                      className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center ${webinar.image ? 'hidden' : 'flex'}`}
                  >
                    <Video className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                
                {/* Webinar Info */}
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {webinar.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {webinar.speaker && `${webinar.speaker} • `}{formatDate(webinar.date)}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(webinar)}
                  disabled={isLoading}
                  className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded transition-colors disabled:opacity-50"
                  title="Edit webinar"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(webinar._id)}
                  disabled={isLoading}
                  className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 rounded transition-colors disabled:opacity-50"
                  title="Delete webinar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                {webinar.description}
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              {isUpcoming(webinar.date) ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                  <Clock className="w-3 h-3" />
                  Upcoming
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  <Calendar className="w-3 h-3" />
                  Past Event
                </span>
              )}
            </div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden sm:flex gap-4">
            {/* Image */}
            <div className="flex-shrink-0">
              {webinar.image ? (
                <img
                  src={webinar.image}
                  alt={webinar.title}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center ${webinar.image ? 'hidden' : 'flex'}`}
              >
                <Video className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title and Status */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {webinar.title}
                </h3>
                {isUpcoming(webinar.date) ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                    <Clock className="w-3 h-3" />
                    Upcoming
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                    <Calendar className="w-3 h-3" />
                    Past Event
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                  {webinar.description}
                </p>
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                {webinar.speaker && (
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{webinar.speaker}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(webinar.date)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex gap-2">
              <button
                onClick={() => onEdit(webinar)}
                disabled={isLoading}
                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg transition-colors disabled:opacity-50"
                title="Edit webinar"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(webinar._id)}
                disabled={isLoading}
                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition-colors disabled:opacity-50"
                title="Delete webinar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
