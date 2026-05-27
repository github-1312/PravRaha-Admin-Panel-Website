import React, { useState, useEffect } from 'react';
import { Users, Database, Building2, TrendingUp, Eye, MessageSquare, Clock } from 'lucide-react';
import { useFetchDashboard } from '../query/csv/useDashboard';
import axios from 'axios';

const Dashboard = () => {
  const { data: dashBoardData } = useFetchDashboard();
  const [recentQueries, setRecentQueries] = useState([]);
  const [isLoadingQueries, setIsLoadingQueries] = useState(true);

  useEffect(() => {
    const fetchTopQueries = async () => {
      setIsLoadingQueries(true);
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://node.encleadus.cloud';

        const res = await axios.get(`${API_BASE_URL}/api/admin/reviews`);
        
        const mappedQueries = res.data.map(review => {
          const rawDate = review.created_at || review.createdAt || new Date().toISOString();
          return {
            id: review.id || review._id,
            subject: review.pain_point_1 || 'General Query',
            user: review.contact_name || 'Unknown User',
            email: review.contact_email,
            company: review.company_name,
            status: review.status || 'pending',
            rawDate: rawDate,
            date: new Date(rawDate).toLocaleDateString()
          };
        }).sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate)).slice(0, 5);

        setRecentQueries(mappedQueries);
      } catch (error) {
        console.error("Failed to fetch recent queries", error);
      } finally {
        setIsLoadingQueries(false);
      }
    };

    fetchTopQueries();
  }, []);

  const stats = [
    { 
      label: 'Total Users', 
      value: dashBoardData?.stats?.totalUsers || 0, 
      icon: Users, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    { 
      label: 'Total Contacts', 
      value: dashBoardData?.stats?.totalContacts || 0, 
      icon: Database, 
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    { 
      label: 'Total Companies', 
      value: dashBoardData?.stats?.totalCompanies || 0, 
      icon: Building2, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    },
     { 
      label: 'Query Mechanism', 
      value: dashBoardData?.stats?.totalCompanies || 0, 
      icon: TrendingUp, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    },
  ];

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'completed' || s === 'resolved') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
    if (s === 'in progress') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity (Query Management) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Queries</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Top 5 latest queries from Query Management</p>
            </div>
          </div>
          {/* <button className="flex items-center px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors shadow-sm bg-gray-50 dark:bg-gray-800">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </button> */}
        </div>
        
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {isLoadingQueries ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading recent queries...</div>
          ) : recentQueries.length > 0 ? (
            recentQueries.map((query) => (
              <div key={query.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                        {query.subject}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(query.status)} capitalize`}>
                        {query.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5 truncate">
                        <Users className="flex-shrink-0 h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{query.user}</span>
                        {query.company && (
                          <>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span>{query.company}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <time dateTime={query.rawDate}>{query.date}</time>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <MessageSquare className="mx-auto h-8 w-8 text-gray-400 mb-3 opacity-50" />
              <p>No recent queries found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




// import React from 'react';
// import { Users, Database, Building2, TrendingUp, Eye } from 'lucide-react';
// import { useFetchDashboard } from '../query/csv/useDashboard';

// const Dashboard = () => {
//   const { data: dashBoardData } = useFetchDashboard();

//   const stats = [
//     { 
//       label: 'Total Users', 
//       value: dashBoardData?.stats?.totalUsers || 0, 
//       icon: Users, 
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-100 dark:bg-blue-900'
//     },
//     { 
//       label: 'Total Contacts', 
//       value: dashBoardData?.stats?.totalContacts || 0, 
//       icon: Database, 
//       color: 'text-green-600',
//       bgColor: 'bg-green-100 dark:bg-green-900'
//     },
//     { 
//       label: 'Total Companies', 
//       value: dashBoardData?.stats?.totalCompanies || 0, 
//       icon: Building2, 
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-100 dark:bg-purple-900'
//     },
//   ];

//   const recentActivity = [
//     { user: 'John Doe', action: 'Uploaded customer data', time: '2 minutes ago' },
//     { user: 'Jane Smith', action: 'Created new job posting', time: '15 minutes ago' },
//     { user: 'Mike Johnson', action: 'Downloaded sales report', time: '1 hour ago' },
//     { user: 'Sarah Wilson', action: 'Updated company profile', time: '2 hours ago' },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
//         <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your platform.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
//                   <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
//                     {stat.value.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className={`p-3 rounded-full ${stat.bgColor}`}>
//                   <Icon className={`h-6 w-6 ${stat.color}`} />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
//           <button className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
//             <Eye className="h-4 w-4 mr-2" />
//             View All
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           {recentActivity.map((activity, index) => (
//             <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
//               <div>
//                 <p className="font-medium text-gray-900 dark:text-white">{activity.user}</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
//               </div>
//               <span className="text-sm text-gray-500 dark:text-gray-500">{activity.time}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
 
// const Dashboard = () => {
//   const [reviews, setReviews] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 
//   const API_BASE_URL = 'http://localhost:9077/api/admin';
 
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const [reviewsRes, statsRes] = await Promise.all([
//           axios.get(`${API_BASE_URL}/reviews`),
//           axios.get(`${API_BASE_URL}/stats`)
//         ]);
//         setReviews(reviewsRes.data);
//         setStats(statsRes.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching dashboard data:', err);
//         setError('Failed to load dashboard data');
//         setLoading(false);
//       }
//     };
 
//     fetchDashboardData();
//   }, []);
 
//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       try {
//         await axios.delete(`${API_BASE_URL}/reviews/${id}`);
//         setReviews(reviews.filter(r => r.id !== id));
       
//         // Refresh stats after deletion
//         const statsRes = await axios.get(`${API_BASE_URL}/stats`);
//         setStats(statsRes.data);
//       } catch (err) {
//         console.error('Error deleting review:', err);
//         alert('Failed to delete review');
//       }
//     }
//   };
 
//   if (loading) return <div style={{ padding: '20px' }}>Loading dashboard...</div>;
//   if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
 
//   return (
//     <div className="dashboard-container" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
//       <h1>Admin Dashboard</h1>
     
//       {stats && (
//         <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
//           <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1, backgroundColor: '#f9f9f9' }}>
//             <h3 style={{ margin: '0 0 10px' }}>Total Submissions</h3>
//             <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{stats.total}</p>
//           </div>
//           <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1, backgroundColor: '#f9f9f9' }}>
//             <h3 style={{ margin: '0 0 10px' }}>Pending (Submitted)</h3>
//             <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#E8A84B' }}>{stats.submitted}</p>
//           </div>
//           <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: 1, backgroundColor: '#f9f9f9' }}>
//             <h3 style={{ margin: '0 0 10px' }}>Scored / Completed</h3>
//             <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'green' }}>{stats.scored} / {stats.completed}</p>
//           </div>
//         </div>
//       )}
 
//       <h2>Recent Submissions</h2>
//       <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//         <thead>
//           <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
//             <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Company</th>
//             <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Contact Name</th>
//             <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Email</th>
//             <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
//             <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Score</th>
//             <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reviews.map(review => (
//             <tr key={review.id} style={{ borderBottom: '1px solid #eee' }}>
//               <td style={{ padding: '12px' }}>{review.company_name}</td>
//               <td style={{ padding: '12px' }}>{review.contact_name}</td>
//               <td style={{ padding: '12px' }}>{review.contact_email}</td>
//               <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: review.status === 'completed' ? '#d4edda' : '#fff3cd' }}>{review.status}</span></td>
//               <td style={{ padding: '12px' }}>{review.total_score || 'N/A'}</td>
//               <td style={{ padding: '12px' }}>
//                 <button style={{ marginRight: '10px', cursor: 'pointer', padding: '6px 12px' }} onClick={() => window.location.href = `/review/${review.id}`}>View / Grade</button>
//                 <button style={{ color: 'white', backgroundColor: '#dc3545', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '6px 12px' }} onClick={() => handleDelete(review.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
 
// export default Dashboard;