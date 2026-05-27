// import React, { useState } from 'react';
// import { Plus, Briefcase, MapPin, Clock, DollarSign, Eye, Edit, Trash2 } from 'lucide-react';

// const JobPostings = () => {
//   const [jobs, setJobs] = useState([
//     {
//       id: 1,
//       title: 'Senior Sales Manager',
//       department: 'Sales',
//       location: 'San Francisco, CA',
//       type: 'Full-time',
//       salary: '$80,000 - $120,000',
//       status: 'Active',
//       applications: 24,
//       postedDate: '2024-01-10',
//       description: 'We are looking for an experienced Sales Manager to lead our sales team and drive revenue growth.'
//     },
//     {
//       id: 2,
//       title: 'Marketing Specialist',
//       department: 'Marketing',
//       location: 'Remote',
//       type: 'Full-time',
//       salary: '$60,000 - $80,000',
//       status: 'Active',
//       applications: 18,
//       postedDate: '2024-01-08',
//       description: 'Join our marketing team to create compelling campaigns and drive brand awareness.'
//     },
//     {
//       id: 3,
//       title: 'Software Engineer',
//       department: 'Engineering',
//       location: 'New York, NY',
//       type: 'Full-time',
//       salary: '$100,000 - $140,000',
//       status: 'Draft',
//       applications: 0,
//       postedDate: '2024-01-15',
//       description: 'Build scalable software solutions and work with cutting-edge technologies.'
//     }
//   ]);

//   const [showJobModal, setShowJobModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const [jobForm, setJobForm] = useState({
//     title: '',
//     department: '',
//     location: '',
//     type: 'Full-time',
//     salary: '',
//     status: 'Draft',
//     description: '',
//     requirements: '',
//     benefits: ''
//   });

//   const departments = ['Sales', 'Marketing', 'Engineering', 'Customer Success', 'HR', 'Finance'];
//   const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
//   const statuses = ['Draft', 'Active', 'Paused', 'Closed'];

//   const handleCreateJob = () => {
//     setJobForm({
//       title: '',
//       department: '',
//       location: '',
//       type: 'Full-time',
//       salary: '',
//       status: 'Draft',
//       description: '',
//       requirements: '',
//       benefits: ''
//     });
//     setSelectedJob(null);
//     setIsEditing(false);
//     setShowJobModal(true);
//   };

//   const handleEditJob = (job) => {
//     setJobForm({
//       title: job.title,
//       department: job.department,
//       location: job.location,
//       type: job.type,
//       salary: job.salary,
//       status: job.status,
//       description: job.description,
//       requirements: job.requirements || '',
//       benefits: job.benefits || ''
//     });
//     setSelectedJob(job);
//     setIsEditing(true);
//     setShowJobModal(true);
//   };

//   const handleSaveJob = () => {
//     if (isEditing) {
//       setJobs(prev => prev.map(job => 
//         job.id === selectedJob.id 
//           ? { ...job, ...jobForm }
//           : job
//       ));
//     } else {
//       const newJob = {
//         id: Date.now(),
//         ...jobForm,
//         applications: 0,
//         postedDate: new Date().toISOString().split('T')[0]
//       };
//       setJobs(prev => [...prev, newJob]);
//     }
//     setShowJobModal(false);
//   };

//   const handleDeleteJob = (job) => {
//     if (confirm(`Are you sure you want to delete "${job.title}"?`)) {
//       setJobs(prev => prev.filter(j => j.id !== job.id));
//     }
//   };

//   const stats = [
//     { label: 'Total Jobs', value: jobs.length, icon: Briefcase, color: 'text-blue-600' },
//     { label: 'Active Jobs', value: jobs.filter(j => j.status === 'Active').length, icon: Briefcase, color: 'text-green-600' },
//     { label: 'Total Applications', value: jobs.reduce((sum, j) => sum + j.applications, 0), icon: Clock, color: 'text-purple-600' },
//     { label: 'Draft Jobs', value: jobs.filter(j => j.status === 'Draft').length, icon: Edit, color: 'text-orange-600' }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Postings</h1>
//           <p className="text-gray-600 dark:text-gray-400">Manage job openings and applications</p>
//         </div>
        
//         <button
//           onClick={handleCreateJob}
//           className="btn-primary mt-4 md:mt-0"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Create Job
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div key={index} className="card p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
//                   <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
//                 </div>
//                 <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
//                   <Icon className="h-6 w-6" />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Jobs Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {jobs.map((job) => (
//           <div key={job.id} className="card p-6">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{job.title}</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                     <Briefcase className="h-4 w-4 mr-2" />
//                     {job.department}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                     <MapPin className="h-4 w-4 mr-2" />
//                     {job.location}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                     <Clock className="h-4 w-4 mr-2" />
//                     {job.type}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                     <DollarSign className="h-4 w-4 mr-2" />
//                     {job.salary}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex flex-col items-end space-y-2">
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   job.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
//                   job.status === 'Draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
//                   job.status === 'Paused' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
//                   'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                 }`}>
//                   {job.status}
//                 </span>
                
