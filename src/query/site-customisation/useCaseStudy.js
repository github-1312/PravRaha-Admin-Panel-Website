// src/query/useCaseStudy.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_NODE, API_NODE_FILE } from "../../services/api";



const fetchCaseStudies = async () => {
  return await API_NODE.get("/landingpage/case-study");
};


const fetchCaseStudyById = async (id) => {
  return await API_NODE.get(`/landingpage/case-study/${id}`);
};


const createCaseStudyFn = async (formData) => {
  return await API_NODE_FILE.post("/landingpage/case-study", formData);
};


const updateCaseStudyFn = async ({ id, formData }) => {
  return await API_NODE_FILE.put(`/landingpage/case-study/${id}`, formData);
};


const deleteCaseStudyFn = async (id) => {
  return await API_NODE.delete(`/landingpage/case-study/${id}`);
};


export const useGetCaseStudies = () => {
  return useQuery({
    queryKey: ["caseStudies"],
    queryFn: fetchCaseStudies,
  });
};


export const useGetCaseStudyById = (id) => {
  return useQuery({
    queryKey: ["caseStudy", id],
    queryFn: () => fetchCaseStudyById(id),
    enabled: !!id, 
  });
};


export const useCreateCaseStudy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCaseStudyFn,
    onSuccess: () => {
      queryClient.invalidateQueries(["caseStudies"]);
    },
  });
};


export const useUpdateCaseStudy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCaseStudyFn,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(["caseStudies"]);
      queryClient.invalidateQueries(["caseStudy", id]);
    },
  });
};

// Delete
export const useDeleteCaseStudy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCaseStudyFn,
    onSuccess: () => {
      queryClient.invalidateQueries(["caseStudies"]);
    },
  });
};
