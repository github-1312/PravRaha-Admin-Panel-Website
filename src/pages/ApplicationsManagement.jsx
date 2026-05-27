// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ApplicationsManagement = () => {

//   const [applications, setApplications] = useState([]);

//   const fetchApplications = async () => {
//     try {

//       const response = await axios.get(
//         "http://localhost:9077/api/applications"
//       );

//       setApplications(response.data.applications);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const handleShortlist = async (
//     application,
//     status
//   ) => {

//     try {

//       const response = await axios.post(
//         "http://localhost:9077/api/applications/status",
//         {
//           email: application.email,
//           fullName: application.fullName,
//           status,
//         }
//       );

//       alert(response.data.message);

//     } catch (error) {

//       console.log(error);

//       alert("Something went wrong");

//     }
//   };

//   return (
//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         Jobs Applications Management
//       </h1>

//       <div className="overflow-x-auto">

//         <table className="w-full border border-gray-300">

//           <thead className="bg-black text-white">

//             <tr>

//               <th className="p-3 border">
//                 Name
//               </th>

//               <th className="p-3 border">
//                 Email
//               </th>

//               <th className="p-3 border">
//                 Phone
//               </th>

//               <th className="p-3 border">
//                 Position
//               </th>

//               <th className="p-3 border">
//                 Experience
//               </th>

//               <th className="p-3 border">
//                 Resume
//               </th>

