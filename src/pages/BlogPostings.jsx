import React, { useState, useEffect } from 'react';
import { 
  Upload, Image, Calendar, Clock, User, Tag, FileText, Link, Save, X, 
  Plus, Edit, Trash2, Eye, Search, Filter, ChevronDown, ArrowLeft 
} from 'lucide-react';
import { useGetBlogs } from '../query/site-customisation/useBlog';

const BlogManagementSystem = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    date: '',
    readTime: '',
    author: '',
    image: '',
    slug: ''
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  const categories = [
    'Technology',
    'Health & Wellness',
    'Business',
    'Education',
    'Lifestyle',
    'Travel',
    'Food & Recipes',
    'Sports',
    'Entertainment',
    'Finance'
  ];

  // // Mock data for demonstration
  const mockBlogs = [
    {
      _id: '1',
      title: 'Getting Started with React Development',
      excerpt: 'Learn the fundamentals of React and build your first application.',
      category: 'Technology',
      date: '2024-06-10',
      readTime: '8 min read',
      author: 'John Doe',
      image: 'https://via.placeholder.com/400x250',
      slug: 'getting-started-with-react',
      createdAt: '2024-06-10T10:00:00Z'
    },
    {
      _id: '2',
      title: 'Healthy Eating Habits for Busy Professionals',
      excerpt: 'Discover simple strategies to maintain a healthy diet despite a hectic schedule.',
      category: 'Health & Wellness',
      date: '2024-06-09',
      readTime: '6 min read',
      author: 'Jane Smith',
      image: 'https://via.placeholder.com/400x250',
      slug: 'healthy-eating-habits-busy-professionals',
      createdAt: '2024-06-09T14:30:00Z'
    },
    {
      _id: '3',
      title: 'Building Scalable Business Models',
      excerpt: 'Key principles for creating business models that can grow with your company.',
      category: 'Business',
      date: '2024-06-08',
      readTime: '12 min read',
      author: 'Mike Johnson',
      image: 'https://via.placeholder.com/400x250',
      slug: 'building-scalable-business-models',
      createdAt: '2024-06-08T09:15:00Z'
    }
  ];

  const {data:mockBlogss}=useGetBlogs();
  console.log(mockBlogss,'blogs')
  useEffect(() => {
    // Load blogs on component mount
    setBlogs(mockBlogs);
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      category: '',
      date: '',
      readTime: '',
      author: '',
      image: '',
      slug: ''
    });
    setImagePreview('');
    setErrors({});
    setEditingBlog(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
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
    if (!formData.image.trim()) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (editingBlog) {
        // Update existing blog
        const updatedBlogs = blogs.map(blog => 
          blog._id === editingBlog._id 
            ? { ...blog, ...formData, updatedAt: new Date().toISOString() }
            : blog
        );
        setBlogs(updatedBlogs);
        alert('Blog post updated successfully!');
      } else {
        // Create new blog
        const newBlog = {
          _id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setBlogs(prev => [newBlog, ...prev]);
        alert('Blog post created successfully!');
      }
      
      resetForm();
      setCurrentView('list');
      
    } catch (error) {
      alert('Error saving blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      date: blog.date,
      readTime: blog.readTime,
      author: blog.author,
      image: blog.image,
      slug: blog.slug
    });
    setImagePreview(blog.image);
    setCurrentView('edit');
  };

  const handleDelete = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBlogs(prev => prev.filter(blog => blog._id !== blogId));
      alert('Blog post deleted successfully!');
      
    } catch (error) {
      alert('Error deleting blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setImagePreview('');
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || blog.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Blog List View
  const renderBlogList = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
              <p className="text-gray-600">Manage your blog posts</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('create')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Blog Post
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600 mb-4">
              {blogs.length === 0 ? 'Get started by creating your first blog post.' : 'Try adjusting your search or filter criteria.'}
            </p>
            {blogs.length === 0 && (
              <button
                onClick={() => setCurrentView('create')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create First Blog Post
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredBlogs.map(blog => (
              <div key={blog._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex gap-4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {blog.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {blog.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(blog.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.readTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Blog Form View (Create/Edit)
  const renderBlogForm = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              resetForm();
              setCurrentView('list');
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            <p className="text-gray-600">
              {editingBlog ? 'Update your blog post details' : 'Fill in the details to publish a new blog post'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter blog post title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Excerpt */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Excerpt *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                  errors.excerpt ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Brief description of the blog post"
              />
              {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.author ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Author name"
              />
              {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Publish Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Read Time *
              </label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.readTime ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 5 min read"
              />
              {errors.readTime && <p className="text-red-500 text-sm mt-1">{errors.readTime}</p>}
            </div>

            {/* Slug */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Link className="w-4 h-4 inline mr-2" />
                URL Slug
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm bg-gray-100 px-3 py-3 border border-r-0 rounded-l-lg">
                  /blog/
                </span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 border border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300"
                  placeholder="auto-generated-from-title"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">Auto-generated from title, but you can customize it</p>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h2>
          
          <div className="space-y-4">
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Featured Image</h3>
                <p className="text-gray-600 mb-4">Choose an image that represents your blog post</p>
                <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image}</p>}
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => {
                if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
                  resetForm();
                  setCurrentView('list');
                }
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {editingBlog ? 'Updating...' : 'Publishing...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {editingBlog ? 'Update Blog Post' : 'Publish Blog Post'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {currentView === 'list' && renderBlogList()}
        {(currentView === 'create' || currentView === 'edit') && renderBlogForm()}
      </div>
    </div>
  );
};

export default BlogManagementSystem;