//                 <div className="flex items-center space-x-1">
//                   <button
//                     onClick={() => handleEditJob(job)}
//                     className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
//                   >
//                     <Edit className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteJob(job)}
//                     className="p-1 text-gray-400 hover:text-red-600 transition-colors"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
//               {job.description}
//             </p>

//             <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 {job.applications} applications
//               </div>
//               <div className="text-sm text-gray-500 dark:text-gray-500">
//                 Posted {job.postedDate}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Job Modal */}
//       {showJobModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 {isEditing ? 'Edit Job' : 'Create New Job'}
//               </h3>
//               <button
//                 onClick={() => setShowJobModal(false)}
//                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Job Title *
//                   </label>
//                   <input
//                     type="text"
//                     value={jobForm.title}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
//                     className="input"
//                     placeholder="e.g. Senior Sales Manager"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Department *
//                   </label>
//                   <select
//                     value={jobForm.department}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, department: e.target.value }))}
//                     className="select"
//                   >
//                     <option value="">Select Department</option>
//                     {departments.map(dept => (
//                       <option key={dept} value={dept}>{dept}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Location *
//                   </label>
//                   <input
//                     type="text"
//                     value={jobForm.location}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
//                     className="input"
//                     placeholder="e.g. San Francisco, CA or Remote"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Job Type *
//                   </label>
//                   <select
//                     value={jobForm.type}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, type: e.target.value }))}
//                     className="select"
//                   >
//                     {jobTypes.map(type => (
//                       <option key={type} value={type}>{type}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Salary Range
//                   </label>
//                   <input
//                     type="text"
//                     value={jobForm.salary}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, salary: e.target.value }))}
//                     className="input"
//                     placeholder="e.g. $80,000 - $120,000"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Status *
//                   </label>
//                   <select
//                     value={jobForm.status}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, status: e.target.value }))}
//                     className="select"
//                   >
//                     {statuses.map(status => (
//                       <option key={status} value={status}>{status}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Job Description *
//                 </label>
//                 <textarea
//                   value={jobForm.description}
//                   onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
//                   rows={4}
//                   className="input"
//                   placeholder="Describe the role, responsibilities, and what you're looking for..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Requirements
//                 </label>
//                 <textarea
//                   value={jobForm.requirements}
//                   onChange={(e) => setJobForm(prev => ({ ...prev, requirements: e.target.value }))}
//                   rows={3}
//                   className="input"
//                   placeholder="List the required skills, experience, and qualifications..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Benefits
//                 </label>
//                 <textarea
//                   value={jobForm.benefits}
//                   onChange={(e) => setJobForm(prev => ({ ...prev, benefits: e.target.value }))}
//                   rows={3}
//                   className="input"
//                   placeholder="List the benefits, perks, and what makes this role attractive..."
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end space-x-3 mt-6">
//               <button
//                 onClick={() => setShowJobModal(false)}
//                 className="btn-outline"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveJob}
//                 className="btn-primary"
//                 disabled={!jobForm.title || !jobForm.department || !jobForm.location || !jobForm.description}
//               >
//                 {isEditing ? 'Update Job' : 'Create Job'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobPostings;
























// import React, { useState, useEffect } from 'react';
// import {
//   Plus, Briefcase, MapPin, Clock, DollarSign,
//   Edit, Trash2, Share2
// } from 'lucide-react';
// import axios from 'axios';

// const JobPostings = () => {

//   const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://node.encleadus.cloud';

//   const [jobs, setJobs] = useState([]);
//   const [showJobModal, setShowJobModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [jobForm, setJobForm] = useState({
//     title: '',
//     department: '',
//     location: '',
//     type: 'Full-time',
//     salary: '',
//     status: 'Draft',
//     description: '',
//     requirements: '',
//     benefits: ''
//   });

//   const departments = ['Sales','Marketing','Engineering','Customer Success','HR','Finance'];
//   const jobTypes = ['Full-time','Part-time','Contract','Internship'];
//   const statuses = ['Draft','Active','Paused','Closed'];

//   // ================= LOAD JOBS =================
//   useEffect(() => {
//     loadJobs();
//   }, []);

//   const loadJobs = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/jobs`);
      
