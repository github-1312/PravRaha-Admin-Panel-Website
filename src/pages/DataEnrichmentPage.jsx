import React, { useState } from "react";

const DataEnrichmentPage = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const platforms = [
    { id: "clearbit", label: "Clearbit" },
    { id: "zoominfo", label: "ZoomInfo" },
    { id: "apollo", label: "Apollo" },
    { id: "leadgen", label: "LeadGen AI" },
    { id: "custom", label: "My Custom Provider" },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Data Enrichment
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Select which platform you use for data enrichment.
        </p>

        {/* Radio options */}
        <div className="space-y-4">
          {platforms.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600"
            >
              <input
                type="radio"
                name="platform"
                value={item.id}
                checked={selectedPlatform === item.id}
                onChange={() => setSelectedPlatform(item.id)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800 dark:text-gray-200 text-lg">
                {item.label}
              </span>
            </label>
          ))}
        </div>

        {/* Selected info */}
        {selectedPlatform && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 rounded-xl">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              Selected Platform:{" "}
              <span className="font-bold uppercase">{selectedPlatform}</span>
            </p>
          </div>
        )}

        {/* Continue button */}
        <button
          disabled={!selectedPlatform}
          className={`mt-6 w-full py-3 rounded-xl text-white font-semibold transition 
          ${
            selectedPlatform
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DataEnrichmentPage;
