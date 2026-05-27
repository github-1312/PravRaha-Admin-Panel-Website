import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobService";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        // Depending on whether your backend wraps the job in { data: ... } or just returns it directly
        if (response?.data) {
          setJob(response.data);
        } else {
          setJob(response);
        }
      } catch (err) {
        console.error("Failed to load job", err);
        setError("Could not load job details. It may have been deleted or the ID is invalid.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error || "Job not found"}
        </div>
        <button 
          onClick={() => navigate("/job-postings")} 
          className="mt-6 flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Job Postings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate("/job-postings")}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {job.title}
            </h1>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              {job.department}
            </p>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            job.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            job.status === 'Draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
            job.status === 'Paused' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {job.status}
          </span>
        </div>

        {/* Key details grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 py-6 border-y border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <MapPin className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
            <span className="font-medium">{job.location}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Clock className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
            <span className="font-medium">{job.type}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <DollarSign className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
            <span className="font-medium">{job.salary || "Not specified"}</span>
          </div>
        </div>

        {/* Rich Text Areas */}
        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Description</h3>
            <p className="whitespace-pre-wrap leading-relaxed">{job.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;