//       // Ensure we always set an array to prevent white screen crashes
//       if (Array.isArray(res.data)) {
//         setJobs(res.data);
//       } else if (res.data && Array.isArray(res.data.data)) {
//         setJobs(res.data.data);
//       } else {
//         console.error("Expected array from API but got:", res.data);
//       }
//     } catch (err) {
//       console.error("Failed to load jobs", err);
//     }
//   };

//   // ================= CREATE BUTTON =================
//   const handleCreateJob = () => {
//     setSelectedJob(null);
//     setIsEditing(false);
//     setJobForm({
//       title: '',
//       department: '',
//       location: '',
//       type: 'Full-time',
//       salary: '',
//       status: 'Draft',
//       description: '',
//       requirements: '',
//       benefits: ''
//     });
//     setShowJobModal(true);
//   };

//   // ================= EDIT =================
//   const handleEditJob = (job) => {
//     setSelectedJob(job);
//     setIsEditing(true);
    
//     // Safely populate the form with fallbacks if your manual DB inserts are missing fields
//     setJobForm({
//       title: job.title || '',
//       department: job.department || '',
//       location: job.location || '',
//       type: job.type || 'Full-time',
//       salary: job.salary || '',
//       status: job.status || 'Draft',
//       description: job.description || '',
//       requirements: job.requirements || '',
//       benefits: job.benefits || ''
//     });
//     setShowJobModal(true);
//   };

//   // ================= SAVE (CREATE + UPDATE) =================
//   const handleSaveJob = async () => {
//     setIsLoading(true);

//     try {
//       if (isEditing) {
//         const res = await axios.put(
//           `${API_BASE_URL}/api/jobs/${selectedJob._id}`,
//           jobForm
//         );

//         setJobs(prev =>
//           prev.map(j => j._id === res.data._id ? res.data : j)
//         );

//       } else {
//         const res = await axios.post(`${API_BASE_URL}/api/jobs`, jobForm);
//         setJobs(prev => [res.data, ...prev]);
//       }

//       setShowJobModal(false);
//     } catch (err) {
//       console.error(err);
//       alert("Error saving job");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ================= DELETE =================
//   const handleDeleteJob = async (job) => {
//     if (!window.confirm(`Delete "${job.title}"?`)) return;

//     try {
//       await axios.delete(`${API_BASE_URL}/api/jobs/${job._id}`);
//       setJobs(prev => prev.filter(j => j._id !== job._id));
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   // ================= STATS =================
//   const safeJobs = Array.isArray(jobs) ? jobs : [];

//   const stats = [
//     { label: 'Total Jobs', value: safeJobs.length, icon: Briefcase, color: 'text-blue-600' },
//     { label: 'Active Jobs', value: safeJobs.filter(j => j.status === 'Active').length, icon: Briefcase, color: 'text-green-600' },
//     { label: 'Total Applications', value: safeJobs.reduce((sum, j) => sum + (j.applications || 0), 0), icon: Clock, color: 'text-purple-600' },
//     { label: 'Draft Jobs', value: safeJobs.filter(j => j.status === 'Draft').length, icon: Edit, color: 'text-orange-600' }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Postings</h1>
//           <p className="text-gray-600 dark:text-gray-400">Manage job openings and applications</p>
//         </div>
        
//         <button
//           onClick={handleCreateJob}
//           className="btn-primary mt-4 md:mt-0 flex items-center"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Create Job
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div key={index} className="card p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
//                   <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
//                 </div>
//                 <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
//                   <Icon className="h-6 w-6" />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Jobs Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {safeJobs.map((job, index) => (
//           <div key={job._id || index} className="card p-6">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{job.title}</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                     <Briefcase className="h-4 w-4 mr-2" />
//                     {job.department}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                     <MapPin className="h-4 w-4 mr-2" />
//                     {job.location}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                     <Clock className="h-4 w-4 mr-2" />
//                     {job.type}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                     <DollarSign className="h-4 w-4 mr-2" />
//                     {job.salary}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex flex-col items-end space-y-2">
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   job.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
//                   job.status === 'Draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
//                   job.status === 'Paused' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
//                   'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                 }`}>
//                   {job.status}
//                 </span>
                
//                 <div className="flex items-center space-x-1">
//                   <button
//                     onClick={() => handleEditJob(job)}
//                     className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
//                   >
//                     <Edit className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteJob(job)}
//                     className="p-1 text-gray-400 hover:text-red-600 transition-colors"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/jobs/' + job._id)}`)}
//                     className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
//                   >
//                     <Share2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
//               {job.description}
//             </p>

