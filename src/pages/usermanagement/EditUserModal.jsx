import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useAddCreditToUser, useGetUserById, useUpdateUser } from "../../query/csv/useUserManagement";
import { DollarSign, Loader2, User, Mail, Phone, Briefcase } from "lucide-react";

const EditUserModal = ({ userId, onClose }) => {
  const { data: user, isLoading: isDetailLoading, isError: isDetailError } = useGetUserById(userId);
  const { mutateAsync: updateUser, isLoading: isUpdating } = useUpdateUser();
  const { mutateAsync: addCredit, isLoading: isAddingCredit } = useAddCreditToUser();

  const [formData, setFormData] = useState({});
  const [creditAmount, setCreditAmount] = useState(0);


  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        companyName: user.companyName,
        designation: user.designation,
        role: user.role,
        userType: user.userType,
        isActive: user.isActive,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const mutationData = {  userId, updatedFields: formData };

    updateUser(mutationData, {
      onSuccess: () => {
        alert(`User ${formData.firstName} updated successfully!`);
        onClose();
      },
      onError: (error) => {
        alert(`Error updating user: ${error.message}`);
      },
    });
  };

  const handleCreditAdd = (e) => {
    e.preventDefault();
    if (creditAmount <= 0) {
      alert("Credit amount must be greater than zero.");
      return;
    }

    const creditData = { userId, amount: creditAmount };

    addCredit(creditData, {
      onSuccess: () => {
        alert(`Successfully added ${creditAmount} credits to ${formData.firstName}.`);
        setCreditAmount(0);
      },
      onError: (error) => {
        alert(`Error adding credits: ${error.message}`);
      },
    });
  };

  if (isDetailLoading) {
    return (
      <Modal onClose={onClose}>
        <div className="p-10 flex items-center justify-center text-blue-600">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <p>Fetching user data...</p>
        </div>
      </Modal>
    );
  }

  if (isDetailError || !user) {
    return (
      <Modal onClose={onClose}>
        <div className="p-10 text-center text-red-500">Error loading user details.</div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Edit User: {user.firstName} {user.lastName}
      </h3>

      {/* Current Credits */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg flex items-center justify-between mb-6 border border-blue-200 dark:border-blue-700">
        <div className="flex items-center">
          <DollarSign className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-300" />
          <span className="text-lg font-medium text-blue-800 dark:text-blue-200">Current Credits:</span>
        </div>
        <span className="text-2xl font-extrabold text-blue-900 dark:text-white">{user.credits}</span>
      </div>

      {/* Add Credit Form */}
      <form onSubmit={handleCreditAdd} className="card p-4 mb-6">
        <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Add Credits 🎁</h4>
        <div className="flex space-x-3">
          <input
            type="number"
            min="1"
            placeholder="Amount to add"
            value={creditAmount || ""}
            onChange={(e) => setCreditAmount(parseInt(e.target.value) || 0)}
            className="flex-grow input-field p-2 border rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center disabled:opacity-50"
            disabled={isAddingCredit || creditAmount <= 0}
          >
            {isAddingCredit && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isAddingCredit ? "Adding..." : "Add Credit"}
          </button>
        </div>
      </form>

      {/* Update User Details */}
      <form onSubmit={handleUpdateSubmit} className="space-y-4">
        <h4 className="font-semibold border-t pt-4 text-gray-800 dark:text-gray-200">User Details Update</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="detail-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
               disabled={true}
              onChange={handleChange}
              className="input-field p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="detail-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              disabled={true}
              value={formData.lastName || ""}
              onChange={handleChange}
              className="input-field p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="detail-label">Email</label>
          <input
            type="email"
            name="email"
             disabled={true}
            value={formData.email || ""}
            onChange={handleChange}
            className="input-field p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="detail-label">Phone</label>
          <input
            type="text"
            name="phone"
             disabled={true}
            value={formData.phone || ""}
            onChange={handleChange}
            className="input-field p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="detail-label">Company Name</label>
            <input
              type="text"
              name="companyName"
               disabled={true}
              value={formData.companyName || ""}
              onChange={handleChange}
              className="input-field p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="detail-label">Designation</label>
            <input
              type="text"
              name="designation"
               disabled={true}
              value={formData.designation || ""}
              onChange={handleChange}
              className="input-field p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="detail-label">Role</label>
            <select
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
              className="select-field p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="detail-label">User Type</label>
            <select
              name="userType"
              value={formData.userType || ""}
              onChange={handleChange}
              className="select-field p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="demo">Demo</option>
              <option value="credit">Credit</option>
            </select>
          </div>
        </div>

        <div>
          <label className="detail-label">Status</label>
          <select
            name="isActive"
            value={formData.isActive ? "true" : "false"}
            onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.value === "true" }))}
            className="select-field p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} type="button" className="btn-outline">Cancel</button>
          <button
            type="submit"
            className="btn-primary flex items-center disabled:opacity-50"
            disabled={isUpdating}
          >
            {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
