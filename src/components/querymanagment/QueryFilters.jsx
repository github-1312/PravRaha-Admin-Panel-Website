import { Filter } from "lucide-react";
import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";
import Select from "../common/Select";
import { useState } from "react";

// Filter Component
const QueryFilters = ({ filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        icon={Filter}
        onClick={() => setShowFilters(!showFilters)}
        className="dark:text-gray-200"
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>

      {showFilters && (
        <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Type"
              value={filters.type || ''}
              onChange={(e) => setFilters({ ...filters, type: e.target.value, page: 1 })}
              options={[
                { value: '', label: 'All Types' },
                { value: 'general', label: 'General' },
                { value: 'support', label: 'Support' },
                { value: 'feedback', label: 'Feedback' },
              ]}
              className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />

            <Select
              label="Status"
              value={filters.status || ''}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
              options={[
                { value: '', label: 'All Status' },
                { value: 'replied', label: 'Replied' },
                { value: 'pending', label: 'Pending' },
              ]}
              className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />

            <Input
              label="Search"
              type="text"
              placeholder="Search by name or email..."
              value={filters.search || ''}
              onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
              className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default QueryFilters;