//             <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 {job.applications || 0} applications
//               </div>
//               <div className="text-sm text-gray-500 dark:text-gray-500">
//                 Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Job Modal */}
//       {showJobModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 {isEditing ? 'Edit Job' : 'Create New Job'}
//               </h3>
//               <button
//                 onClick={() => setShowJobModal(false)}
//                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Job Title *
//                   </label>
//                   <input
//                     type="text"
//                     value={jobForm.title}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
//                     className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full border rounded p-2"
//                     placeholder="e.g. Senior Sales Manager"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Department *
//                   </label>
//                   <select
//                     value={jobForm.department}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, department: e.target.value }))}
//                     className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full border rounded p-2"
//                   >
//                     <option value="">Select Department</option>
//                     {departments.map(dept => (
//                       <option key={dept} value={dept}>{dept}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Location *
//                   </label>
//                   <input
//                     type="text"
//                     value={jobForm.location}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
//                     className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full border rounded p-2"
//                     placeholder="e.g. San Francisco, CA or Remote"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Job Type *
//                   </label>
//                   <select
//                     value={jobForm.type}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, type: e.target.value }))}
//                     className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full border rounded p-2"
//                   >
//                     {jobTypes.map(type => (
//                       <option key={type} value={type}>{type}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Salary Range
//                   </label>
//                   <input
//                     type="text"
//                     value={jobForm.salary}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, salary: e.target.value }))}
//                     className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full border rounded p-2"
//                     placeholder="e.g. $80,000 - $120,000"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Status *
//                   </label>
//                   <select
//                     value={jobForm.status}
//                     onChange={(e) => setJobForm(prev => ({ ...prev, status: e.target.value }))}
//                     className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full border rounded p-2"
//                   >
//                     {statuses.map(status => (
//                       <option key={status} value={status}>{status}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Job Description *
//                 </label>
//                 <textarea
//                   value={jobForm.description}
//                   onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
//                   rows={4}
//                   className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full border rounded p-2"
//                   placeholder="Describe the role, responsibilities, and what you're looking for..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Requirements
//                 </label>
//                 <textarea
//                   value={jobForm.requirements}
//                   onChange={(e) => setJobForm(prev => ({ ...prev, requirements: e.target.value }))}
//                   rows={3}
//                   className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full border rounded p-2"
//                   placeholder="List the required skills, experience, and qualifications..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Benefits
//                 </label>
//                 <textarea
//                   value={jobForm.benefits}
//                   onChange={(e) => setJobForm(prev => ({ ...prev, benefits: e.target.value }))}
//                   rows={3}
//                   className="input dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full border rounded p-2"
//                   placeholder="List the benefits, perks, and what makes this role attractive..."
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end space-x-3 mt-6">
//               <button
//                 onClick={() => setShowJobModal(false)}
//                 className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveJob}
//                 className="btn-primary"
//                 disabled={!jobForm.title || !jobForm.department || !jobForm.location || !jobForm.description || isLoading}
//               >
//                 {isLoading ? 'Saving...' : isEditing ? 'Update Job' : 'Create Job'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobPostings;






















// import React, { useState, useEffect } from "react";

// import {
//   Plus,
//   Briefcase,
//   MapPin,
//   Clock,
//   DollarSign,
//   Edit,
//   Trash2,
//   Share2,
//   X,
// } from "lucide-react";

// import {
//   getJobs,
//   createJob,
//   updateJob,
//   deleteJob,
// } from "../services/jobService";

// const JobPostings = () => {
//   // ================= STATES =================
//   const [jobs, setJobs] = useState([]);
//   const [showJobModal, setShowJobModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // ================= FORM STATE =================
//   const initialFormState = {
//     title: "",
//     department: "",
//     location: "",
//     type: "Full-Time",
//     salary: "",
//     status: "Draft",
//     description: "",
//     requirements: "",
//     benefits: "",
//   };

//   const [jobForm, setJobForm] = useState(initialFormState);

//   // ================= OPTIONS =================
//   const departments = [
//     "Sales",
//     "Marketing",
//     "Engineering",
//     "Customer Success",
//     "HR",
//     "Finance",
//   ];

//   const jobTypes = [
//     "Full-Time",
//     "Part-Time",
//     "Contract",
//     "Internship",
//   ];

//   const statuses = [
//     "Draft",
//     "Active",
//     "Paused",
//     "Closed",
//   ];

//   // ================= LOAD JOBS =================
//   useEffect(() => {
//     loadJobs();
//   }, []);

//   const loadJobs = async () => {
//     try {
//       const data = await getJobs();

//       console.log("Jobs API Response:", data);

//       if (Array.isArray(data)) {
//         setJobs(data);
//       } else {
//         console.error("Expected array but got:", data);
//         setJobs([]);
//       }
//     } catch (err) {
//       console.error("Failed to load jobs:", err);
//       setJobs([]);
//     }
//   };

