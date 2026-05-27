// import React, { useState, useEffect } from "react";
// import { useGetCompanyDetails, useSaveCompanyDetails, getLightLogo, getDarkLogo } from "../query/useCompanyDetails";
// import { Loader2, Save, Building2 } from "lucide-react";

// export default function CompanySettings() {
//   const { data, isLoading } = useGetCompanyDetails();
//   const saveMutation = useSaveCompanyDetails();

//   const [formData, setFormData] = useState({
//     companyName: "",
//     logoLight: null,
//     logoDark: null,
//   });
//   const [lightLogoPreview, setLightLogoPreview] = useState(null);
//   const [darkLogoPreview, setDarkLogoPreview] = useState(null);

//   const [toast, setToast] = useState({ show: false, message: "", type: "" });

//   // Load existing details
//   useEffect(() => {
//     if (data) {
//       const details = data;
//       setFormData({
//         companyName: details.companyName || "",
//         logoLight: null,
//         logoDark: null,
//       });
//       setLightLogoPreview(getLightLogo(details));
//       setDarkLogoPreview(getDarkLogo(details));
//     }
//   }, [data]);

//   // Toast functionality
//   const showToast = (message, type = "success") => {
//     setToast({ show: true, message, type });
//     setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
//   };

//   const handleFileChange = (e, field) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, [field]: file }));
//       const previewUrl = URL.createObjectURL(file);
//       if (field === "logoLight") {
//         setLightLogoPreview(previewUrl);
//       } else {
//         setDarkLogoPreview(previewUrl);
//       }
//     }
//   };

//   const handleRemoveLogo = (field) => {
//     const hasNewFile = formData[field] instanceof File;

//     if (hasNewFile) {
//       // This is a "cancel" of a new file selection. Revert to original.
//       setFormData((prev) => ({ ...prev, [field]: null }));
//       const details = data?.data;
//       if (field === "logoLight") {
//         setLightLogoPreview(getLightLogo(details));
//       } else {
//         setDarkLogoPreview(getDarkLogo(details));
//       }
//     } else {
//       // This is a "remove" of an existing logo.
//       setFormData((prev) => ({ ...prev, [field]: "REMOVE" }));
//       if (field === "logoLight") setLightLogoPreview(null);
//       else setDarkLogoPreview(null);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSave = async () => {
//     try {
//       await saveMutation.mutateAsync(formData);
//       showToast("Company details updated successfully ✅");
//     } catch (error) {
//       showToast("Failed to update company details ❌", "error");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-6">
//       {/* Toast Notification */}
//       {toast.show && (
//         <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
//           toast.type === "error" 
//             ? "bg-red-100 border border-red-300 text-red-800" 
//             : "bg-green-100 border border-green-300 text-green-800"
//         }`}>
//           {toast.message}
//         </div>
//       )}

//       {/* Main Card */}
//       <div className="bg-white shadow-lg rounded-2xl border border-gray-200">
//         {/* Card Header */}
//         <div className="px-4 py-4 sm:px-6 border-b border-gray-200">
//           <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-900">
//             <Building2 className="w-5 h-5 text-blue-600" />
//             Company Settings
//           </h2>
//         </div>

//         {/* Card Content */}
//         <div className="p-4 sm:p-6 space-y-6">
//           {/* Company Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Company Name
//             </label>
//             <input
//               type="text"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               placeholder="Enter company name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
//             />
//           </div>

//           {/* Light Logo */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Light Logo
//             </label>
//             <div className="space-y-3">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleFileChange(e, "logoLight")}
//                 className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer border border-gray-300 rounded-md"
//               />
              
//               {/* Simple Preview with Remove Option */}
//               {lightLogoPreview && (
//                 <div className="relative">
//                   <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
//                     <img
//                       src={lightLogoPreview}
//                       alt="Light logo preview"
//                       className="max-h-20 max-w-full object-contain"
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveLogo("logoLight")}
//                     className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors"
//                     title="Remove logo"
//                   >
//                     ×
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Dark Logo */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Dark Logo
//             </label>
//             <div className="space-y-3">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleFileChange(e, "logoDark")}
//                 className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer border border-gray-300 rounded-md"
//               />
              
