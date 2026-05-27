import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_NODE, API_NODE_FILE } from "../../services/api.js";

// Fetch company details
export const useGetCompanyDetails = () => {
	return useQuery({
		queryKey: ["companyDetails"],
		queryFn: async () => {
			const response = await API_NODE.get("/landingpage/companydetails");
			return response.data; // { success, message, data }
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
};

// Build multipart form data from inputs
export const prepareCompanyDetailsFormData = ({ companyName, logoLight, logoDark, companyLogo }) => {
	const form = new FormData();
	if (companyName !== undefined) form.append("companyName", companyName);

	// Back-compat: allow single logo as text URL
	if (companyLogo && !(companyLogo instanceof File)) {
		form.append("companyLogo", companyLogo);
	}

	// Light logo: File or URL
	if (logoLight instanceof File) {
		form.append("logoLight", logoLight);
	} else if (logoLight) {
		form.append("companyLogoLight", logoLight);
	}

	// Dark logo: File or URL
	if (logoDark instanceof File) {
		form.append("logoDark", logoDark);
	} else if (logoDark) {
		form.append("companyLogoDark", logoDark);
	}

	return form;
};

// Create or update company details
export const useSaveCompanyDetails = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (formDataOrInput) => {
			const formData = formDataOrInput instanceof FormData
				? formDataOrInput
				: prepareCompanyDetailsFormData(formDataOrInput);
			const response = await API_NODE_FILE.post("/landingpage/companydetails", formData);
			return response.data; // { success, message, data }
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["companyDetails"] });
		},
		onError: (error) => {
			console.error("Error saving company details:", error);
		},
	});
};

// Helpers to read logos
export const getLightLogo = (details) => details?.companyLogoLight || details?.companyLogo || "";
export const getDarkLogo = (details) => details?.companyLogoDark || "";
