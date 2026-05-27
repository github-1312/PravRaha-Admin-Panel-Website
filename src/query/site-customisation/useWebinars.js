// query/useWebinars.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_NODE, API_NODE_FILE } from "../../services/api";
;

// Get all webinars
export const useGetWebinars = () => {
  return useQuery({
    queryKey: ["webinars"],
    queryFn: async () => {
      const response = await API_NODE.get("/landingpage/webinars");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

// Get a single webinar by ID (Note: This route doesn't exist in backend yet)
export const useGetWebinar = (id) => {
  return useQuery({
    queryKey: ["webinar", id],
    queryFn: async () => {
      const response = await API_NODE.get(`/landingpage/webinars/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Create a new webinar
export const useCreateWebinar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData) => {
      const response = await API_NODE_FILE.post("/landingpage/webinars", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webinars"] });
    },
    onError: (error) => {
      console.error("Error creating webinar:", error);
    },
  });
};

// Update a webinar
export const useUpdateWebinar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await API_NODE_FILE.put(`/landingpage/webinars/${id}`, formData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["webinars"] });
      queryClient.invalidateQueries({ queryKey: ["webinar", variables.id] });
    },
    onError: (error) => {
      console.error("Error updating webinar:", error);
    },
  });
};

// Delete a webinar
export const useDeleteWebinar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const response = await API_NODE.delete(`/landingpage/webinars/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webinars"] });
    },
    onError: (error) => {
      console.error("Error deleting webinar:", error);
    },
  });
};

// Helper function to prepare form data for webinar
export const prepareWebinarFormData = (webinarData) => {
  const formData = new FormData();
  
  // Add basic fields
  formData.append("title", webinarData.title);
  formData.append("description", webinarData.description);
  formData.append("date", webinarData.date);
  
  // Add speaker if it exists (for backward compatibility)
  if (webinarData.speaker) {
    formData.append("speaker", webinarData.speaker);
  }
  
  // Add image if it's a file
  if (webinarData.image instanceof File) {
    formData.append("image", webinarData.image);
  } else if (webinarData.image) {
    formData.append("image", webinarData.image);
  }
  
  return formData;
};
