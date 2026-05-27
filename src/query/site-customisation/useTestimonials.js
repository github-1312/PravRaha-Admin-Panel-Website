// query/useTestimonials.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_NODE, API_NODE_FILE } from "../../services/api.js";

// Get all testimonials
export const useGetTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await API_NODE.get("/landingpage/testimonials");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

// Get a single testimonial by ID
export const useGetTestimonial = (id) => {
  return useQuery({
    queryKey: ["testimonial", id],
    queryFn: async () => {
      const response = await API_NODE.get(`/landingpage/testimonials/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Create a new testimonial
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData) => {
      const response = await API_NODE_FILE.post("/landingpage/testimonials", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error) => {
      console.error("Error creating testimonial:", error);
    },
  });
};

// Update a testimonial
export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await API_NODE_FILE.put(`/landingpage/testimonials/${id}`, formData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    
    },
    onError: (error) => {
      console.error("Error updating testimonial:", error);
    },
  });
};

// Delete a testimonial
export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const response = await API_NODE.delete(`/landingpage/testimonials/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error) => {
      console.error("Error deleting testimonial:", error);
    },
  });
};

// Helper function to prepare form data for testimonial
export const prepareTestimonialFormData = (testimonialData) => {
  const formData = new FormData();
  
  // Add basic fields
  formData.append("content", testimonialData.content);
  formData.append("author", testimonialData.author);
  formData.append("role", testimonialData.role);
  formData.append("company", testimonialData.company);
  
  // Add avatar if it's a file
  if (testimonialData.avatar instanceof File) {
    formData.append("avatar", testimonialData.avatar);
  } else if (testimonialData.avatar) {
    formData.append("avatar", testimonialData.avatar);
  }
  
  return formData;
};
