import { Trash2 } from "lucide-react";
import Modal from "../common/Modal";
import Button from "../common/Button";

// Delete Confirmation Modal
const DeleteModal = ({ query, isOpen, onClose, onConfirm, isLoading }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Delete Query" size="sm">
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300">
        Are you sure you want to delete this query from <strong>{query?.name}</strong>? This action cannot be undone.
      </p>
      <div className="flex gap-3 justify-end pt-4">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          icon={Trash2}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  </Modal>
);

export default DeleteModal;
