



import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const CaseStudyForm = ({ defaultValues, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultValues || {
      company: "",
      industry: "",
      challenge: "",
      solution: "",
      salesIncrease: "",
      leadQuality: "",
      timeReduction: "",
      bgColor: "",
    },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("company", data.company);
    formData.append("industry", data.industry);
    formData.append("challenge", data.challenge);
    formData.append("solution", data.solution);
    formData.append(
      "results",
      JSON.stringify({
        salesIncrease: data.salesIncrease,
        leadQuality: data.leadQuality,
        timeReduction: data.timeReduction,
      })
    );
    if (data.image && data.image[0]) formData.append("image", data.image[0]);
    formData.append("bgColor", data.bgColor);

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 max-w-xl bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700"
    >
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
        {defaultValues ? "Edit Case Study" : "Create Case Study"}
      </h2>

      {/* Company */}
      <input
        {...register("company")}
        placeholder="Company"
        className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 
                   bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 
                   placeholder-slate-400 dark:placeholder-slate-500 
                   focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
      />

      {/* Industry */}
      <input
        {...register("industry")}
        placeholder="Industry"
        className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 
                   bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 
                   placeholder-slate-400 dark:placeholder-slate-500 
                   focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
      />

      {/* Challenge */}
      <textarea
        {...register("challenge")}
        placeholder="Challenge"
        rows={3}
        className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 
                   bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 
                   placeholder-slate-400 dark:placeholder-slate-500 
                   focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
      />

      {/* Solution */}
      <textarea
        {...register("solution")}
        placeholder="Solution"
        rows={3}
        className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 
                   bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 
                   placeholder-slate-400 dark:placeholder-slate-500 
                   focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
      />

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          {...register("salesIncrease")}
          placeholder="Sales Increase"
          className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 
                     bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 
                     placeholder-slate-400 dark:placeholder-slate-500 
                     focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
        />
        <input
          {...register("leadQuality")}
          placeholder="Lead Quality"
          className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 
                     bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 
                     placeholder-slate-400 dark:placeholder-slate-500 
                     focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
        />
        <input
          {...register("timeReduction")}
          placeholder="Time Reduction"
          className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 
                     bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 
                     placeholder-slate-400 dark:placeholder-slate-500 
                     focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
        />
      </div>

      {/* Image Upload */}
      <input
        type="file"
        {...register("image")}
        className="w-full text-slate-700 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 
                   file:rounded-lg file:border-0 file:text-sm file:font-medium 
                   file:bg-blue-50 dark:file:bg-slate-700 file:text-blue-600 
                   dark:file:text-slate-200 hover:file:bg-blue-100 dark:hover:file:bg-slate-600"
      />

      {/* Background Color */}
      <input
        {...register("bgColor")}
        placeholder="Background Color (e.g. #FFFFFF)"
        className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 
                   bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 
                   placeholder-slate-400 dark:placeholder-slate-500 
                   focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
      />

      {/* Buttons */}
      <div className="flex space-x-3 pt-2">
        <button
          type="submit"
          className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                     text-white rounded-lg font-medium shadow-md 
                     hover:from-blue-700 hover:to-purple-700 
                     focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 bg-slate-200 dark:bg-slate-700 
                     text-slate-700 dark:text-slate-200 rounded-lg font-medium 
                     hover:bg-slate-300 dark:hover:bg-slate-600 
                     focus:ring-2 focus:ring-slate-400/50 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CaseStudyForm;
