import { useState, useRef } from 'react';
import {
  useGetSocialLinks,
  useCreateSocialLink,
  useUpdateSocialLink,
  useDeleteSocialLink,
  validateSocialLinkData,
  getPlatformIcon,
  getPlatformColor,
} from '../query/site-customisation/useSocialLinks.js';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';

const SocialLinksManagement = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ label: '', href: '' });
  const [errors, setErrors] = useState({});

  // Reference for scroll-to-top of form
  const formRef = useRef(null);

  // Queries
  const { data: socialLinksData, isLoading } = useGetSocialLinks();
  const createMutation = useCreateSocialLink();
  const updateMutation = useUpdateSocialLink();
  const deleteMutation = useDeleteSocialLink();

  const socialLinks = socialLinksData?.data || [];

  // Reset form
  const resetForm = () => {
    setFormData({ label: '', href: '' });
    setErrors({});
    setIsAdding(false);
    setEditingId(null);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle create
  const handleCreate = async (e) => {
    e.preventDefault();
    const validation = validateSocialLinkData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await createMutation.mutateAsync(formData);
      resetForm();
    } catch (error) {
      console.error('Failed to create social link:', error);
    }
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const validation = validateSocialLinkData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await updateMutation.mutateAsync({ id: editingId, data: formData });
      resetForm();
    } catch (error) {
      console.error('Failed to update social link:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete social link:', error);
      }
    }
  };

  // Start editing
  const startEdit = (link) => {
    setEditingId(link._id);
    setFormData({
      label: link.label,
      href: link.href,
    });
    setIsAdding(false);

    // Scroll smoothly to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Start adding
  const startAdd = () => {
    resetForm();
    setIsAdding(true);

    // Scroll smoothly to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Social Links Management
          </h1>
          {!isAdding && !editingId && (
            <button
              onClick={startAdd}
              className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition shadow-md"
            >
              <FaPlus /> Add New Link
            </button>
          )}
        </div>

        {/* Form for Add/Edit */}
        {(isAdding || editingId) && (
          <div
            ref={formRef}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {isAdding ? 'Add New Social Link' : 'Edit Social Link'}
            </h2>
            <form onSubmit={isAdding ? handleCreate : handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Label Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Label (Platform Name)
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    placeholder="e.g., Facebook, Twitter, LinkedIn"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors ${
                      errors.label
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.label && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.label}
                    </p>
                  )}
                </div>

                {/* URL Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL
                  </label>
                  <input
                    type="text"
                    name="href"
                    value={formData.href}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors ${
                      errors.href
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.href && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.href}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex items-center gap-2 bg-green-600 dark:bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition shadow-md disabled:opacity-50"
                >
                  <FaSave />
                  {isAdding ? 'Create' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-2 bg-gray-500 dark:bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition shadow-md"
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Social Links List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
          {socialLinks.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No social links found. Click "Add New Link" to create one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {socialLinks.map((link) => {
                    const Icon = getPlatformIcon(link.label);
                    const colorClass = getPlatformColor(link.label);
                    return (
                      <tr
                        key={link._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${colorClass} text-white shadow-md`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {link.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline truncate block max-w-xs"
                          >
                            {link.href}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(link)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition"
                              title="Edit"
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(link._id)}
                              disabled={deleteMutation.isPending}
                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition disabled:opacity-50"
                              title="Delete"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinksManagement;
