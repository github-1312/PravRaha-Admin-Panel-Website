import { useQuery } from "@tanstack/react-query";
import { API_NODE } from "../../services/api";



export const useFetchDashboard = () => {

    return useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => API_NODE.get("/admin/dashboard/stats"),
        refetchOnMount:true
    })
}