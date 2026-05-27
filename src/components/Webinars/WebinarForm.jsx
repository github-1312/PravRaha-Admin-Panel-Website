import React, { useState, useEffect } from "react";
import { Upload, X, Video, Calendar, User } from "lucide-react";

export default function WebinarForm({ editingWebinar, onSave, onCancel, isLoading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (editingWebinar) {
      setTitle(editingWebinar.title || "");
      setDescription(editingWebinar.description || "");
      setDate(editingWebinar.date || "");
      setSpeaker(editingWebinar.speaker || "");
      setImagePreview(editingWebinar.image || "");
      setImage(null);
    } else {
      // Reset form for new webinar
      setTitle("");
      setDescription("");
      setDate("");
      setSpeaker("");
      setImage(null);
      setImagePreview("");
    }
  }, [editingWebinar]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      date,
      speaker,
      image: image || imagePreview,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Webinar Title *
        </label>
        <input
          type="text"
          placeholder="Advanced React Patterns Workshop"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base"
          required
        />
      </div>

      {/* Speaker and Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Speaker *
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          placeholder="Describe what this webinar will cover..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors resize-none text-sm sm:text-base"
          rows="4"
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Webinar Image
        </label>
        
        {imagePreview ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Webinar preview"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-2 h-2 sm:w-3 sm:h-3" />
              </button>
            </div>
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <Upload className="w-4 h-4" />
                Change Image
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Video className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
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
              <span className="text-xs sm:text-sm">{editingWebinar ? "Updating..." : "Creating..."}</span>
            </div>
          ) : (
            editingWebinar ? "Update Webinar" : "Create Webinar"
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
