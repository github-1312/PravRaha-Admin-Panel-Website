import { useMutation , useQuery, useQueryClient } from '@tanstack/react-query';
import { API_NODE, API_NODE_FILE } from '../../services/api.js';




export const useGetBlogs =()=>{

    return useQuery({
        queryKey:['blogs'],
        queryFn: async () => await API_NODE.get('/landingpage/blog'),
        staleTime:1000*60*60,
        cacheTime:1000*60*60,
    })
}



export const useDeleteBlogs = () =>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:async (id)=>await API_NODE.delete(`/landingpage/blog/${id}`),
        onSuccess:()=>{
            queryClient.invalidateQueries(['blogs'])

        }
    })
}


const updateBlog = async ({ id, blogData }) => {
  const formData = new FormData();

  for (const key in blogData) {
    if (blogData[key] !== undefined && blogData[key] !== null) {
      formData.append(key, blogData[key]);
    }
  }

  const response = await API_NODE_FILE.put(`/landingpage/blog/${id}`, formData);

  return response.data; 
};

// Custom hook
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      
      queryClient.setQueryData(['blogs'], (old) => {
        if (!old) return [updatedBlog];
        const blogsArray = Array.isArray(old) ? old : old.data || [];
        return blogsArray.map((b) => (b._id === updatedBlog._id ? updatedBlog : b));
      });
    },
  });
};




const createBlog = async (blogData) => {
  const formData = new FormData();

  // append all fields
  for (const key in blogData) {
    if (blogData[key] !== undefined && blogData[key] !== null) {
      formData.append(key, blogData[key]);
    }
  }

  const response = await API_NODE_FILE.post('/landingpage/blog', formData);

  return response.data;
}
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
     
      queryClient.setQueryData(['blogs'], (old) => {
        if (!old) return [newBlog];
        const blogsArray = Array.isArray(old) ? old : old.data || [];
        return [newBlog, ...blogsArray];
      });
    },
  });
};