import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_NODE } from "../../services/api.js";

// Fetch contact details
export const useGetContact = () => {
	return useQuery({
		queryKey: ["contact"],
		queryFn: async () => {
			const response = await API_NODE.get("/landingpage/company-contact");
			return response; // { success, message, data }
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
};

// Normalize payload to backend expectations (controller expects `phone`)
export const prepareContactUpdateData = ({ email, address, mobile, phone }) => {
	return {
		email,
		address,
		phone: phone || mobile || "",
	};
};

// Update contact details
export const useUpdateContact = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (contactInput) => {
			const payload = prepareContactUpdateData(contactInput);
			const response = await API_NODE.put("/landingpage/company-contact", payload);
			return response; // { success, message, data }
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["contact"] });
		},
		onError: (error) => {
			console.error("Error updating contact details:", error);
		},
	});
};

// Helper to read a consistent mobile value from API response
export const getMobileFromContact = (contact) => {
	if (!contact) return "";
	return contact.phone || contact.mobile || "";
};
