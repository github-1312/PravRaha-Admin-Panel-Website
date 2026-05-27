


// import React, { useState, useEffect } from "react";
// import { Loader2, Save, X, Plus, Image as ImageIcon, FileText, Building, CheckCircle, XCircle, Upload, Eye } from "lucide-react";
// import {
//   useGetCompanyAbout,
//   useUpsertCompanyAbout,
// } from "../query/useCompanyAbout";

// export default function AboutManagement() {
//   const { data, isLoading } = useGetCompanyAbout();
//   const upsertMutation = useUpsertCompanyAbout();

//   const [formData, setFormData] = useState({
//     title: "",
//     paragraphs: [""],
//     image: null,
//   });

//   const [preview, setPreview] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [hasChanges, setHasChanges] = useState(false);
//   const [dragActive, setDragActive] = useState(false);

//   // Auto-hide toast after 5 seconds
//   useEffect(() => {
//     if (toast) {
//       const timer = setTimeout(() => {
//         setToast(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [toast]);

//   console.log("About Data:", data);

//   // Initialize form from query data
//   useEffect(() => {
//     if (data) {
//       setFormData({
//         title: data.title || "",
//         paragraphs: data.paragraphs?.length
//           ? data.paragraphs
//           : [""],
//         image: null,
//       });
//       setPreview(data.image || null);
//     }
//   }, [data]);

//   // Check for changes
//   useEffect(() => {
//     if (data) {
//       const hasChanged = 
//         formData.title !== (data.title || "") ||
//         JSON.stringify(formData.paragraphs) !== JSON.stringify(data.paragraphs || [""]) ||
//         formData.image !== null;
//       setHasChanges(hasChanged);
//     }
//   }, [formData, data]);

//   // Toast helper
//   const showToast = (message, type = "success") => {
//     setToast({ type, message });
//   };

//   // Handlers
//   const handleTitleChange = (e) =>
//     setFormData((prev) => ({ ...prev, title: e.target.value }));

//   const handleParagraphChange = (i, val) => {
//     const updated = [...formData.paragraphs];
//     updated[i] = val;
//     setFormData((prev) => ({ ...prev, paragraphs: updated }));
//   };

//   const addParagraph = () =>
//     setFormData((prev) => ({
//       ...prev,
//       paragraphs: [...prev.paragraphs, ""],
//     }));

