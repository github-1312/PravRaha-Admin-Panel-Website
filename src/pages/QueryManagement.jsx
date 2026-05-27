// import React, { useState } from 'react';
// import { useDeleteQuery, useGetAllQueries, useMarkQueryAsReplied, useReplyToQuery } from '../query/csv/useQueries';
// import Card from '../components/common/Card';
// import QueryFilters from '../components/querymanagment/QueryFilters';
// import QueryCard from '../components/querymanagment/QueryCard';
// import Pagination from '../components/common/Pagination';
// import ViewQueryModal from '../components/querymanagment/ViewQueryModal';
// import ReplyModal from '../components/querymanagment/ReplyModal';
// import MarkRepliedModal from '../components/querymanagment/MarkAsRrepliedModal';
// import DeleteModal from '../components/querymanagment/DeleteModal';
 
// const QueryManagement = () => {
//   const [filters, setFilters] = useState({ page: 1, limit: 10 });
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [modalState, setModalState] = useState({
//     view: false,
//     reply: false,
//     markReplied: false,
//     delete: false,
//   });
 
//   const { data, isLoading, error } = useGetAllQueries(filters);
 
//   const replyMutation = useReplyToQuery({
//     onSuccess: () => {
//       setModalState({ ...modalState, reply: false });
//       setSelectedQuery(null);
//     }
//   });
 
//   const markRepliedMutation = useMarkQueryAsReplied({
//     onSuccess: () => {
//       setModalState({ ...modalState, markReplied: false });
//       setSelectedQuery(null);
//     }
//   });
 
//   const deleteMutation = useDeleteQuery({
//     onSuccess: () => {
//       setModalState({ ...modalState, delete: false });
//       setSelectedQuery(null);
//     }
//   });
 
//   const openModal = (type, query) => {
//     setSelectedQuery(query);
//     setModalState({ ...modalState, [type]: true });
//   };
 
//   const closeModal = (type) => {
//     setModalState({ ...modalState, [type]: false });
//     setSelectedQuery(null);
//   };
 
//   if (error) {
//     return (
//       <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
//         <Card className="p-6 border border-red-200 bg-red-50 dark:bg-red-900 dark:border-red-700">
//           <p className="text-red-800 dark:text-red-300">Error loading queries: {error.message}</p>
//         </Card>
//       </div>
//     );
//   }
 
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Query Management</h1>
//             <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and respond to customer queries</p>
//           </div>
//           {data && (
//             <div className="text-right">
//               <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.totalQueries}</p>
//               <p className="text-sm text-gray-600 dark:text-gray-300">Total Queries</p>
//             </div>
//           )}
//         </div>
 
//         <QueryFilters filters={filters} setFilters={setFilters} />
 
//         {isLoading ? (
//           <div className="flex items-center justify-center py-12">
//             <div className="text-gray-600 dark:text-gray-300">Loading queries...</div>
//           </div>
//         ) : data?.queries?.length > 0 ? (
//           <div className="space-y-4">
//             {data.queries.map((query) => (
//               <QueryCard
//                 key={query._id}
//                 query={query}
//                 onView={(q) => openModal('view', q)}
//                 onReply={(q) => openModal('reply', q)}
//                 onMarkReplied={(q) => openModal('markReplied', q)}
//                 onDelete={(q) => openModal('delete', q)}
//               />
//             ))}
 
//             {data.totalPages >= 1 && (
//               <div className="pt-4">
//                 <Pagination
//                   currentPage={data.currentPage}
//                   totalPages={data.totalPages}
//                   onPageChange={(page) => setFilters({ ...filters, page })}
//                 />
//               </div>
//             )}
//           </div>
//         ) : (
//           <Card className="p-12 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//             <p className="text-gray-600 dark:text-gray-300">No queries found</p>
//           </Card>
//         )}
 
//         <ViewQueryModal
//           query={selectedQuery}
//           isOpen={modalState.view}
//           onClose={() => closeModal('view')}
//         />
 
//         <ReplyModal
//           query={selectedQuery}
//           isOpen={modalState.reply}
//           onClose={() => closeModal('reply')}
//           onSubmit={replyMutation.mutate}
//           isLoading={replyMutation.isLoading}
//         />
 
//         <MarkRepliedModal
//           query={selectedQuery}
//           isOpen={modalState.markReplied}
//           onClose={() => closeModal('markReplied')}
//           onSubmit={markRepliedMutation.mutate}
//           isLoading={markRepliedMutation.isLoading}
//         />
 
//         <DeleteModal
//           query={selectedQuery}
//           isOpen={modalState.delete}
//           onClose={() => closeModal('delete')}
//           onConfirm={() => deleteMutation.mutate({ queryId: selectedQuery._id })}
//           isLoading={deleteMutation.isLoading}
//         />
//       </div>
//     </div>
//   );
// };
 
// export default QueryManagement;












// import React, { useState } from 'react';
// import { useDeleteQuery, useGetAllQueries, useMarkQueryAsReplied, useReplyToQuery } from '../query/csv/useQueries';
// import React, { useState } from 'react';
// import axios from 'axios';

// import Card from '../components/common/Card';
// import QueryFilters from '../components/querymanagment/QueryFilters';
// import QueryCard from '../components/querymanagment/QueryCard';
// import Pagination from '../components/common/Pagination';
// import ViewQueryModal from '../components/querymanagment/ViewQueryModal';
// import ReplyModal from '../components/querymanagment/ReplyModal';
// import MarkRepliedModal from '../components/querymanagment/MarkAsRrepliedModal';
// import DeleteModal from '../components/querymanagment/DeleteModal';
 
// const QueryManagement = () => {
//   const [filters, setFilters] = useState({ page: 1, limit: 10,search: '', status: 'all' });

//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [modalState, setModalState] = useState({
//     view: false,
//     reply: false,
//     markReplied: false,
//     delete: false,
//   });
 
//   // const { data, isLoading, error } = useGetAllQueries(filters);
  
//   const [queries, setQueries] = useState([]);
//   const [isLoading, setlsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isActionLoading, setlsActionLoading] = useState(false);

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9077';
 
//   // const replyMutation = useReplyToQuery({
//   //   onSuccess: () => {
//   //     setModalState({ ...modalState, reply: false });
//   //     setSelectedQuery(null);
//   //   }
//   // });
 
//   const markRepliedMutation = useMarkQueryAsReplied({
//     onSuccess: () => {
//       setModalState({ ...modalState, markReplied: false });
//       setSelectedQuery(null);
//     }
//   });
 
//   const deleteMutation = useDeleteQuery({
//     onSuccess: () => {
//       setModalState({ ...modalState, delete: false });
//       setSelectedQuery(null);
//     }
//   });
 
//   const openModal = (type, query) => {
//     setSelectedQuery(query);
//     setModalState({ ...modalState, [type]: true });
//   };
 
//   const closeModal = (type) => {
//     setModalState({ ...modalState, [type]: false });
//     setSelectedQuery(null);
//   };
 
//   if (error) {
//     return (
//       <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
//         <Card className="p-6 border border-red-200 bg-red-50 dark:bg-red-900 dark:border-red-700">
//           <p className="text-red-800 dark:text-red-300">Error loading queries: {error.message}</p>
//         </Card>
//       </div>
//     );
//   }
 
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Query Management</h1>
//             <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and respond to customer queries</p>
//           </div>
//           {data && (
//             <div className="text-right">
//               <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.totalQueries}</p>
//               <p className="text-sm text-gray-600 dark:text-gray-300">Total Queries</p>
//             </div>
//           )}
//         </div>
 
//         <QueryFilters filters={filters} setFilters={setFilters} />
 
//         {isLoading ? (
//           <div className="flex items-center justify-center py-12">
//             <div className="text-gray-600 dark:text-gray-300">Loading queries...</div>
//           </div>
//         ) : data?.queries?.length > 0 ? (
//           <div className="space-y-4">
//             {data.queries.map((query) => (
//               <QueryCard
//                 key={query._id}
//                 query={query}
//                 onView={(q) => openModal('view', q)}
//                 onReply={(q) => openModal('reply', q)}
//                 onMarkReplied={(q) => openModal('markReplied', q)}
//                 onDelete={(q) => openModal('delete', q)}
//               />
//             ))}
 
//             {data.totalPages >= 1 && (
//               <div className="pt-4">
//                 <Pagination
//                   currentPage={data.currentPage}
//                   totalPages={data.totalPages}
//                   onPageChange={(page) => setFilters({ ...filters, page })}
//                 />
//               </div>
//             )}
//           </div>
//         ) : (
//           <Card className="p-12 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//             <p className="text-gray-600 dark:text-gray-300">No queries found</p>
//           </Card>
//         )}
 
//         <ViewQueryModal
//           query={selectedQuery}
//           isOpen={modalState.view}
//           onClose={() => closeModal('view')}
//         />
 
//         <ReplyModal
//           query={selectedQuery}
//           isOpen={modalState.reply}
//           onClose={() => closeModal('reply')}
//           onSubmit={replyMutation.mutate}
//           isLoading={replyMutation.isLoading}
//         />
 
//         <MarkRepliedModal
//           query={selectedQuery}
//           isOpen={modalState.markReplied}
//           onClose={() => closeModal('markReplied')}
//           onSubmit={markRepliedMutation.mutate}
//           isLoading={markRepliedMutation.isLoading}
//         />
 
//         <DeleteModal
//           query={selectedQuery}
//           isOpen={modalState.delete}
//           onClose={() => closeModal('delete')}
//           onConfirm={() => deleteMutation.mutate({ queryId: selectedQuery._id })}
//           isLoading={deleteMutation.isLoading}
//         />
//       </div>
//     </div>
//   );
// };
 
// export default QueryManagement;
 
 




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/common/Card';
import QueryFilters from '../components/querymanagment/QueryFilters';
import QueryCard from '../components/querymanagment/QueryCard';
import Pagination from '../components/common/Pagination';
import ViewQueryModal from '../components/querymanagment/ViewQueryModal';
import ReplyModal from '../components/querymanagment/ReplyModal';
import MarkRepliedModal from '../components/querymanagment/MarkAsRrepliedModal';
import DeleteModal from '../components/querymanagment/DeleteModal';

const QueryManagement = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: '', status: 'all' });
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [modalState, setModalState] = useState({
    view: false,
    reply: false,
    markReplied: false,
    delete: false,
    download: false,
  });

  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://node.encleadus.cloud';
  


  const fetchQueries = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/reviews`);
      
      // Map incoming backend reviews to the Query structure expected by QueryCard
      const mappedQueries = res.data.map(review => ({
        ...review,
        name: review.contact_name,
        email: review.contact_email,
        company: review.company_name,
        role: review.contact_role,
        message: review.pain_point_1,
        type: review.status,
        _id: review.id || review._id,
        createdAt: review.created_at || review.createdAt || new Date().toISOString()
      })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setQueries(mappedQueries);
      setError(null);
    } catch (err) {
      console.error("Error fetching queries:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleDelete = async () => {
    if (!selectedQuery) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/reviews/${selectedQuery._id}`);
      closeModal('delete');
      fetchQueries(); // Refresh data table
    } catch (err) {
      console.error("Error deleting review:", err);
      alert('Failed to delete query');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReply = async (data) => {
    setIsActionLoading(true);
    try {
      // Integrate with the backend API to send the email/reply
      // Note: Adjust the endpoint url if your backend routes differ
      await axios.post(`${API_BASE_URL}/api/admin/reviews/${selectedQuery._id}/reply`, data);
      
      closeModal('reply');
      fetchQueries(); // Refresh the list to reflect the updated "Replied" status
    } catch (err) {
      console.error("Error replying to query:", err);
      alert(err.response?.data?.message || 'Failed to send reply');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleMarkReplied = async () => {
    setIsActionLoading(true);
    try {
      // Call backend API to mark as replied without sending an email
      await axios.patch(`${API_BASE_URL}/api/admin/reviews/${selectedQuery._id}/mark-replied`);
      
      closeModal('markReplied');
      fetchQueries(); // Refresh the list
    } catch (err) {
      console.error("Error marking query as replied:", err);
      alert(err.response?.data?.message || 'Failed to mark query as replied');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDownloadReport = async (queryId) => {
    setIsActionLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/reviews/${queryId}/report`, {
        responseType: 'blob', // Required for receiving binary file data
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${queryId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      closeModal('download');
    } catch (err) {
      console.error("Error downloading report:", err);
      alert('Failed to download report');
    } finally {
      setIsActionLoading(false);
    }
  };

  const openModal = (type, query) => {
    setSelectedQuery(query);
    setModalState({ ...modalState, [type]: true });
  };

  const closeModal = (type) => {
    setModalState({ ...modalState, [type]: false });
    setSelectedQuery(null);
  };

  // Client-side filtering and pagination
  const { page = 1, limit = 10, search = '', status = 'all' } = filters;
  const searchLower = search.toLowerCase();

  const filteredQueries = queries.filter(q => {
    let matches = true;
    if (status && status !== 'all') {
      matches = matches && q.status === status;
    }
    if (searchLower) {
      matches = matches && (
        q.name?.toLowerCase().includes(searchLower) ||
        q.email?.toLowerCase().includes(searchLower) ||
        q.subject?.toLowerCase().includes(searchLower)
      );
    }
    return matches;
  });

  const totalQueries = filteredQueries.length;
  const totalPages = Math.ceil(totalQueries / limit) || 1;
  const paginatedQueries = filteredQueries.slice((page - 1) * limit, page * limit);

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
        <Card className="p-6 border border-red-200 bg-red-50 dark:bg-red-900 dark:border-red-700">
          <p className="text-red-800 dark:text-red-300">Error loading queries: {error.message || 'Server Error'}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Query Management</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and respond to customer queries</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalQueries}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Queries</p>
          </div>
        </div>

        <QueryFilters filters={filters} setFilters={setFilters} />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-600 dark:text-gray-300">Loading queries...</div>
          </div>
        ) : paginatedQueries.length > 0 ? (
          <div className="space-y-4">
            {paginatedQueries.map((query) => (
              <QueryCard
                key={query._id}
                query={query}
                onView={(q) => openModal('view', q)}
                onReply={(q) => openModal('reply', q)}
                onMarkReplied={(q) => openModal('markReplied', q)}
                onDelete={(q) => openModal('delete', q)}
                onDownload={(q) => openModal('download', q)}
              />
            ))}

            {totalPages >= 1 && (
              <div className="pt-4">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => setFilters({ ...filters, page: p })}
                />
              </div>
            )}
          </div>
        ) : (
          <Card className="p-12 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300">No queries found</p>
          </Card>
        )}

        <ViewQueryModal
          query={selectedQuery}
          isOpen={modalState.view}
          onClose={() => closeModal('view')}
        />

        <ReplyModal
          query={selectedQuery}
          isOpen={modalState.reply}
          onClose={() => closeModal('reply')}
          onSubmit={handleReply}
          isLoading={isActionLoading}
        />

        <MarkRepliedModal
          query={selectedQuery}
          isOpen={modalState.markReplied}
          onClose={() => closeModal('markReplied')}
          onSubmit={handleMarkReplied}
          isLoading={isActionLoading}
        />

        {/* Download Report Modal */}
        {modalState.download && selectedQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Download Report</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Do you want to download the PDF report for this query?</p>
              <div className="flex justify-end space-x-3">
                <button onClick={() => closeModal('download')} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                <button onClick={() => handleDownloadReport(selectedQuery._id)} disabled={isActionLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center transition-colors">
                  {isActionLoading ? 'Downloading...' : 'Download PDF'}
                </button>
              </div>
            </div>
          </div>
        )}

        <DeleteModal
          query={selectedQuery}
          isOpen={modalState.delete}
          onClose={() => closeModal('delete')}
          onConfirm={handleDelete}
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
};

export default QueryManagement;
