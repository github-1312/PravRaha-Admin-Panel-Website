// src/pages/CaseStudyLayout.jsx
import React, { useState } from "react";
import {
  useGetCaseStudies,
  useCreateCaseStudy,
  useUpdateCaseStudy,
  useDeleteCaseStudy,
  useGetCaseStudyById,
} from "../query/site-customisation/useCaseStudy";
import { useForm } from "react-hook-form";
import ListView from "../components/Case-study/CaseStudyList";
import CaseStudyForm from "../components/Case-study/CaseStudyForm";
import CaseStudyDetail from "../components/Case-study/CaseStudyDetail";

export default function CaseStudyLayout() {
  const [view, setView] = useState("list"); // list | create | edit | detail
  const [selectedId, setSelectedId] = useState(null);

  // Queries & Mutations
  const { data, isLoading } = useGetCaseStudies();
  const { data: caseStudyDetail } = useGetCaseStudyById(selectedId);
  const createMutation = useCreateCaseStudy();
  const updateMutation = useUpdateCaseStudy();
  const deleteMutation = useDeleteCaseStudy();

  // Handlers
  const handleCreate = (formData) => {
    createMutation.mutate(formData, {
      onSuccess: () => setView("list"),
    });
  };

  const handleUpdate = (formData) => {
    updateMutation.mutate(
      { id: selectedId, formData },
      { onSuccess: () => setView("list") }
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this case study?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6">
      {view === "list" && (
        <ListView
          caseStudies={data?.data || []}
          isLoading={isLoading}
          onAdd={() => setView("create")}
          onEdit={(id) => {
            setSelectedId(id);
            setView("edit");
          }}
          onDelete={handleDelete}
          onDetail={(id) => {
            setSelectedId(id);
            setView("detail");
          }}
        />
      )}

      {view === "create" && (
        <CaseStudyForm
          onSubmit={handleCreate}
          onCancel={() => setView("list")}
        />
      )}

      {view === "edit" && (
        <CaseStudyForm
          defaultValues={caseStudyDetail?.data}
          onSubmit={handleUpdate}
          onCancel={() => setView("list")}
        />
      )}

      {view === "detail" && (
        <CaseStudyDetail
          study={caseStudyDetail?.data}
          onBack={() => setView("list")}
        />
      )}
    </div>
  );
}