//   // ================= OPEN CREATE MODAL =================
//   const handleCreateJob = () => {
//     setSelectedJob(null);
//     setIsEditing(false);
//     setJobForm(initialFormState);
//     setShowJobModal(true);
//   };

//   // ================= OPEN EDIT MODAL =================
//   const handleEditJob = (job) => {
//     setSelectedJob(job);
//     setIsEditing(true);

//     setJobForm({
//       title: job.title || "",
//       department: job.department || "",
//       location: job.location || "",
//       type: job.type || "Full-Time",
//       salary: job.salary || "",
//       status: job.status || "Draft",
//       description: job.description || "",
//       requirements: job.requirements || "",
//       benefits: job.benefits || "",
//     });

//     setShowJobModal(true);
//   };

//   // ================= SAVE JOB =================
//   const handleSaveJob = async () => {
//     try {
//       setIsLoading(true);

//       if (
//         !jobForm.title ||
//         !jobForm.department ||
//         !jobForm.location ||
//         !jobForm.description
//       ) {
//         alert("Please fill all required fields");
//         return;
//       }

//       // ================= UPDATE =================
//       if (isEditing && selectedJob) {
//         await updateJob(selectedJob._id, jobForm);

//         alert("Job updated successfully");
//       }

//       // ================= CREATE =================
//       else {
//         await createJob(jobForm);

//         alert("Job created successfully");
//       }

//       // Reload jobs
//       await loadJobs();

//       // Close modal
//       setShowJobModal(false);

//       // Reset form
//       setJobForm(initialFormState);
//     } catch (err) {
//       console.error("Save job error:", err);

//       if (err.response?.data?.message) {
//         alert(err.response.data.message);
//       } else {
//         alert("Something went wrong");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ================= DELETE JOB =================
//   const handleDeleteJob = async (job) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete "${job.title}"?`
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteJob(job._id);

//       alert("Job deleted successfully");

//       await loadJobs();
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Failed to delete job");
//     }
//   };

//   // ================= STATS =================
//   const safeJobs = Array.isArray(jobs) ? jobs : [];

//   const stats = [
//     {
//       label: "Total Jobs",
//       value: safeJobs.length,
//       icon: Briefcase,
//       color: "text-blue-600",
//     },
//     {
//       label: "Active Jobs",
//       value: safeJobs.filter((j) => j.status === "Active").length,
//       icon: Briefcase,
//       color: "text-green-600",
//     },
//     {
//       label: "Draft Jobs",
//       value: safeJobs.filter((j) => j.status === "Draft").length,
//       icon: Edit,
//       color: "text-orange-600",
//     },
//     {
//       label: "Applications",
//       value: safeJobs.reduce(
//         (sum, j) => sum + (j.applications || 0),
//         0
//       ),
//       icon: Clock,
//       color: "text-purple-600",
//     },
//   ];

//   // ================= STATUS COLORS =================
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Active":
//         return "bg-green-100 text-green-800";

//       case "Draft":
//         return "bg-gray-100 text-gray-800";

//       case "Paused":
//         return "bg-yellow-100 text-yellow-800";

//       case "Closed":
//         return "bg-red-100 text-red-800";

//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="space-y-6 p-6">
//       {/* ================= HEADER ================= */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">
//             Job Postings
//           </h1>

//           <p className="text-gray-500">
//             Manage your company jobs
//           </p>
//         </div>

//         <button
//           onClick={handleCreateJob}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Create Job
//         </button>
//       </div>

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;

//           return (
//             <div
//               key={index}
//               className="border rounded-lg p-5 bg-white shadow-sm"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-500 text-sm">
//                     {stat.label}
//                   </p>

//                   <h2 className="text-2xl font-bold">
//                     {stat.value}
//                   </h2>
//                 </div>

//                 <div className={stat.color}>
//                   <Icon className="w-7 h-7" />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ================= JOBS ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
//         {safeJobs.map((job) => (
//           <div
//             key={job._id}
//             className="border rounded-xl p-5 bg-white shadow-sm"
//           >
//             {/* TOP */}
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h2 className="text-xl font-semibold">
//                   {job.title}
//                 </h2>

//                 <p className="text-gray-500">
//                   {job.department}
//                 </p>
//               </div>

//               <span
//                 className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                   job.status
//                 )}`}
//               >
//                 {job.status}
//               </span>
//             </div>

//             {/* INFO */}
//             <div className="space-y-2 mb-4">
//               <div className="flex items-center text-sm text-gray-600">
//                 <MapPin className="w-4 h-4 mr-2" />
//                 {job.location}
//               </div>

//               <div className="flex items-center text-sm text-gray-600">
//                 <Clock className="w-4 h-4 mr-2" />
//                 {job.type}
//               </div>