//   const removeParagraph = (i) => {
//     const updated = formData.paragraphs.filter((_, idx) => idx !== i);
//     setFormData((prev) => ({
//       ...prev,
//       paragraphs: updated.length ? updated : [""],
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, image: file }));
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       if (file.type.startsWith('image/')) {
//         setFormData((prev) => ({ ...prev, image: file }));
//         setPreview(URL.createObjectURL(file));
//       }
//     }
//   };

//   const handleRemoveImage = () => {
//     setFormData((prev) => ({ ...prev, image: null }));
//     setPreview(null);
//   };

//   const handleSave = async () => {
//     try {
//       let payload;
//       if (formData.image) {
//         payload = new FormData();
//         payload.append("title", formData.title);
//         formData.paragraphs.forEach((p) => payload.append("paragraphs", p));
//         payload.append("image", formData.image);
//       } else {
//         payload = {
//           title: formData.title,
//           paragraphs: formData.paragraphs,
//         };
//       }

//       await upsertMutation.mutateAsync(payload);
//       showToast("About section updated successfully! Your changes are now live.", "success");
//       setHasChanges(false);
//     } catch (err) {
//       console.error("Save failed:", err);
//       showToast("Failed to update about section. Please try again.", "error");
//     }
//   };

//   const handleReset = () => {
//     if (data?.about) {
//       setFormData({
//         title: data.about.title || "",
//         paragraphs: data.about.paragraphs?.length ? data.about.paragraphs : [""],
//         image: null,
//       });
//       setPreview(data.about.image || null);
//       setHasChanges(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="flex items-center space-x-3 text-slate-600">
//           <Loader2 className="w-6 h-6 animate-spin" />
//           <span className="text-lg font-medium">Loading about section...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
//       {/* Toast Notification */}
//       {toast && (
//         <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
//           <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-lg border ${
//             toast.type === 'success' 
//               ? 'bg-green-50 border-green-200 text-green-800' 
//               : 'bg-red-50 border-red-200 text-red-800'
//           }`}>
//             {toast.type === 'success' ? (
//               <CheckCircle className="w-5 h-5 text-green-600" />
//             ) : (
//               <XCircle className="w-5 h-5 text-red-600" />
//             )}
//             <span className="font-medium">{toast.message}</span>
//             <button
//               onClick={() => setToast(null)}
//               className={`ml-2 ${
//                 toast.type === 'success' 
//                   ? 'text-green-600 hover:text-green-800' 
//                   : 'text-red-600 hover:text-red-800'
//               }`}
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center space-x-3 mb-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//               <Building className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-slate-800">About Section</h1>
//               <p className="text-slate-600">Manage your company's story and introduction</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-1 gap-8">
//           {/* Form Section */}
//           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
//             <div className="px-8 py-6 border-b border-slate-200">
//               <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
//                 <FileText className="w-5 h-5 text-slate-600" />
//                 <span>Edit Content</span>
//               </h2>
//               <p className="text-slate-600 mt-1">Update your company's about section</p>
//             </div>

//             <div className="p-8 space-y-6">
//               {/* Title */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-slate-700">
//                   Section Title
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={handleTitleChange}
//                     placeholder="e.g., About Our Company"
//                     className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-800 placeholder-slate-400"
//                   />
//                 </div>
//                 <p className="text-xs text-slate-500">This will be the main heading for your about section</p>
//               </div>

//               {/* Paragraphs */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-slate-700">
//                   Content Paragraphs
//                 </label>
//                 <div className="space-y-4">
//                   {formData.paragraphs.map((p, i) => (
//                     <div key={i} className="group">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-1">
//                           <textarea
//                             value={p}
//                             onChange={(e) => handleParagraphChange(i, e.target.value)}
//                             placeholder={`Write paragraph ${i + 1} content...`}
//                             rows={4}
//                             className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-800 placeholder-slate-400 resize-vertical"
//                           />
//                         </div>
//                         {formData.paragraphs.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeParagraph(i)}
//                             className="mt-3 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
//                             title="Remove paragraph"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                
//                 <button
//                   type="button"
//                   onClick={addParagraph}
//                   className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 mt-3"
//                 >
//                   <Plus className="w-4 h-4" />
//                   <span className="text-sm font-medium">Add Another Paragraph</span>
//                 </button>
//               </div>

//               {/* Image Upload */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-slate-700">
//                   Company Image
//                 </label>
                
//                 {!preview ? (
//                   <div
//                     className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
//                       dragActive 
//                         ? 'border-blue-500 bg-blue-50' 
//                         : 'border-slate-300 hover:border-slate-400'
//                     }`}
//                     onDragEnter={handleDrag}
//                     onDragLeave={handleDrag}
//                     onDragOver={handleDrag}
//                     onDrop={handleDrop}
//                   >
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     />
//                     <div className="space-y-3">
//                       <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
//                         <Upload className="w-6 h-6 text-slate-500" />
//                       </div>
//                       <div>
//                         <p className="text-slate-700 font-medium">
//                           Drop your image here, or <span className="text-blue-600">browse</span>
//                         </p>
//                         <p className="text-xs text-slate-500 mt-1">
//                           Supports: JPG, PNG, GIF up to 10MB
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="relative group">
//                     <div className="relative overflow-hidden rounded-xl border-2 border-slate-200">
//                       <img
//                         src={preview}
//                         alt="Preview"
//                         className="w-full h-48 object-cover"
//                       />
//                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
//                       <button
//                         type="button"
//                         onClick={handleRemoveImage}
//                         className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
//                         title="Remove image"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                     <p className="text-xs text-slate-500 mt-2">
//                       Click the × button to remove or drag a new image to replace
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-4">
//                 <button
//                   onClick={handleSave}
//                   disabled={upsertMutation.isPending || !hasChanges}
//                   className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//                 >
//                   {upsertMutation.isPending ? (
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                   ) : (
//                     <Save className="w-5 h-5" />
//                   )}
//                   <span>{upsertMutation.isPending ? "Saving..." : "Save Changes"}</span>
//                 </button>
                
//                 <button
//                   onClick={handleReset}
//                   disabled={!hasChanges}
//                   className="flex-1 sm:flex-none px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-medium transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus:ring-2 focus:ring-slate-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Reset
//                 </button>
//               </div>

//               {hasChanges && (
//                 <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
//                   <p className="text-sm text-amber-700">
//                     You have unsaved changes. Don't forget to save!
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

         
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { 
  Loader2, Save, X, Plus, FileText, Building, 
  CheckCircle, XCircle, Upload 
} from "lucide-react";
import {
  useGetCompanyAbout,
  useUpsertCompanyAbout,
} from "../query/site-customisation/useCompanyAbout";
import { NODE_BASE_URL } from "../services/api";

export default function AboutManagement() {
  const { data, isLoading } = useGetCompanyAbout();
  const upsertMutation = useUpsertCompanyAbout();

  const [formData, setFormData] = useState({
    title: "",
    paragraphs: [""],
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        paragraphs: data.paragraphs?.length ? data.paragraphs : [""],
        image: null,
      });
     setPreview(`${NODE_BASE_URL}/upload/images/${data.image}` || null);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const hasChanged = 
        formData.title !== (data.title || "") ||
        JSON.stringify(formData.paragraphs) !== JSON.stringify(data.paragraphs || [""]) ||
        formData.image !== null;
      setHasChanges(hasChanged);
    }
  }, [formData, data]);

  const showToast = (message, type = "success") => {
    setToast({ type, message });
  };

  const handleTitleChange = (e) =>
    setFormData((prev) => ({ ...prev, title: e.target.value }));

  const handleParagraphChange = (i, val) => {
    const updated = [...formData.paragraphs];
    updated[i] = val;
    setFormData((prev) => ({ ...prev, paragraphs: updated }));
  };

  const addParagraph = () =>
    setFormData((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ""],
    }));

  const removeParagraph = (i) => {
    const updated = formData.paragraphs.filter((_, idx) => idx !== i);
    setFormData((prev) => ({
      ...prev,
      paragraphs: updated.length ? updated : [""],
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, image: file }));
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  const handleSave = async () => {
    try {
      let payload;
      if (formData.image) {
        payload = new FormData();
        payload.append("title", formData.title);
        formData.paragraphs.forEach((p) => payload.append("paragraphs", p));
        payload.append("image", formData.image);
      } else {
        payload = {
          title: formData.title,
          paragraphs: formData.paragraphs,
        };
      }

      await upsertMutation.mutateAsync(payload);
      showToast("About section updated successfully!", "success");
      setHasChanges(false);
    } catch (err) {
      console.error("Save failed:", err);
      showToast("Failed to update about section. Please try again.", "error");
    }
  };

  const handleReset = () => {
    if (data) {
      setFormData({
        title: data.title || "",
        paragraphs: data.paragraphs?.length ? data.paragraphs : [""],
        image: null,
      });
      setPreview(`${NODE_BASE_URL}/upload/images/${data.image}` || null);
      setHasChanges(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg font-medium">Loading about section...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950 p-4 sm:p-6 lg:p-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-lg border ${
              toast.type === "success"
                ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-800 dark:text-green-300"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-800 dark:text-red-300"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 hover:opacity-80"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">About Section</h1>
              <p className="text-slate-600 dark:text-slate-400">Manage your company's story and introduction</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {/* Form */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <span>Edit Content</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Update your company's about section</p>
            </div>

            <div className="p-8 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Section Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g., About Our Company"
                  className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              {/* Paragraphs */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Content Paragraphs</label>
                <div className="space-y-4">
                  {formData.paragraphs.map((p, i) => (
                    <div key={i} className="group">
                      <div className="flex items-start gap-3">
                        <textarea
                          value={p}
                          onChange={(e) => handleParagraphChange(i, e.target.value)}
                          placeholder={`Write paragraph ${i + 1} content...`}
                          rows={4}
                          className="flex-1 px-4 py-3 border-2 border-slate-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-vertical"
                        />
                        {formData.paragraphs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeParagraph(i)}
                            className="mt-3 p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addParagraph}
                  className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 px-3 py-2 rounded-lg transition-all mt-3"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Another Paragraph</span>
                </button>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Company Image</label>
                {!preview ? (
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      dragActive 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" 
                        : "border-slate-300 dark:border-gray-600 hover:border-slate-400 dark:hover:border-gray-500"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6 text-slate-500 dark:text-slate-300" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        Drop your image here, or <span className="text-blue-600 dark:text-blue-400">browse</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Supports: JPG, PNG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-gray-700">
                      <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={upsertMutation.isPending || !hasChanges}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 shadow-lg"
                >
                  {upsertMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{upsertMutation.isPending ? "Saving..." : "Save Changes"}</span>
                </button>
                <button
                  onClick={handleReset}
                  disabled={!hasChanges}
                  className="flex-1 sm:flex-none px-6 py-3 border-2 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:border-slate-300 dark:hover:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-800 focus:ring-2 focus:ring-slate-500/20 disabled:opacity-50"
                >
                  Reset
                </button>
              </div>

              {hasChanges && (
                <div className="bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 rounded-lg p-3">
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    You have unsaved changes. Don’t forget to save!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





