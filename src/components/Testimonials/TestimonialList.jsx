import React from "react";
import { Trash2, Edit, MessageSquare, Calendar, Building } from "lucide-react";

export default function TestimonialList({ testimonials, onEdit, onDelete, isLoading }) {
  if (testimonials.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-12">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
            No testimonials yet
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Get started by adding your first customer testimonial
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial._id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow"
        >
          {/* Mobile Layout - Stacked */}
          <div className="block sm:hidden">
            {/* Header with Avatar and Actions */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center ${testimonial.avatar ? 'hidden' : 'flex'}`}
                  >
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Author Info */}
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {testimonial.role && testimonial.company ? `${testimonial.role} at ${testimonial.company}` : testimonial.role || testimonial.company}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(testimonial)}
                  disabled={isLoading}
                  className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded transition-colors disabled:opacity-50"
                  title="Edit testimonial"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(testimonial._id)}
                  disabled={isLoading}
                  className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 rounded transition-colors disabled:opacity-50"
                  title="Delete testimonial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="mb-3">
              <p className="text-gray-700 dark:text-gray-200 italic text-sm leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>

            {/* Date */}
            {testimonial.createdAt && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden sm:flex gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-16 h-16 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center ${testimonial.avatar ? 'hidden' : 'flex'}`}
              >
                <MessageSquare className="w-6 h-6 text-gray-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Quote */}
              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </span>
                </div>
                
                {testimonial.role && (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span>{testimonial.role}</span>
                  </div>
                )}
                
                {testimonial.company && (
                  <div className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    <span>{testimonial.company}</span>
                  </div>
                )}
                
                {testimonial.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex gap-2">
              <button
                onClick={() => onEdit(testimonial)}
                disabled={isLoading}
                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg transition-colors disabled:opacity-50"
                title="Edit testimonial"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(testimonial._id)}
                disabled={isLoading}
                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition-colors disabled:opacity-50"
                title="Delete testimonial"
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
