import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Textarea from "../common/TextArea";
import Button from "../common/Button";

// Reply Modal
const ReplyModal = ({ query, isOpen, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    subject: "",
    body: "",
  });

  // Reset form when query changes or modal opens
  useEffect(() => {
    setFormData({ subject: "", body: "" });
  }, [query, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ queryId: query._id, ...formData });
  };

  if (!query) return null;

  const q = query.query || query || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reply to Query" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            To: {q.email || "-"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            From: {q.name || "-"}
          </p>
        </div>

        <Input
          label="Subject"
          type="text"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          placeholder="Enter email subject"
          className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
        />

        <Textarea
          label="Message"
          required
          value={formData.body}
          onChange={(e) =>
            setFormData({ ...formData, body: e.target.value })
          }
          placeholder="Type your reply here..."
          rows={8}
          className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
            type="button"
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            icon={Send}
            type="submit"
            disabled={isLoading}
            className="dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500"
          >
            {isLoading ? "Sending..." : "Send Reply"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReplyModal;
