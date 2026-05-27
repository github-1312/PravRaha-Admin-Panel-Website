import React, { useState, useEffect } from "react";
import { Upload, X, User } from "lucide-react";

export default function TestimonialForm({ editingItem, onSave, onCancel, isLoading }) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (editingItem) {
      setContent(editingItem.content || "");
      setAuthor(editingItem.author || "");
      setRole(editingItem.role || "");
      setCompany(editingItem.company || "");
      setAvatarPreview(editingItem.avatar || "");
      setAvatar(null);
    } else {
      // Reset form for new testimonial
      setContent("");
      setAuthor("");
      setRole("");
      setCompany("");
      setAvatar(null);
      setAvatarPreview("");
    }
  }, [editingItem]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      content,
      author,
      role,
      company,
      avatar: avatar || avatarPreview,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Content Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Testimonial Content *
        </label>
        <textarea
          placeholder="Share your experience with our service..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors resize-none text-sm sm:text-base"
          rows="4"
          required
        />
      </div>

      {/* Author Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Author Name *
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Role/Position *
          </label>
          <input
            type="text"
            placeholder="CEO, Developer, Manager"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company *
        </label>
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base"
          required
        />
      </div>

      {/* Avatar Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profile Picture
        </label>
        
        {avatarPreview ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
              />
              <button
                type="button"
                onClick={removeAvatar}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-2 h-2 sm:w-3 sm:h-3" />
              </button>
            </div>
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <Upload className="w-4 h-4" />
                Change Image
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </label>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                JPG, PNG, or GIF (max 5MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
              <span className="text-xs sm:text-sm">{editingItem ? "Updating..." : "Creating..."}</span>
            </div>
          ) : (
            editingItem ? "Update Testimonial" : "Create Testimonial"
          )}
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
