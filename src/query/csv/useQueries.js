import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_NODE } from "../../services/api.js";

// ✅ Single Cache Key for All Query Operations
const QUERY_KEY = ["adminQueries"];

// ----------------------------------------------------------------------
// 1️⃣ GET: All Queries (with filters, pagination)
//    Endpoint: GET /admin/queries?type=&page=&limit=
// ----------------------------------------------------------------------
export const useGetAllQueries = (filters = {}) => {
  const fetchQueries = async () => {
    const data = await API_NODE.get("/admin/queries", { params: filters });
    return data; // { queries, totalPages, currentPage, totalQueries }
  };

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchQueries,
    keepPreviousData: true,
  });
};

// ----------------------------------------------------------------------
// 2️⃣ GET: Single Query by ID
//    Endpoint: GET /admin/queries/:queryId
// ----------------------------------------------------------------------
export const useGetQueryById = (queryId) => {
  const fetchQueryById = async (id) => {
    const  data  = await API_NODE.get(`/admin/queries/${id}`);
    return data; // single query object
  };

  return useQuery({
    queryKey: ["adminQuery", queryId],
    queryFn: () => fetchQueryById(queryId),
    enabled: !!queryId,
  });
};

// ----------------------------------------------------------------------
// 3️⃣ POST: Reply to a Query (Send Email)
//    Endpoint: POST /admin/queries/reply/:queryId
// ----------------------------------------------------------------------
export const useReplyToQuery = (options) => {
  const queryClient = useQueryClient();

  const replyToQuery = async ({ queryId, subject, body }) => {
    const  data  = await API_NODE.post(`/admin/queries/${queryId}/reply`, {
      subject,
      body,
    });
    return data; // { message, emailDetails }
  };

  return useMutation({
    mutationFn: replyToQuery,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(QUERY_KEY);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
  });
};

// ----------------------------------------------------------------------
// 4️⃣ PUT: Mark Query as Replied (Manual)
//    Endpoint: PUT /admin/queries/replied/:queryId
// ----------------------------------------------------------------------
export const useMarkQueryAsReplied = (options) => {
  const queryClient = useQueryClient();

  const markAsReplied = async ({ queryId, subject }) => {
    const  data  = await API_NODE.patch(`/admin/queries/${queryId}/mark-replied`, {
      subject,
    });
    return data; // { message, query }
  };

  return useMutation({
    mutationFn: markAsReplied,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(QUERY_KEY);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
  });
};

// ----------------------------------------------------------------------
// 5️⃣ DELETE: Delete a Query
//    Endpoint: DELETE /admin/queries/:queryId
// ----------------------------------------------------------------------
export const useDeleteQuery = (options) => {
  const queryClient = useQueryClient();

  const deleteQuery = async ({ queryId }) => {
    const  data  = await API_NODE.delete(`/admin/queries/${queryId}`);
    return data; // { message }
  };

  return useMutation({
    mutationFn: deleteQuery,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(QUERY_KEY);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
  });
};
