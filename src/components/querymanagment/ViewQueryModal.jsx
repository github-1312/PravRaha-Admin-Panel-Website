import Badge from "../common/Badge";
import Modal from "../common/Modal";

// View Query Modal
const ViewQueryModal = ({ query, isOpen, onClose }) => {
  if (!query) return null;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  const q = query.query || query || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Query Details" size="md">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{q.name || "-"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{q.email || "-"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{q.company || "-"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{q.role || "-"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
          <div className="mt-1">
            <Badge>{q.type || query.type || "-"}</Badge>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <div className="mt-1">
            <Badge variant={q.replied ? "success" : "warning"}>
              {q.replied ? "Replied" : "Pending"}
            </Badge>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Received At</label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{formatDate(q.repliedAt || query.createdAt)}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Requirements</label>
          <p className="mt-1 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{q.requirements || "-"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <p className="mt-1 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{q.message || "-"}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewQueryModal;