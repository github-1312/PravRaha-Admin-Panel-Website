import { CheckCircle, Eye, Mail, Trash2, Download } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";

const QueryCard = ({ query, onView, onReply, onMarkReplied, onDelete, onDownload }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  const isReplied = query.query?.replied;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {query.query?.name || "-"}
            </h3>
            <div className="flex gap-1 mt-1 sm:mt-0">
              <Badge variant={isReplied ? "success" : "warning"} className="dark:text-gray-100">
                {isReplied ? "Replied" : "Pending"}
              </Badge>
              <Badge className="dark:text-gray-100">{query.query?.service || "-"}</Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            {query.query?.email || "-"}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2 mb-2">
            {query.query?.requirements || "-"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(query.query?.createdAt || query.createdAt)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          <Button
            variant="ghost"
            size="sm"
            icon={Eye}
            onClick={() => onView(query)}
            className="dark:text-gray-100"
          >
            View
          </Button>

          {!isReplied && (
            <>
              <Button variant="primary" size="sm" icon={Mail} onClick={() => onReply(query)}>
                Reply
              </Button>
              <Button
                variant="success"
                size="sm"
                icon={CheckCircle}
                onClick={() => onMarkReplied(query)}
              >
                Mark
              </Button>
            </>
          )}

          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => onDownload(query)}
            className="dark:text-gray-100"
          >
            Download
          </Button>

          <Button variant="danger" size="sm" icon={Trash2} onClick={() => onDelete(query)} />
        </div>
      </div>
    </Card>
  );
};

export default QueryCard;
