import React from 'react'

const UserDetail = ({selectedUserDetail , setShowUserModal}) => {
  return (
    <div className="p-6 space-y-6">
  <div className="flex items-center space-x-4 border-b pb-4">
    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
      {selectedUserDetail.firstName[0]}{selectedUserDetail.lastName[0]}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {selectedUserDetail.firstName} {selectedUserDetail.lastName}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {selectedUserDetail.role === 'superadmin' ? 'Super Admin' : selectedUserDetail.role.toUpperCase()}
      </p>
    </div>
  </div>

  {/* Basic Info */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div className="space-y-3">
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Email</p>
        <p className="font-medium text-gray-900 dark:text-white">{selectedUserDetail.email}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Phone</p>
        <p className="font-medium text-gray-900 dark:text-white">{selectedUserDetail.phone}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Designation</p>
        <p className="font-medium text-gray-900 dark:text-white">{selectedUserDetail.designation}</p>
      </div>
    </div>

    <div className="space-y-3">
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Company</p>
        <p className="font-medium text-gray-900 dark:text-white">{selectedUserDetail.companyName}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Credits</p>
        <p className="font-medium text-gray-900 dark:text-white">{selectedUserDetail.credits}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Status</p>
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
            selectedUserDetail.isActive
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {selectedUserDetail.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  </div>

  {/* Meta Info */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6">
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">User Type</p>
      <p className="font-medium text-gray-900 dark:text-white capitalize">{selectedUserDetail.userType}</p>
    </div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">OTP Verified</p>
      <span
        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
          selectedUserDetail.otpVerified
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        }`}
      >
        {selectedUserDetail.otpVerified ? 'Verified' : 'Not Verified'}
      </span>
    </div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Created At</p>
      <p className="font-medium text-gray-900 dark:text-white">
        {new Date(selectedUserDetail.createdAt).toLocaleString()}
      </p>
    </div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Updated At</p>
      <p className="font-medium text-gray-900 dark:text-white">
        {new Date(selectedUserDetail.updatedAt).toLocaleString()}
      </p>
    </div>
  </div>

  {/* Close Button */}
  <div className="flex justify-end pt-6">
    <button
      onClick={() => setShowUserModal(false)}
      className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 transition duration-150"
    >
      Close
    </button>
  </div>
</div>

  )
}

export default UserDetail