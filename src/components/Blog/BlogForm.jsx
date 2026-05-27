

import React, { useState, useEffect } from "react";
import { Upload, X, ArrowLeft } from 'lucide-react';
import { useCreateBlog, useUpdateBlog } from "../../query/site-customisation/useBlog";
import { toast } from 'react-hot-toast';

export default function BlogForm({ editingBlog, setCurrentView, setBlogs, categories }) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    date: '',
    readTime: '',
    author: '',
    image: null,
    slug: ''
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: onCreateBlog } = useCreateBlog();
  const { mutateAsync: onEditBlog } = useUpdateBlog();

  // Populate form if editing
  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || '',
        excerpt: editingBlog.excerpt || '',
        category: editingBlog.category || '',
        date: editingBlog.date || '',
        readTime: editingBlog.readTime || '',
        author: editingBlog.author || '',
        image: editingBlog.image || null,
        slug: editingBlog.slug || ''
      });
      setImagePreview(editingBlog.image || '');
    }
  }, [editingBlog]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.date.trim()) newErrors.date = 'Date is required';
    if (!formData.readTime.trim()) newErrors.readTime = 'Read time is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.image && !editingBlog) newErrors.image = 'Image is required'; // allow keeping existing image
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (editingBlog) {
        const updatedBlog = await onEditBlog({ id: editingBlog._id, blogData: formData });
        setBlogs(prev => prev.map(b => b._id === updatedBlog._id ? updatedBlog : b));
        toast.success('Blog updated successfully!');
      } else {
        const newBlog = await onCreateBlog(formData);
        setBlogs(prev => [newBlog, ...prev]);
        toast.success('Blog created successfully!');
      }

      setCurrentView('list');
    } catch (err) {
      toast.error(err.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', excerpt: '', category: '', date: '', readTime: '', author: '', image: null, slug: '' });
    setImagePreview('');
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-center gap-3">
        <button onClick={() => setCurrentView('list')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
          <p className="text-gray-600 dark:text-gray-400">{editingBlog ? 'Update the post details' : 'Fill in the details for a new post'}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className={`w-full input ${errors.title && 'border-red-500'}`} />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excerpt *</label>
            <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows={3} className={`w-full input ${errors.excerpt && 'border-red-500'}`} />
            {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
            <select name="category" value={formData.category} onChange={handleInputChange} className={`w-full input ${errors.category && 'border-red-500'}`}>
              <option value="">Select a category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author *</label>
            <input type="text" name="author" value={formData.author} onChange={handleInputChange} className={`w-full input ${errors.author && 'border-red-500'}`} />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Publish Date *</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className={`w-full input ${errors.date && 'border-red-500'}`} />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Read Time *</label>
            <input type="text" name="readTime" value={formData.readTime} onChange={handleInputChange} className={`w-full input ${errors.readTime && 'border-red-500'}`} placeholder="e.g., 5 min read" />
            {errors.readTime && <p className="text-red-500 text-sm mt-1">{errors.readTime}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL Slug</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full input" />
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Featured Image</h2>
          {!imagePreview ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <label className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Click to upload</p>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>
          ) : (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
              <button type="button" onClick={() => { setImagePreview(''); setFormData(prev => ({ ...prev, image: null })); }} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => setCurrentView('list')} className="btn-outline">Cancel</button>
          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading ? 'Saving...' : (editingBlog ? 'Update Post' : 'Publish Post')}
          </button>
        </div>
      </form>
    </div>
  );
}
