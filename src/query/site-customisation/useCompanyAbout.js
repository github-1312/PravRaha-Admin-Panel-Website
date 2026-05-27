import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_NODE, API_NODE_FILE } from "../../services/api";


// ------------------- API CALLS -------------------
const getCompanyAbout = async () => {
  return await API_NODE.get("/landingpage/company-about"); 
};

const upsertCompanyAbout = async (formData) => {
  
  if (formData instanceof FormData) {
    return await API_NODE_FILE.post("/landingpage/company-about", formData);
  }

  return await API_NODE.post("/landingpage/company-about", formData);
};

// ------------------- QUERIES -------------------
export const useGetCompanyAbout = () => {
  return useQuery({
    queryKey: ["companyAbout"],
    queryFn: getCompanyAbout,
    staleTime: 1000 * 60 * 5, 
  });
};

export const useUpsertCompanyAbout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertCompanyAbout,
    onSuccess: () => {
      queryClient.invalidateQueries(["companyAbout"]);
    },
  });
};