//               {/* Simple Preview with Remove Option */}
//               {darkLogoPreview && (
//                 <div className="relative">
//                   <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
//                     <img
//                       src={darkLogoPreview}
//                       alt="Dark logo preview"
//                       className="max-h-20 max-w-full object-contain"
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveLogo("logoDark")}
//                     className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors"
//                     title="Remove logo"
//                   >
//                     ×
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Save Button */}
//           <div className="flex flex-col sm:flex-row justify-end pt-4 gap-3">
//             <button
//               onClick={handleSave}
//               disabled={saveMutation.isPending}
//               className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base ${
//                 saveMutation.isPending
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               {saveMutation.isPending ? (
//                 <Loader2 className="animate-spin w-4 h-4" />
//               ) : (
//                 <Save className="w-4 h-4" />
//               )}
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useGetCompanyDetails, useSaveCompanyDetails, getLightLogo, getDarkLogo } from "../query/site-customisation/useCompanyDetails";
import { Loader2, Save, Building2 } from "lucide-react";

export default function CompanySettings() {
  const { data, isLoading } = useGetCompanyDetails();
  const saveMutation = useSaveCompanyDetails();

  const [formData, setFormData] = useState({
    companyName: "",
    logoLight: null,
    logoDark: null,
  });
  const [lightLogoPreview, setLightLogoPreview] = useState(null);
  const [darkLogoPreview, setDarkLogoPreview] = useState(null);

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Load existing details
  useEffect(() => {
    if (data) {
      const details = data;
      setFormData({
        companyName: details.companyName || "",
        logoLight: null,
        logoDark: null,
      });
      setLightLogoPreview(getLightLogo(details));
      setDarkLogoPreview(getDarkLogo(details));
    }
  }, [data]);

  // Toast functionality
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
      const previewUrl = URL.createObjectURL(file);
      if (field === "logoLight") {
        setLightLogoPreview(previewUrl);
      } else {
        setDarkLogoPreview(previewUrl);
      }
    }
  };

  const handleRemoveLogo = (field) => {
    const hasNewFile = formData[field] instanceof File;

    if (hasNewFile) {
      setFormData((prev) => ({ ...prev, [field]: null }));
      const details = data?.data;
      if (field === "logoLight") {
        setLightLogoPreview(getLightLogo(details));
      } else {
        setDarkLogoPreview(getDarkLogo(details));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: "REMOVE" }));
      if (field === "logoLight") setLightLogoPreview(null);
      else setDarkLogoPreview(null);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync(formData);
      showToast("Company details updated successfully ✅");
    } catch (error) {
      showToast("Failed to update company details ❌", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            toast.type === "error"
              ? "bg-red-100 border border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-100"
              : "bg-green-100 border border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-100"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700">
        {/* Card Header */}
        <div className="px-4 py-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Company Settings
          </h2>
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Light Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Light Logo
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "logoLight")}
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
              />

              {lightLogoPreview && (
                <div className="relative">
                  <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <img
                      src={lightLogoPreview}
                      alt="Light logo preview"
                      className="max-h-20 max-w-full object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLogo("logoLight")}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors"
                    title="Remove logo"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Dark Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dark Logo
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "logoDark")}
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
              />

              {darkLogoPreview && (
                <div className="relative">
                  <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <img
                      src={darkLogoPreview}
                      alt="Dark logo preview"
                      className="max-h-20 max-w-full object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLogo("logoDark")}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors"
                    title="Remove logo"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex flex-col sm:flex-row justify-end pt-4 gap-3">
            <button
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base ${
                saveMutation.isPending
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              }`}
            >
              {saveMutation.isPending ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
