// // src/services/jobService.js

// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/jobs"; 
// // change when deployed

// export const getJobs = async () => {
//   const res = await axios.get(BASE_URL);
//   return res.data;
// };

// export const createJob = async (jobData) => {
//   const res = await axios.post(BASE_URL, jobData);
//   return res.data;
// };

// export const deleteJob = async (id) => {
//   const res = await axios.delete(`${BASE_URL}/${id}`);
//   return res.data;
// };

// export const updateJob = async (id, jobData) => {
//   const res = await axios.put(`${BASE_URL}/${id}`, jobData);
//   return res.data;
// };







// import axios from "axios";

// // ================= API URL =================
// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:9077";

// // ================= GET ALL JOBS =================
// export const getJobs = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/jobs`);
//     return response.data;
//   } catch (error) {
//     console.error("Get Jobs Error:", error);
//     throw error;
//   }
// };

// // ================= CREATE JOB =================
// export const createJob = async (jobData) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/api/jobs`,
//       jobData
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Create Job Error:", error);
//     throw error;
//   }
// };

// // ================= UPDATE JOB =================
// export const updateJob = async (id, jobData) => {
//   try {
//     const response = await axios.put(
//       `${API_BASE_URL}/api/jobs/${id}`,
//       jobData
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Update Job Error:", error);
//     throw error;
//   }
// };

// // ================= DELETE JOB =================
// export const deleteJob = async (id) => {
//   try {
//     const response = await axios.delete(
//       `${API_BASE_URL}/api/jobs/${id}`
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Delete Job Error:", error);
//     throw error;
//   }
// };

import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9077";

// ================= SHARE TO LINKEDIN COMPANY PAGE =================
export const shareJobToLinkedIn = async (id) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/jobs/${id}/share`
    );

    return response.data;
  } catch (error) {
    console.error("Share Job Error:", error);
    throw error;
  }
};

// ================= GET SINGLE JOB =================
export const getJobById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Job By ID Error:", error);
    throw error;
  }
};