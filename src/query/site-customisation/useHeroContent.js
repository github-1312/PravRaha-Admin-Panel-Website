import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_NODE } from "../../services/api.js";

// ==========================
// 🔹 API FUNCTIONS
// ==========================


const fetchAllSlides = async () => {
  const  data  = await API_NODE.get("/landingpage/heroSlides");
  return data;
};


const fetchSlideById = async (id) => {
  const data = await API_NODE.get(`/landingpage/heroSlides/${id}`);
  return data;
};


const addSlides = async (payload) => {
  const data  = await API_NODE.post("/landingpage/heroSlides", payload);
  return data;
};


const updateSlide = async ({ id, ...payload }) => {
  const data  = await API_NODE.put(`/landingpage/heroSlides/${id}`, payload);
  return data;
};


const deleteSlide = async (id) => {
  const  data  = await API_NODE.delete(`/landingpage/heroSlides/${id}`);
  return data;
};

// ==========================
// 🔹 QUERY HOOKS
// ==========================


export const useHeroSlides = () => {
  return useQuery({
    queryKey: ["heroSlides"],
    queryFn: fetchAllSlides,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};


export const useHeroSlide = (id) => {
  return useQuery({
    queryKey: ["heroSlide", id],
    queryFn: () => fetchSlideById(id),
    enabled: !!id,
  });
};

// ==========================
// 🔹 MUTATION HOOKS
// ==========================

export const useAddSlides = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSlides,
    onSuccess: () => {
      queryClient.invalidateQueries(["heroSlides"]);
    },
  });
};

export const useUpdateSlide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSlide,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(["heroSlides"]);
      queryClient.invalidateQueries(["heroSlide", id]);
    },
  });
};

export const useDeleteSlide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSlide,
    onSuccess: () => {
      queryClient.invalidateQueries(["heroSlides"]);
    },
  });
};
