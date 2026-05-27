import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_NODE } from '../../services/api.js';

// ✅ Single Key for All User Operations
const USER_KEY = ['adminUsers'];

// ----------------------------------------------------------------------
// 1️⃣ GET: All Users (with filters)
// ----------------------------------------------------------------------
export const useGetAllUsers = (filters = {}) => {
  const fetchAllUsers = async () => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null
      )
    );

    const data = await API_NODE.get('/admin/user', { params: cleanedFilters });
    return data; // { users, totalPages, totalUsers, currentPage }
  };

  return useQuery({
    queryKey: [USER_KEY, JSON.stringify(filters)], // single key for all
    queryFn: fetchAllUsers,
    keepPreviousData: true,
  });
};

// ----------------------------------------------------------------------
// 2️⃣ PUT: Update User
// ----------------------------------------------------------------------
export const useUpdateUser = (options) => {
  const queryClient = useQueryClient();

  const updateUser = async ({ userId, updatedFields }) => {
    const data = await API_NODE.put(`/admin/user/${userId}`, updatedFields);
    return data; // { message, user }
  };

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(USER_KEY); // refetch all users
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
  });
};

// ----------------------------------------------------------------------
// 3️⃣ POST: Add Credit to User
// ----------------------------------------------------------------------
export const useAddCreditToUser = (options) => {
  const queryClient = useQueryClient();

  const addCredit = async ({ userId, amount, description }) => {
    const data = await API_NODE.post(`/admin/user/credit/${userId}`, {
      amount,
      description,
    });
    return data; // { message, user }
  };

  return useMutation({
    mutationFn: addCredit,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(USER_KEY);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
  });
};

// ----------------------------------------------------------------------
// 4️⃣ DELETE: Soft Delete (Deactivate User)
// ----------------------------------------------------------------------
export const useSoftDeleteUser = (options) => {
  const queryClient = useQueryClient();

  const softDeleteUser = async (userId ) => {
    const data = await API_NODE.delete(`/admin/user/${userId}`);
    return data; // { message, user }
  };

  return useMutation({
    mutationFn: softDeleteUser,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(USER_KEY);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
  });
};


export const useGetUserById = (userId) => {
  const fetchUserById = async (id) => {
    const  data  = await API_NODE.get(`/admin/user/${id}`);
    return data; 
  };

  return useQuery({
    queryKey: ['adminUser', userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId, 
  });
};
