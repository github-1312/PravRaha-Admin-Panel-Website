import { useSoftDeleteUser } from "../../query/csv/useUserManagement";
import Modal from "./Modal";

const DeleteConfirmationModal = ({ user, onDelete, onCancel }) => {
    // NOTE: This hook is assumed to include automatic query invalidation (e.g., queryClient.invalidateQueries(userKeys.lists()))
    const { mutateAsync: mutate, isLoading } = useSoftDeleteUser(); 

    const handleDelete = () => {
        mutate(user, {
            onSuccess: (data , userId) => {
               
                alert(`${data.user.firstName} ${data.message}`);
                onDelete();
            },
            onError: (error) => {
                alert(`Error deactivating user: ${error.message}`);
            }
        });
    };

    return (
        <Modal onClose={onCancel}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Deactivation</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to **deactivate** user **{user.name}** ({user.email})? Deactivating will set their status to 'Inactive' and remove their access. This action can be reversed in the edit screen.
            </p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isLoading ? 'Deactivating...' : 'Confirm Deactivate'}
                </button>
            </div>
        </Modal>
    );
};

export default DeleteConfirmationModal;