//               <div className="flex items-center text-sm text-gray-600">
//                 <DollarSign className="w-4 h-4 mr-2" />
//                 {job.salary || "Not specified"}
//               </div>
//             </div>

//             {/* DESCRIPTION */}
//             <p className="text-gray-600 text-sm line-clamp-3 mb-5">
//               {job.description}
//             </p>

//             {/* FOOTER */}
//             <div className="flex items-center justify-between border-t pt-4">
//               <div className="text-sm text-gray-500">
//                 {job.applications || 0} applications
//               </div>

//               <div className="flex items-center space-x-2">
//                 {/* EDIT */}
//                 <button
//                   onClick={() => handleEditJob(job)}
//                   className="text-blue-600 hover:text-blue-800"
//                 >
//                   <Edit className="w-4 h-4" />
//                 </button>

//                 {/* DELETE */}
//                 <button
//                   onClick={() => handleDeleteJob(job)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>

//                 {/* SHARE */}
//                 <button
//                   onClick={() =>
//                     window.open(
//                       `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//                         `${window.location.origin}/jobs/${job._id}`
//                       )}`
//                     )
//                   }
//                   className="text-gray-600 hover:text-black"
//                 >
//                   <Share2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ================= MODAL ================= */}
//       {showJobModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
//           <div className="bg-white rounded-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
//             {/* HEADER */}
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold">
//                 {isEditing
//                   ? "Edit Job"
//                   : "Create Job"}
//               </h2>

//               <button
//                 onClick={() => setShowJobModal(false)}
//               >
//                 <X />
//               </button>
//             </div>

//             {/* FORM */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* TITLE */}
//               <div>
//                 <label className="block mb-1 font-medium">
//                   Job Title *
//                 </label>

//                 <input
//                   type="text"
//                   value={jobForm.title}
//                   onChange={(e) =>
//                     setJobForm({
//                       ...jobForm,
//                       title: e.target.value,
//                     })
//                   }
//                   className="w-full border rounded p-2"
//                 />
//               </div>

//               {/* DEPARTMENT */}
//               <div>
//                 <label className="block mb-1 font-medium">
//                   Department *
//                 </label>

//                 <select
//                   value={jobForm.department}
//                   onChange={(e) =>
//                     setJobForm({
//                       ...jobForm,
//                       department: e.target.value,
//                     })
//                   }
//                   className="w-full border rounded p-2"
//                 >
//                   <option value="">Select</option>

//                   {departments.map((dept) => (
//                     <option key={dept}>
//                       {dept}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* LOCATION */}
//               <div>
//                 <label className="block mb-1 font-medium">
//                   Location *
//                 </label>

//                 <input
//                   type="text"
//                   value={jobForm.location}
//                   onChange={(e) =>
//                     setJobForm({
//                       ...jobForm,
//                       location: e.target.value,
//                     })
//                   }
//                   className="w-full border rounded p-2"
//                 />
//               </div>

//               {/* TYPE */}
//               <div>
//                 <label className="block mb-1 font-medium">
//                   Job Type *
//                 </label>

//                 <select
//                   value={jobForm.type}
//                   onChange={(e) =>
//                     setJobForm({
//                       ...jobForm,
//                       type: e.target.value,
//                     })
//                   }
//                   className="w-full border rounded p-2"
//                 >
//                   {jobTypes.map((type) => (
//                     <option key={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SALARY */}
//               <div>
//                 <label className="block mb-1 font-medium">
//                   Salary
//                 </label>

//                 <input
//                   type="text"
//                   value={jobForm.salary}
//                   onChange={(e) =>
//                     setJobForm({
//                       ...jobForm,
//                       salary: e.target.value,
//                     })
//                   }
//                   className="w-full border rounded p-2"
//                 />
//               </div>

//               {/* STATUS */}
//               <div>
//                 <label className="block mb-1 font-medium">
//                   Status *
//                 </label>

//                 <select
//                   value={jobForm.status}
//                   onChange={(e) =>
//                     setJobForm({
//                       ...jobForm,
//                       status: e.target.value,
//                     })
//                   }
//                   className="w-full border rounded p-2"
//                 >
//                   {statuses.map((status) => (
//                     <option key={status}>
//                       {status}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* DESCRIPTION */}
//             <div className="mt-4">
//               <label className="block mb-1 font-medium">
//                 Description *
//               </label>

//               <textarea
//                 rows={4}
//                 value={jobForm.description}
//                 onChange={(e) =>
//                   setJobForm({
//                     ...jobForm,
//                     description: e.target.value,
//                   })
//                 }
//                 className="w-full border rounded p-2"
//               />
//             </div>

