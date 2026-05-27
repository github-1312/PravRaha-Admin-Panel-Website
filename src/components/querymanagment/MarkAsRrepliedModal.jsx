import { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { CheckCircle } from "lucide-react";

// Mark as Replied Modal
const MarkRepliedModal = ({ query, isOpen, onClose, onSubmit, isLoading }) => {
  const [subject, setSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ queryId: query._id, subject });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mark as Replied" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Mark this query as replied without sending an email. This is useful if you've already responded through another channel.
        </p>

        <Input
          label="Subject (Optional)"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief description of your response"
          className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="success"
            icon={CheckCircle}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Mark as Replied'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MarkRepliedModal;
