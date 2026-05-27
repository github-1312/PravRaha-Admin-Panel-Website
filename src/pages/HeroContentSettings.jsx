import React, { useState, useEffect } from "react";
import {
  useHeroSlides,
  useAddSlides,
  useUpdateSlide,
  useDeleteSlide,
} from "../query/site-customisation/useHeroContent.js";
import {
  Plus,
  Save,
  Loader2,
  Trash2,
  Edit,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";

const HeroSlidesSettings = () => {
  const { data, isLoading } = useHeroSlides();
  const addMutation = useAddSlides();
  const updateMutation = useUpdateSlide();
  const deleteMutation = useDeleteSlide();

  const [slides, setSlides] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [newSlide, setNewSlide] = useState({
    heading: "",
    subheading: "",
    primaryCTA: "",
    href: "",
  });

  // ✅ Toast auto-hide
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (type, message) => setToast({ type, message });

  // ✅ Load slides
  useEffect(() => {
    if (data?.slides) {
      setSlides(data.slides);
    }
  }, [data]);

  // ✅ Handle field changes
  const handleChange = (id, field, value) => {
    setSlides((prev) =>
      prev.map((s) => (s._id === id ? { ...s, [field]: value } : s))
    );
  };

  // ✅ Save new slide
  const handleAdd = () => {
    if (!newSlide.heading || !newSlide.subheading) {
      showToast("error", "Please fill all required fields.");
      return;
    }

    addMutation.mutate(
      { slides: [newSlide] },
      {
        onSuccess: () => {
          setNewSlide({ heading: "", subheading: "", primaryCTA: "", href: "" });
          showToast("success", "Slide added successfully!");
        },
        onError: () => showToast("error", "Failed to add slide."),
      }
    );
  };

  // ✅ Update existing slide
  const handleSaveEdit = (slide) => {
    updateMutation.mutate(
      { id: slide._id, ...slide },
      {
        onSuccess: () => {
          setEditingId(null);
          showToast("success", "Slide updated successfully!");
        },
        onError: () => showToast("error", "Failed to update slide."),
      }
    );
  };

  // ✅ Delete slide
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;
    deleteMutation.mutate(id, {
      onSuccess: () => showToast("success", "Slide deleted successfully!"),
      onError: () => showToast("error", "Failed to delete slide."),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        Loading slides...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`flex items-center space-x-3 px-5 py-3 rounded-xl shadow-lg border ${
              toast.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-slate-500 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Manage Hero Slides
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Create, edit, and organize slides for your homepage hero section.
          </p>
        </div>

        {/* Add new slide */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-500" /> Add New Slide
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              className="px-4 py-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700"
              placeholder="Heading"
              value={newSlide.heading}
              onChange={(e) =>
                setNewSlide({ ...newSlide, heading: e.target.value })
              }
            />
            <input
              className="px-4 py-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700"
              placeholder="Subheading"
              value={newSlide.subheading}
              onChange={(e) =>
                setNewSlide({ ...newSlide, subheading: e.target.value })
              }
            />
            <input
              className="px-4 py-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700"
              placeholder="Primary CTA"
              value={newSlide.primaryCTA}
              onChange={(e) =>
                setNewSlide({ ...newSlide, primaryCTA: e.target.value })
              }
            />
            <input
              className="px-4 py-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700"
              placeholder="Link (href)"
              value={newSlide.href}
              onChange={(e) =>
                setNewSlide({ ...newSlide, href: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={addMutation.isLoading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
          >
            {addMutation.isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {addMutation.isLoading ? "Adding..." : "Add Slide"}
          </button>
        </div>

        {/* Existing Slides */}
        <div className="space-y-6">
          {slides.length === 0 ? (
            <p className="text-slate-500 text-center py-10">
              No slides found. Add your first one above.
            </p>
          ) : (
            slides.map((slide) => (
              <div
                key={slide._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg"
              >
                {editingId === slide._id ? (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        value={slide.heading}
                        onChange={(e) =>
                          handleChange(slide._id, "heading", e.target.value)
                        }
                        className="px-4 py-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700"
                      />
                      <input
                        value={slide.subheading}
                        onChange={(e) =>
                          handleChange(slide._id, "subheading", e.target.value)
                        }
                        className="px-4 py-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700"
                      />
                      <input
                        value={slide.primaryCTA}
                        onChange={(e) =>
                          handleChange(slide._id, "primaryCTA", e.target.value)
                        }
                        className="px-4 py-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700"
                      />
                      <input
                        value={slide.href}
                        onChange={(e) =>
                          handleChange(slide._id, "href", e.target.value)
                        }
                        className="px-4 py-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleSaveEdit(slide)}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium flex items-center gap-2"
                      >
                        <Save className="w-5 h-5" /> Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                      {slide.heading}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      {slide.subheading}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-medium">{slide.primaryCTA}</span>{" "}
                        → <span className="text-blue-600">{slide.href}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingId(slide._id)}
                          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <Edit className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(slide._id)}
                          disabled={deleteMutation.isLoading}
                          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSlidesSettings;
