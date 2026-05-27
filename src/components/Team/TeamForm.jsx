import React, { useState, useEffect } from "react";
import { Upload, X, User } from "lucide-react";
import SocialLinksEditor from "./SocialLinksEditor";

export default function TeamForm({ editingMember, onSave, onCancel, isLoading }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name || "");
      setRole(editingMember.role || "");
      setBio(editingMember.bio || "");
      setImagePreview(editingMember.image || "");
      setImage(null);
      setSocialLinks(editingMember.socialLinks || []);
    } else {
      // Reset form for new member
      setName("");
      setRole("");
      setBio("");
      setImage(null);
      setImagePreview("");
      setSocialLinks([]);
    }
  }, [editingMember]);

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
      name,
      role,
      bio,
      image: image || imagePreview,
      socialLinks,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Name and Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio *
        </label>
        <textarea
          placeholder="Tell us about this team member..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors resize-none text-sm sm:text-base"
          rows="4"
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profile Picture
        </label>
        
        {imagePreview ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
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

      {/* Social Links */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Social Links
        </label>
        <SocialLinksEditor socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
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
              <span className="text-xs sm:text-sm">{editingMember ? "Updating..." : "Creating..."}</span>
            </div>
          ) : (
            editingMember ? "Update Member" : "Create Member"
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
