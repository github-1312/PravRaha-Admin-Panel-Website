import React, { useState, useEffect } from "react";
import BlogList from "../components/Blog/BlogList";
import BlogForm from "../components/Blog/BlogForm";
import { useDeleteBlogs, useGetBlogs } from "../query/site-customisation/useBlog";
import { Plus, FileText, Loader2, AlertCircle } from "lucide-react";

export default function BlogManagement() {
  const [currentView, setCurrentView] = useState("list"); // "list" | "create" | "edit"
  const [blogs, setBlogs] = useState([]); 
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = [
    "Technology",
    "Health & Wellness",
    "Business",
    "Education",
    "Lifestyle",
    "Travel",
    "Food & Recipes",
    "Sports",
    "Entertainment",
    "Finance",
  ];

  // Fetch blogs using custom hook
  const { data: fetchedBlogs, isLoading, error } = useGetBlogs();
  const {mutateAsync : deleteBlog } = useDeleteBlogs();

  // Ensure blogs state is always an array
  useEffect(() => {
    if (fetchedBlogs) {
      if (Array.isArray(fetchedBlogs)) setBlogs(fetchedBlogs);
      else if (Array.isArray(fetchedBlogs.data)) setBlogs(fetchedBlogs.data);
      else setBlogs([]);
    }
  }, [fetchedBlogs]);

  // Handlers
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setCurrentView("edit");
  };

  const handleDelete = async (id) => {
     await deleteBlog(id);
  };

  const handleCreateNew = () => {
    setEditingBlog(null);
    setCurrentView("create");
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Blog Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Create, edit, and manage your blog posts
              </p>
            </div>
          </div>

          {currentView === "list" && (
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" /> 
              <span className="hidden sm:inline">New Blog Post</span>
              <span className="sm:hidden">New</span>
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="ml-3 text-gray-700 dark:text-gray-300 text-lg">
            Loading blogs...
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex justify-center items-center py-20 text-red-600 dark:text-red-400">
          <AlertCircle className="w-6 h-6 mr-2" />
          <span>Failed to load blogs. Please try again later.</span>
        </div>
      )}

      {/* Blog List */}
      {!isLoading && !error && currentView === "list" && (
        <BlogList
          blogs={Array.isArray(blogs) ? blogs : []} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          categories={categories}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      {/* Blog Form */}
      {(currentView === "create" || currentView === "edit") && (
        <BlogForm
          editingBlog={editingBlog}
          categories={categories}
          setCurrentView={setCurrentView}
          setBlogs={setBlogs}
        />
      )}
    </div>
  );
}