//             {/* REQUIREMENTS */}
//             <div className="mt-4">
//               <label className="block mb-1 font-medium">
//                 Requirements
//               </label>

//               <textarea
//                 rows={3}
//                 value={jobForm.requirements}
//                 onChange={(e) =>
//                   setJobForm({
//                     ...jobForm,
//                     requirements: e.target.value,
//                   })
//                 }
//                 className="w-full border rounded p-2"
//               />
//             </div>

//             {/* BENEFITS */}
//             <div className="mt-4">
//               <label className="block mb-1 font-medium">
//                 Benefits
//               </label>

//               <textarea
//                 rows={3}
//                 value={jobForm.benefits}
//                 onChange={(e) =>
//                   setJobForm({
//                     ...jobForm,
//                     benefits: e.target.value,
//                   })
//                 }
//                 className="w-full border rounded p-2"
//               />
//             </div>

//             {/* ACTIONS */}
//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setShowJobModal(false)}
//                 className="border px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSaveJob}
//                 disabled={isLoading}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
//               >
//                 {isLoading
//                   ? "Saving..."
//                   : isEditing
//                   ? "Update Job"
//                   : "Create Job"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobPostings;


















import React, { useState, useEffect } from "react";
import {
  Plus,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  Share2,
  X,
} from "lucide-react";
import axios from "axios";
import { shareJobToLinkedIn } from "../services/jobService";

