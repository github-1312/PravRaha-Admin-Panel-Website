import React from "react";
import { Trash2, Edit, Users, Calendar, Linkedin, Globe } from "lucide-react";

export default function TeamList({ members, onEdit, onDelete, isLoading }) {
  if (members.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-12">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
            No team members yet
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Get started by adding your first team member
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div
          key={member._id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow"
        >
          {/* Mobile Layout - Stacked */}
          <div className="block sm:hidden">
            {/* Header with Avatar and Actions */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center ${member.image ? 'hidden' : 'flex'}`}
                  >
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Member Info */}
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {member.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {member.role}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(member)}
                  disabled={isLoading}
                  className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded transition-colors disabled:opacity-50"
                  title="Edit team member"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(member._id)}
                  disabled={isLoading}
                  className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 rounded transition-colors disabled:opacity-50"
                  title="Delete team member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-3">
              <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Social Links */}
            {member.socialLinks && member.socialLinks.length > 0 && (
              <div className="flex items-center gap-2 mb-2">
                {member.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    title={link.platform}
                  >
                    {link.platform.toLowerCase() === 'linkedin' ? (
                      <Linkedin className="w-4 h-4" />
                    ) : (
                      <Globe className="w-4 h-4" />
                    )}
                  </a>
                ))}
              </div>
            )}

            {/* Date */}
            {member.createdAt && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>Added {new Date(member.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden sm:flex gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-16 h-16 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center ${member.image ? 'hidden' : 'flex'}`}
              >
                <Users className="w-6 h-6 text-gray-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Name and Role */}
              <div className="mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.role}
                </p>
              </div>

              {/* Bio */}
              <div className="mb-3">
                <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Social Links and Date */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="flex items-center gap-2">
                    {member.socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        title={link.platform}
                      >
                        {link.platform.toLowerCase() === 'linkedin' ? (
                          <Linkedin className="w-4 h-4" />
                        ) : (
                          <Globe className="w-4 h-4" />
                        )}
                      </a>
                    ))}
                  </div>
                )}
                
                {member.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Added {new Date(member.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex gap-2">
              <button
                onClick={() => onEdit(member)}
                disabled={isLoading}
                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg transition-colors disabled:opacity-50"
                title="Edit team member"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(member._id)}
                disabled={isLoading}
                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition-colors disabled:opacity-50"
                title="Delete team member"
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
