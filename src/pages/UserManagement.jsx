

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Users, Mail, Calendar, Loader2 } from 'lucide-react';
import { useAuth } from '../services/auth.context';
import { useFetchDashboard } from '../query/csv/useDashboard';
import { useGetAllUsers, useGetUserById } from '../query/csv/useUserManagement';
import DataTable from './usermanagement/DataTableUser';
import Modal from './usermanagement/Modal';
import EditUserModal from './usermanagement/EditUserModal';
import DeleteConfirmationModal from './usermanagement/DeleteConfirmationModal';
import UserDetail from './usermanagement/UserDetail';

const UserManagement = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  
  // Separate search input state for immediate UI updates
  const [searchInput, setSearchInput] = useState('');
  
  // State for filters with proper initialization
  const [filters, setFilters] = useState({ 
    role: '', 
    isActive: '', 
    search: '', 
    page: 1, 
    limit: 10 
  });

  





  // Debounce search input - only update filters.search after delay
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: searchInput,
        page: 1 // Reset to page 1 when search changes
      }));
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  // Fetch users with filters and pagination - will trigger on filters change
  const {
    data: userList,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
    isFetching: isListFetching,
    refetch: refetchUsers
  } = useGetAllUsers(filters);

  // Fetch dashboard stats
  const { data: dashboardData } = useFetchDashboard();

  // Fetch single user for modal
  const { data: selectedUserDetail, isLoading: isDetailLoading } = useGetUserById(selectedUserId);

  // Dashboard stats
  const dashboardStats = useMemo(() => [
    { 
      label: 'Total Users', 
      value: dashboardData?.stats?.totalUsers ?? 0, 
      icon: Users, 
      color: 'text-blue-600', 
      subLabel: 'Registered' 
    },
    { 
      label: 'Total Contacts', 
      value: dashboardData?.stats?.totalContacts ?? 0, 
      icon: Mail, 
      color: 'text-green-600', 
      subLabel: 'Contacts saved' 
    },
    { 
      label: 'Total Companies', 
      value: dashboardData?.stats?.totalCompanies ?? 0, 
      icon: Calendar, 
      color: 'text-orange-600', 
      subLabel: 'Companies added' 
    }
  ], [dashboardData]);

  // Columns for table
  const columns = useMemo(() => [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {row.firstName?.[0]?.toUpperCase()}{row.lastName?.[0]?.toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {`${row.firstName || ''} ${row.lastName || ''}`}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.email}</p>
          </div>
        </div>
      )
    },
    { key: 'phone', header: 'Phone', sortable: true },
    // { 
    //   key: 'credits', 
    //   header: 'Credits', 
    //   sortable: true,
    //   render: (value) => value ?? 0
    // },
    { key: 'designation', header: 'Designation', sortable: true },
    { 
      key: 'role', 
      header: 'Role', 
      sortable: true,
      render: (value) => (
        <span className="capitalize">{value || 'N/A'}</span>
      )
    },
    {
      key: 'isActive',
      header: 'Status',
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ], []);

  // Filter definitions
  const filterDefinitions = useMemo(() => [
    {
      key: 'role',
      placeholder: 'All Roles',
      options: [
        { value: '', label: 'All' },
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
   
      ]
    },
    {
      key: 'isActive',
      placeholder: 'All Status',
      options: [
        { value: '', label: 'All' },
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' }
      ]
    }
  ], []);

  // Handle filter changes from DataTable - triggers API call immediately
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ 
      ...prev, 
      ...newFilters, 
      page: 1 // Reset to page 1 when filters change
    }));
  }, []);

  // Handle page change - triggers API call immediately
  const handlePageChange = useCallback((newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle search change - debounced via useEffect
  const handleSearchChange = useCallback((searchValue) => {
    setSearchInput(searchValue);
  }, []);

  // Handle limit/items per page change - triggers API call immediately
  const handleLimitChange = useCallback((newLimit) => {
    setFilters(prev => ({ 
      ...prev, 
      limit: newLimit, 
      page: 1 // Reset to page 1 when limit changes
    }));
  }, []);

  // Actions
  const handleView = useCallback((user) => { 
    setSelectedUserId(user._id); 
    setShowUserModal(true); 
  }, []);
  
  const handleEdit = useCallback((user) => { 
    setShowEditModal(user._id);
  }, []);
  
  const handleDelete = useCallback((user) => {
    setShowDeleteModal(user._id);
  }, []);

  // Handle successful edit or delete - refetch data
  const handleSuccessfulUpdate = useCallback(() => {
    refetchUsers();
  }, [refetchUsers]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900 space-y-8 font-sans">
      <style jsx="true">{`
        .card { 
          @apply bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition duration-300; 
        }
        .btn-primary { 
          @apply px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-150 shadow-md; 
        }
        .btn-outline { 
          @apply px-4 py-2 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 transition duration-150; 
        }
      `}</style>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
          <Users className="w-8 h-8 mr-3 text-blue-600" /> User Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage registered users and their status.
          {isListFetching && (
            <span className="ml-4 text-blue-500 text-sm inline-flex items-center">
              <Loader2 className="w-4 h-4 mr-1 animate-spin" /> Refreshing...
            </span>
          )}
        </p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {stat.subLabel}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                  <Icon className="h-7 w-7" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Registered Users
        </h2>

        {isListError ? (
          <div className="card p-6 text-red-600 dark:text-red-400">
            <p className="font-semibold">Error Loading Users:</p>
            <p className="text-sm">{listError?.message || 'Could not connect to the API.'}</p>
            <button 
              onClick={() => refetchUsers()}
              className="mt-4 btn-primary"
            >
              Retry
            </button>
          </div>
        ) : isListLoading ? (
          <div className="card p-6 flex items-center justify-center text-blue-600">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <p>Fetching user list...</p>
          </div>
        ) : (
          <DataTable
            data={userList?.users || []}
            columns={columns}
            filters={filterDefinitions}
            filterValues={{ ...filters, search: searchInput }}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            onLimitChange={handleLimitChange}
            totalPages={userList?.totalPages || 1}
            currentPage={userList?.currentPage || 1}
            totalUsers={userList?.totalUsers || 0}
            onPageChange={handlePageChange}
            isLoading={isListFetching}
          />
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && (
        <Modal onClose={() => setShowUserModal(false)}>
          {isDetailLoading ? (
            <div className="p-10 flex items-center justify-center text-blue-600">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <p>Loading user details...</p>
            </div>
          ) : selectedUserDetail ? (
            <UserDetail 
              selectedUserDetail={selectedUserDetail} 
              setShowUserModal={setShowUserModal} 
            />
          ) : (
            <p className="p-10 text-center text-red-500">
              User details could not be loaded.
            </p>
          )}
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditUserModal 
          userId={showEditModal} 
          onClose={() => {
            setShowEditModal(null);
            handleSuccessfulUpdate();
          }} 
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          user={showDeleteModal}
          onDelete={() => {
            setShowDeleteModal(null);
            handleSuccessfulUpdate();
          }}
          onCancel={() => setShowDeleteModal(null)}
        />
      )}
    </div>
  );
};

export default UserManagement;