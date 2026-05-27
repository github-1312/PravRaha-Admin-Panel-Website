import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_NODE } from "../../services/api.js";
import { FaFacebook, FaYoutube, FaInstagram, FaGithub, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa';

// ------------------- GET ALL SOCIAL LINKS -------------------
export const useGetSocialLinks = () => {
  return useQuery({
    queryKey: ["social-links"],
    queryFn: async () => {
      const response = await API_NODE.get("/landingpage/social-links");
      return response; // Returns array of social links
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// ------------------- CREATE SOCIAL LINK -------------------
export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      // data should be { label, href, order?, isActive? }
      const response = await API_NODE.post("/landingpage/social-links", data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-links"] });
    },
    onError: (error) => {
      console.error("Error creating social link:", error);
    },
  });
};

// ------------------- UPDATE SOCIAL LINK -------------------
export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await API_NODE.put(`/landingpage/social-links/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-links"] });
    },
    onError: (error) => {
      console.error("Error updating social link:", error);
    },
  });
};

// ------------------- DELETE SOCIAL LINK -------------------
export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await API_NODE.delete(`/landingpage/social-links/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-links"] });
    },
    onError: (error) => {
      console.error("Error deleting social link:", error);
    },
  });
};

// ------------------- HELPER FUNCTIONS -------------------

// Validate form data
export const validateSocialLinkData = (data) => {
  const errors = {};

  if (!data.label || data.label.trim() === "") {
    errors.label = "Label is required";
  }

  if (!data.href || data.href.trim() === "") {
    errors.href = "URL is required";
  } else if (!isValidUrl(data.href)) {
    errors.href = "Please enter a valid URL";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validate URL
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Get platform icon based on label
export const getPlatformIcon = (label) => {
  const platformIcons = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    github: FaGithub,
    default: FaGlobe,
  };

  const normalized = label?.toLowerCase().replace(/\s+/g, '');
  return platformIcons[normalized] || platformIcons.default;
};

// Get platform color based on label
export const getPlatformColor = (label) => {
  const platformColors = {
    facebook: "bg-blue-600 hover:bg-blue-700",
    twitter: "bg-blue-400 hover:bg-blue-500",
    instagram: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    linkedin: "bg-blue-700 hover:bg-blue-800",
    youtube: "bg-red-600 hover:bg-red-700",
    github: "bg-gray-800 hover:bg-gray-900",
    default: "bg-gray-500 hover:bg-gray-600",
  };

  const normalized = label?.toLowerCase().replace(/\s+/g, '');
  return platformColors[normalized] || platformColors.default;
};