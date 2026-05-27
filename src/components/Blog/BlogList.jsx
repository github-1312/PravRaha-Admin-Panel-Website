import React from "react";
import {
  Edit,
  Trash2,
  FileText,
  Tag,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import BlogFilters from "./BlogFilters";

export default function BlogList({
  blogs,
  onEdit,
  onDelete,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  categories,
}) {
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      (blog.title?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
      (blog.author?.toLowerCase() ?? "").includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || blog.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <BlogFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        categories={categories}
      />

      {/* Blog List */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No blog posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {blogs.length === 0
                ? "Get started by creating your first blog post."
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex flex-col sm:flex-row gap-4"
              >
                {/* Image */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full sm:w-32 h-40 sm:h-20 object-cover rounded-lg"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {blog.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {blog.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{" "}
                      {new Date(blog.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {blog.readTime}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2">
                  <button
                    onClick={() => onEdit(blog)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(blog._id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