const JobPostings = () => {
  // ================= API URL =================
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:9077";

  // ================= STATES =================
  const [jobs, setJobs] = useState([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ================= FORM STATE =================
  const initialFormState = {
    title: "",
    department: "",
    location: "",
    type: "Full-Time",
    salary: "",
    status: "Draft",
    description: "",
    requirements: "",
    benefits: "",
  };

  const [jobForm, setJobForm] = useState(initialFormState);

  // ================= OPTIONS =================
  const departments = [
    "Sales",
    "Marketing",
    "Engineering",
    "Customer Success",
    "HR",
    "Finance",
  ];

  const jobTypes = [
    "Full-Time",
    "Part-Time",
    "Contract",
    "Internship",
  ];

  // IMPORTANT:
  // Backend enum must also include "Paused"
  const statuses = ["Draft", "Active", "Paused", "Closed"];

  // ================= LOAD JOBS =================
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/jobs`);

      console.log("Jobs API Response:", res.data);

      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        setJobs(res.data.data);
      } else {
        console.error("Expected array but got:", res.data);
        setJobs([]);
      }
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setJobs([]);
    }
  };

  // ================= OPEN CREATE MODAL =================
  const handleCreateJob = () => {
    setSelectedJob(null);
    setIsEditing(false);
    setJobForm(initialFormState);
    setShowJobModal(true);
  };

  // ================= OPEN EDIT MODAL =================
  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsEditing(true);

    setJobForm({
      title: job.title || "",
      department: job.department || "",
      location: job.location || "",
      type: job.type || "Full-Time",
      salary: job.salary || "",
      status: job.status || "Draft",
      description: job.description || "",
      requirements: job.requirements || "",
      benefits: job.benefits || "",
    });

    setShowJobModal(true);
  };

  // ================= SAVE JOB =================
  const handleSaveJob = async () => {
    try {
      setIsLoading(true);

      if (
        !jobForm.title ||
        !jobForm.department ||
        !jobForm.location ||
        !jobForm.description
      ) {
        alert("Please fill all required fields");
        return;
      }

      // ================= UPDATE =================
      if (isEditing && selectedJob) {
        await axios.put(
          `${API_BASE_URL}/api/jobs/${selectedJob._id}`,
          jobForm
        );

        alert("Job updated successfully");
      }

      // ================= CREATE =================
      else {
        await axios.post(`${API_BASE_URL}/api/jobs`, jobForm);

        alert("Job created successfully");
      }

      // Reload jobs
      await loadJobs();

      // Close modal
      setShowJobModal(false);

      // Reset form
      setJobForm(initialFormState);
    } catch (err) {
      console.error("Save job error:", err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ================= DELETE JOB =================
  const handleDeleteJob = async (job) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${job.title}"?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/jobs/${job._id}`);

      alert("Job deleted successfully");

      await loadJobs();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete job");
    }
  };

  // ================= SHARE TO LINKEDIN =================
  const handleShareToLinkedIn = async (job) => {
    const confirmShare = window.confirm(`Post "${job.title}" to the company LinkedIn page?`);
    if (!confirmShare) return;

    try {
      setIsLoading(true);
      await shareJobToLinkedIn(job._id);
      alert("Successfully posted to LinkedIn Company Page!");
    } catch (err) {
      console.error("LinkedIn Share Error:", err);
      alert(err.response?.data?.message || "Failed to post to LinkedIn.");
    } finally {
      setIsLoading(false);
    }
  };

  // ================= STATS =================
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const stats = [
    {
      label: "Total Jobs",
      value: safeJobs.length,
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      label: "Active Jobs",
      value: safeJobs.filter((j) => j.status === "Active").length,
      icon: Briefcase,
      color: "text-green-600",
    },
    {
      label: "Draft Jobs",
      value: safeJobs.filter((j) => j.status === "Draft").length,
      icon: Edit,
      color: "text-orange-600",
    },
    {
      label: "Applications",
      value: safeJobs.reduce(
        (sum, j) => sum + (j.applications || 0),
        0
      ),
      icon: Clock,
      color: "text-purple-600",
    },
  ];

  // ================= STATUS COLORS =================
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";

      case "Draft":
        return "bg-gray-100 text-gray-800";

      case "Paused":
        return "bg-yellow-100 text-yellow-800";

      case "Closed":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Postings</h1>
          <p className="text-gray-500">
            Manage your company jobs
          </p>
        </div>

        <button
          onClick={handleCreateJob}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Job
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="border rounded-lg p-5 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    {stat.label}
                  </p>

                  <h2 className="text-2xl font-bold">
                    {stat.value}
                  </h2>
                </div>

                <div className={stat.color}>
                  <Icon className="w-7 h-7" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= JOBS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {safeJobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-xl p-5 bg-white shadow-sm"
          >
            {/* TOP */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {job.title}
                </h2>

                <p className="text-gray-500">
                  {job.department}
                </p>
              </div>

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  job.status
                )}`}
              >
                {job.status}
              </span>
            </div>

            {/* INFO */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {job.location}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                {job.type}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                {job.salary || "Not specified"}
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm line-clamp-3 mb-5">
              {job.description}
            </p>

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-sm text-gray-500">
                {job.applications || 0} applications
              </div>

              <div className="flex items-center space-x-2">
                {/* EDIT */}
                <button
                  onClick={() => handleEditJob(job)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-4 h-4" />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => handleDeleteJob(job)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* SHARE */}
                <button
                  onClick={() => handleShareToLinkedIn(job)}
                  title="Post to Company LinkedIn Page"
                  className="text-gray-600 hover:text-black"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {isEditing ? "Edit Job" : "Create Job"}
              </h2>

              <button
                onClick={() => setShowJobModal(false)}
              >
                <X />
              </button>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* TITLE */}
              <div>
                <label className="block mb-1 font-medium">
                  Job Title *
                </label>

                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) =>
                    setJobForm({
                      ...jobForm,
                      title: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                />
              </div>

              {/* DEPARTMENT */}
              <div>
                <label className="block mb-1 font-medium">
                  Department *
                </label>

                <select
                  value={jobForm.department}
                  onChange={(e) =>
                    setJobForm({
                      ...jobForm,
                      department: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                >
                  <option value="">Select</option>

                  {departments.map((dept) => (
                    <option key={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* LOCATION */}
              <div>
                <label className="block mb-1 font-medium">
                  Location *
                </label>

                <input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) =>
                    setJobForm({
                      ...jobForm,
                      location: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                />
              </div>

              {/* TYPE */}
              <div>
                <label className="block mb-1 font-medium">
                  Job Type *
                </label>

                <select
                  value={jobForm.type}
                  onChange={(e) =>
                    setJobForm({
                      ...jobForm,
                      type: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                >
                  {jobTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* SALARY */}
              <div>
                <label className="block mb-1 font-medium">
                  Salary
                </label>

                <input
                  type="text"
                  value={jobForm.salary}
                  onChange={(e) =>
                    setJobForm({
                      ...jobForm,
                      salary: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="block mb-1 font-medium">
                  Status *
                </label>

                <select
                  value={jobForm.status}
                  onChange={(e) =>
                    setJobForm({
                      ...jobForm,
                      status: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4">
              <label className="block mb-1 font-medium">
                Description *
              </label>

              <textarea
                rows={4}
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />
            </div>

            {/* REQUIREMENTS */}
            <div className="mt-4">
              <label className="block mb-1 font-medium">
                Requirements
              </label>

              <textarea
                rows={3}
                value={jobForm.requirements}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    requirements: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />
            </div>

            {/* BENEFITS */}
            <div className="mt-4">
              <label className="block mb-1 font-medium">
                Benefits
              </label>

              <textarea
                rows={3}
                value={jobForm.benefits}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    benefits: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowJobModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveJob}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
              >
                {isLoading
                  ? "Saving..."
                  : isEditing
                  ? "Update Job"
                  : "Create Job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostings;