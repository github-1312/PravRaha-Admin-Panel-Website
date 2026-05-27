import React, { useState } from "react";
import { Plus, Users, MessageSquare } from "lucide-react";
import TestimonialList from "../components/Testimonials/TestimonialList";
import TestimonialForm from "../components/Testimonials/TestimonialForm";
import { 
  useGetTestimonials, 
  useCreateTestimonial, 
  useUpdateTestimonial, 
  useDeleteTestimonial,
  prepareTestimonialFormData 
} from "../query/site-customisation/useTestimonials";

export default function TestimonialManagement() {
  const [view, setView] = useState("list");
  const [editingItem, setEditingItem] = useState(null);

  // API hooks
  const { data: testimonialsResponse, isLoading, error, refetch } = useGetTestimonials();
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  const testimonials = testimonialsResponse || [];

  const handleSave = async (testimonialData) => {
    try {
      const formData = prepareTestimonialFormData(testimonialData);
      
      if (editingItem?._id) {
        await updateMutation.mutateAsync({ id: editingItem._id, formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      
      setView("list");
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  const handleEdit = (testimonial) => {
    setEditingItem(testimonial);
    setView("form");
  };

  const handleCancel = () => {
    setView("list");
    setEditingItem(null);
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 sm:p-6 text-center">
          <div className="text-red-600 dark:text-red-400 text-lg font-semibold mb-2">
            Error Loading Testimonials
          </div>
          <div className="text-red-500 dark:text-red-300 mb-4 text-sm sm:text-base">
            {error.message || "Failed to load testimonials"}
          </div>
          <button
            onClick={() => refetch()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Testimonial Management
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Manage customer testimonials and reviews for your website
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {testimonials.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Total Testimonials
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {testimonials.filter(t => t.content?.length > 100).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Detailed Reviews
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {new Set(testimonials.map(t => t.company)).size}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Companies
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {view === "list" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              All Testimonials
            </h2>
            <button
              onClick={() => { setEditingItem(null); setView("form"); }}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors shadow-sm text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Add Testimonial
            </button>
          </div>

          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 sm:p-12">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">Loading testimonials...</span>
              </div>
            </div>
          ) : (
            <TestimonialList
              testimonials={testimonials}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={createMutation.isPending || updateMutation.isPending || deleteMutation.isPending}
            />
          )}
        </div>
      )}

      {view === "form" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base"
            >
              ← Back to List
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {editingItem ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            
            <TestimonialForm
              editingItem={editingItem}
              onSave={handleSave}
              onCancel={handleCancel}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        </div>
      )}
    </div>
  );
}
