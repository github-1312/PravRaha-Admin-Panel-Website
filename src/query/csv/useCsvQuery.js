import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_NODE, API_NODE_FILE } from "../../services/api";
import { useAuth } from "../../services/auth.context";





const uploadCsvFn = async ({ file, type }, { onProgress } = {} ) => {
  const CHUNK_SIZE = 5 * 1024 * 1024; 
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const fileId = Date.now().toString();
  let finalResponse = null;

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);
    
    const formData = new FormData();
    formData.append("file", chunk); 
    formData.append("chunkIndex", chunkIndex.toString());
    formData.append("totalChunks", totalChunks.toString());
    formData.append("fileId", fileId);
    formData.append("originalFileName", file.name); 
    formData.append("type", type);
    formData.append("isLastChunk", chunkIndex === totalChunks - 1 ? "true" : "false");

    try {
      const response = await API_NODE_FILE.post("/admin/fileupload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const chunkProgress = (progressEvent.loaded / progressEvent.total) * 100;
          const overallProgress = 
            ((chunkIndex * CHUNK_SIZE + progressEvent.loaded) / file.size) * 100;
          
          if (onProgress) {
            onProgress({
              chunk: chunkIndex + 1,
              totalChunks,
              chunkProgress,
              overallProgress
            });
          }
        },
      });

      if (chunkIndex === totalChunks - 1) {
        finalResponse = response.data;
      }
    } catch (error) {
      console.error(`Error uploading chunk ${chunkIndex + 1}/${totalChunks}:`, error);
      throw error;
    }
  }

  return finalResponse;
};

export const useUploadCsv = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ file, type }, context) => 
      uploadCsvFn({ file, type }, context),
    onSuccess: (data) => {
      console.log("CSV uploaded successfully:", data);

        queryClient.invalidateQueries({ queryKey: ["csvFiles"] });
   
    },
    onError: (error) => {
      console.error("CSV upload failed:", error.response?.data || error.message);
    },
  });
};






export const useFetchCsvFiles = () => {
    const {user } = useAuth();

    return useQuery({
      queryKey: ["csvFiles"],
      queryFn: async () => {
        const response = await API_NODE.get("/admin/fileupload/files");
        console.log(response.files,'check')
        
        return response.files;
      },
        staleTime: 5 * 60 * 1000, 
        enabled: !!user, 

})

};






const fetchFileData = async ({ queryKey }) => {
  const [_key, { fileId, page, limit }] = queryKey;
  const response = await API_NODE.get(`/admin/fileupload/files/${fileId}/records`, {
    params: { page, limit },
  });

  return response;
};


export const useFileData = ({ fileId, page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["fileData", { fileId, page, limit }],
    queryFn: fetchFileData,
    enabled: !!fileId, 
    keepPreviousData: true, 
    staleTime: 60 * 1000, 
    retry: 1, 
  });
};




export const useFileDelete =()=>{
  const queryClient=useQueryClient();
  
  return useMutation({
    mutationFn:async({fileId})=>await API_NODE.delete(`/admin/fileupload/${fileId}/delete`),
    onSuccess:(data)=>{
      queryClient.invalidateQueries({ queryKey: ["csvFiles"] })
    }
  })
}