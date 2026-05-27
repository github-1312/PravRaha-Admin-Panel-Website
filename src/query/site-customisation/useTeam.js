// query/useTeam.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_NODE, API_NODE_FILE } from "../../services/api.js";

// Get all team members
export const useGetTeamMembers = () => {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const response = await API_NODE.get("/landingpage/team");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
  });
};

// Get a single team member by ID
export const useGetTeamMember = (id) => {
  return useQuery({
    queryKey: ["team-member", id],
    queryFn: async () => {
      const response = await API_NODE.get(`/landingpage/team/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Create a new team member
export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData) => {
      const response = await API_NODE_FILE.post("/landingpage/team", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
    onError: (error) => {
      console.error("Error creating team member:", error);
    },
  });
};

// Update a team member
export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await API_NODE_FILE.put(`/landingpage/team/${id}`, formData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      queryClient.invalidateQueries({ queryKey: ["team-member", variables.id] });
    },
    onError: (error) => {
      console.error("Error updating team member:", error);
    },
  });
};

// Delete a team member
export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const response = await API_NODE.delete(`/landingpage/team/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
    onError: (error) => {
      console.error("Error deleting team member:", error);
    },
  });
};


export const prepareTeamMemberFormData = (teamMemberData) => {
  const formData = new FormData();
  
  // Add basic fields
  formData.append("name", teamMemberData.name);
  formData.append("role", teamMemberData.role);
  formData.append("bio", teamMemberData.bio);
  
  // Add image if it's a file
  if (teamMemberData.image instanceof File) {
    formData.append("image", teamMemberData.image);
  } else if (teamMemberData.image) {
    formData.append("image", teamMemberData.image);
  }
  
  // Add social links as JSON string
  if (teamMemberData.socialLinks && Array.isArray(teamMemberData.socialLinks)) {
    formData.append("socialLinks", JSON.stringify(teamMemberData.socialLinks));
  }
  
  return formData;
};