//               <th className="p-3 border">
//                 Shortlisted
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {applications.map((app) => (

//               <tr key={app._id}>

//                 <td className="p-3 border">
//                   {app.fullName}
//                 </td>

//                 <td className="p-3 border">
//                   {app.email}
//                 </td>

//                 <td className="p-3 border">
//                   {app.phone}
//                 </td>

//                 <td className="p-3 border">
//                   {app.position}
//                 </td>

//                 <td className="p-3 border">
//                   {app.experience}
//                 </td>

//                 <td className="p-3 border">

//                   <a
//                     href={`http://localhost:9077/${app.resumeUrl.replace(
//                       /\\/g,
//                       "/"
//                     )}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View Resume
//                   </a>

//                 </td>

//                 <td className="p-3 border">

//                   <div className="flex gap-2">

//                     <button
//                       onClick={() =>
//                         handleShortlist(app, "yes")
//                       }
//                       className="bg-green-500 text-white px-4 py-2 rounded"
//                     >
//                       Yes
//                     </button>

//                     <button
//                       onClick={() =>
//                         handleShortlist(app, "no")
//                       }
//                       className="bg-red-500 text-white px-4 py-2 rounded"
//                     >
//                       No
//                     </button>

//                   </div>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default ApplicationsManagement;


















// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import { Loader2, FileText, CheckCircle, XCircle } from "lucide-react";

// const ApplicationsManagement = () => {
//   const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9077";

//   const [applications, setApplications] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [processingId, setProcessingId] = useState(null);

//   const fetchApplications = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/applications`);
      
//       // Safely handle different possible backend response structures
//       if (Array.isArray(response.data)) {
//         setApplications(response.data);
//       } else if (response.data && Array.isArray(response.data.applications)) {
//         setApplications(response.data.applications);
//       } else if (response.data && Array.isArray(response.data.data)) {
//         setApplications(response.data.data);
//       } else {
//         setApplications([]);
//       }
//       setError(null);
//     } catch (error) {
//       console.error(error);
//       setError("Failed to load applications. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const handleShortlist = async (application, status) => {
//     setProcessingId(application._id);
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/applications/status`, {
//         email: application.email,
//         fullName: application.fullName,
//         status,
//       });

//       alert(response.data.message);

//       // Update local state to reflect the status change
//       setApplications(prev => prev.map(app => 
//         app._id === application._id ? { ...app, status } : app
//       ));
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center text-red-600 dark:text-red-400">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Job Applications
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Review and manage candidate applications
//           </p>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         {isLoading ? (
//           <div className="flex items-center justify-center py-12">
//             <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//             <span className="ml-3 text-gray-600 dark:text-gray-400">Loading applications...</span>
//           </div>
//         ) : applications.length === 0 ? (
//           <div className="p-12 text-center text-gray-500 dark:text-gray-400">
//             No applications found.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
//                 <tr>
//                   <th className="px-6 py-4 font-medium text-sm">Candidate</th>
//                   <th className="px-6 py-4 font-medium text-sm">Contact</th>
//                   <th className="px-6 py-4 font-medium text-sm">Position</th>
//                   <th className="px-6 py-4 font-medium text-sm">Experience</th>
//                   <th className="px-6 py-4 font-medium text-sm">Resume</th>
//                   <th className="px-6 py-4 font-medium text-sm text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {applications.map((app) => (
//                   <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                     <td className="px-6 py-4">
//                       <span className="font-medium text-gray-900 dark:text-white">{app.fullName}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-600 dark:text-gray-400">{app.email}</div>
//                       <div className="text-sm text-gray-500">{app.phone}</div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
//                         {app.position}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
//                       {app.experience}
//                     </td>
//                     <td className="px-6 py-4">
//                       <a
//                         href={app.resumeUrl?.startsWith('http') ? app.resumeUrl : `${API_BASE_URL}/${app.resumeUrl?.replace(/\\/g, "/")}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
//                       >
//                         <FileText className="w-4 h-4 mr-1" />
//                         View
//                       </a>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex justify-center gap-2">
//                         {app.status === 'yes' ? (
//                           <span className="inline-flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
//                             <CheckCircle className="w-4 h-4 mr-1" /> Shortlisted
//                           </span>
//                         ) : app.status === 'no' ? (
//                           <span className="inline-flex items-center text-red-600 dark:text-red-400 text-sm font-medium">
//                             <XCircle className="w-4 h-4 mr-1" /> Rejected
//                           </span>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => handleShortlist(app, "yes")}
//                               disabled={processingId === app._id}
//                               className="px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
//                             >
//                               Accept
//                             </button>
//                             <button
//                               onClick={() => handleShortlist(app, "no")}
//                               disabled={processingId === app._id}
//                               className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
//                             >
//                               Reject
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplicationsManagement;



















import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader2,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";

const ApplicationsManagement = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:9077";
    //  import.meta.env.VITE_API_URL || 'https://node.encleadus.cloud';

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  // ================= FETCH APPLICATIONS =================
  const APPLICATIONS_ENDPOINT = `${API_BASE_URL}/api/applications`;
  const APPLICATIONS_STATUS_ENDPOINT = `${API_BASE_URL}/api/applications/status`;

  const fetchApplications = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(APPLICATIONS_ENDPOINT);
      const responseData = response.data;

      const applicationsFromResponse = Array.isArray(responseData)
        ? responseData
        : Array.isArray(responseData.applications)
        ? responseData.applications
        : Array.isArray(responseData.data)
        ? responseData.data
        : [];

      setApplications(applicationsFromResponse);
      setError(null);
    } catch (err) {
      console.error(err);

      setApplications([]);
      setError(
        "Failed to load applications. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ================= HANDLE STATUS =================
  const handleApplicationStatus = async (
    application,
    status
  ) => {
    try {
      setProcessingId(application._id);

      const response = await axios.post(
        APPLICATIONS_STATUS_ENDPOINT,
        {
          applicationId: application._id,
          email: application.email,
          fullName: application.fullName,
          status,
        }
      );

      alert(response.data.message);

      // Dynamic Local Update
      setApplications((prev) =>
        prev.map((app) =>
          app._id === application._id
            ? {
                ...app,
                status:
                  status === "yes"
                    ? "shortlisted"
                    : "rejected",
              }
            : app
        )
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setProcessingId(null);
    }
  };

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Job Applications
        </h1>

        <p className="text-gray-500">
          Review and manage candidate applications
        </p>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No applications found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left">
                    Candidate
                  </th>

                  <th className="px-6 py-4 text-left">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-left">
                    Position
                  </th>

                  <th className="px-6 py-4 text-left">
                    Experience
                  </th>

                  <th className="px-6 py-4 text-left">
                    Resume
                  </th>

                  <th className="px-6 py-4 text-center">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-t hover:bg-gray-50"
                  >
                    {/* Candidate */}
                    <td className="px-6 py-4">
                      <div className="font-medium">
                        {app.fullName}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {app.email}
                      </div>

                      <div className="text-sm text-gray-500">
                        {app.phone}
                      </div>
                    </td>

                    {/* Position */}
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {app.position}
                      </span>
                    </td>

                    {/* Experience */}
                    <td className="px-6 py-4 text-sm">
                      {app.experience || "N/A"}
                    </td>

                    {/* Resume */}
                    <td className="px-6 py-4">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}/${app.resumeUrl.replace(/\\/g, '/').replace(/^\/?/, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <FileText className="w-4 h-4" />
                          View Resume
                        </a>
                      ) : (
                        <span className="flex items-center text-red-500 text-xs max-w-[200px] leading-tight">
                          <XCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                          Resume file not found. It may have been deleted or not uploaded correctly.
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {app.status === "shortlisted" ? (
                          <span className="flex items-center text-green-600 text-sm font-medium">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Shortlisted
                          </span>
                        ) : app.status === "rejected" ? (
                          <span className="flex items-center text-red-600 text-sm font-medium">
                            <XCircle className="w-4 h-4 mr-1" />
                            Rejected
                          </span>
                        ) : (
                          <>
                            <button
                              disabled={
                                processingId === app._id
                              }
                              onClick={() =>
                                handleApplicationStatus(
                                  app,
                                  "yes"
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
                            >
                              Accept
                            </button>

                            <button
                              disabled={
                                processingId === app._id
                              }
                              onClick={() =>
                                handleApplicationStatus(
                                  app,
                                  "no"
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsManagement;