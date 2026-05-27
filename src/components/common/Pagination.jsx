import Button from "./Button";

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center gap-2">
    <Button
      variant="secondary"
      size="sm"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </Button>
    <span className="text-sm text-gray-600 dark:text-gray-300">
      Page {currentPage} of {totalPages}
    </span>
    <Button
      variant="secondary"
      size="sm"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
);

export default Pagination;
