


// import React from 'react';
// import { Plus, Eye, Edit3, Trash2, Building, Factory, MoreVertical, Search } from 'lucide-react';

// const ListView = ({ caseStudies, isLoading, onAdd, onEdit, onDelete, onDetail }) => {
//   if (isLoading) {
//     return (
//       <div className="min-h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="flex items-center space-x-3 text-slate-600">
//           <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <span className="text-lg font-medium">Loading case studies...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-800 mb-2">Case Studies</h1>
//               <p className="text-slate-600">Manage your portfolio of success stories</p>
//             </div>
            
//             <button
//               onClick={onAdd}
//               className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500/20 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Add New Case Study</span>
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="mt-6 relative max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search case studies..."
//               className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-800 placeholder-slate-400"
//             />
//           </div>
//         </div>

//         {/* Case Studies Grid */}
//         {caseStudies && caseStudies.length > 0 ? (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {caseStudies.map((cs) => (
//               <div
//                 key={cs._id}
//                 className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
//               >
//                 {/* Card Header */}
//                 <div className="p-6 pb-4">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//                         <Building className="w-6 h-6 text-white" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
//                           {cs.company}
//                         </h3>
//                         <div className="flex items-center space-x-2 text-slate-500 mt-1">
//                           <Factory className="w-4 h-4" />
//                           <span className="text-sm">{cs.industry}</span>
//                         </div>
//                       </div>
//                     </div>
                    
                   
//                   </div>

//                   {/* Preview Content */}
//                   <div className="mb-4">
//                     <p className="text-slate-600 text-sm line-clamp-2">
//                       {cs.description || "Successful implementation of innovative solutions that delivered exceptional results and ROI."}
//                     </p>
//                   </div>

//                   {/* Metrics/Tags */}
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
//                       Success Story
//                     </span>
//                     <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
//                       {cs.status || "Completed"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Card Actions */}
//                 <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
//                   <div className="flex items-center justify-between">
//                     <button
//                       onClick={() => onDetail(cs._id)}
//                       className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors group/btn"
//                     >
//                       <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
//                       <span className="text-sm font-medium">View Details</span>
//                     </button>

//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => onEdit(cs._id)}
//                         className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
//                         title="Edit"
//                       >
//                         <Edit3 className="w-4 h-4" />
//                       </button>
                      
//                       <button
//                         onClick={() => onDelete(cs._id)}
//                         className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           /* Empty State */
//           <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
//             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Building className="w-10 h-10 text-slate-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-slate-800 mb-2">No Case Studies Yet</h3>
//             <p className="text-slate-600 mb-6 max-w-md mx-auto">
//               Start building your portfolio by adding your first case study. Showcase your successful projects and achievements.
//             </p>
//             <button
//               onClick={onAdd}
//               className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500/20 shadow-lg"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Create Your First Case Study</span>
//             </button>
//           </div>
//         )}

//         {/* Stats Footer */}
//         {caseStudies && caseStudies.length > 0 && (
//           <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-slate-800">{caseStudies.length}</div>
//                 <div className="text-sm text-slate-600">Total Case Studies</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-green-600">
//                   {caseStudies.filter(cs => cs.status !== 'Draft').length}
//                 </div>
//                 <div className="text-sm text-slate-600">Published</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">
//                   {new Set(caseStudies.map(cs => cs.industry)).size}
//                 </div>
//                 <div className="text-sm text-slate-600">Industries</div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ListView;


import React from 'react';
import { Plus, Eye, Edit3, Trash2, Building, Factory, Search } from 'lucide-react';

const ListView = ({ caseStudies, isLoading, onAdd, onEdit, onDelete, onDetail }) => {
  if (isLoading) {
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium">Loading case studies...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Case Studies</h1>
              <p className="text-slate-600 dark:text-slate-400">Manage your portfolio of success stories</p>
            </div>

            <button
              onClick={onAdd}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500/20 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Case Study</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search case studies..."
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl 
                         bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                         transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
        </div>

        {/* Case Studies Grid */}
        {caseStudies && caseStudies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <div
                key={cs._id}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 
                           overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-lg group-hover:text-blue-600 transition-colors">
                          {cs.company}
                        </h3>
                        <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mt-1">
                          <Factory className="w-4 h-4" />
                          <span className="text-sm">{cs.industry}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="mb-4">
                    <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">
                      {cs.description || "Successful implementation of innovative solutions that delivered exceptional results and ROI."}
                    </p>
                  </div>

                  {/* Metrics/Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                      Success Story
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                      {cs.status || "Completed"}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => onDetail(cs._id)}
                      className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/btn"
                    >
                      <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span className="text-sm font-medium">View Details</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(cs._id)}
                        className="p-2 text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all duration-200"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDelete(cs._id)}
                        className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-10 h-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">No Case Studies Yet</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Start building your portfolio by adding your first case study. Showcase your successful projects and achievements.
            </p>
            <button
              onClick={onAdd}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500/20 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Case Study</span>
            </button>
          </div>
        )}

        {/* Stats Footer */}
        {caseStudies && caseStudies.length > 0 && (
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{caseStudies.length}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Case Studies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {caseStudies.filter(cs => cs.status !== 'Draft').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {new Set(caseStudies.map(cs => cs.industry)).size}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Industries</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;
