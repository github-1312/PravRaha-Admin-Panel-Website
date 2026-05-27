import axios from "axios";


// export const NODE_BASE_URL = "";
export const NODE_BASE_URL = "https://node.pravraha.com";
// export const NODE_BASE_URL = "https://backendpravraha.encleadus.cloud";
// export const NODE_BASE_URL = "https://aws.allindiadusadhpariwar.org"
// export const NODE_BASE_URL = "http://localhost:3000";



export const API_NODE = axios.create({
  baseURL: NODE_BASE_URL,
  timeout: 600000,
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  
});

export const API_NODE_FILE = axios.create({
  baseURL: NODE_BASE_URL,
  timeout: 600000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  
});


// export const API_NODE_FILE = axios.create({
//   baseURL: NODE_BASE_URL,
//   timeout: 600000,
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
  
// });





export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://node.encleadus.cloud",
  headers: {
    "Content-Type": "application/json",
  },
});


API_NODE.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


API_NODE_FILE.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API_NODE.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        
        window.location.href = "/login";
      }
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Axios error:", error.message);
    }
    return Promise.reject(error);
  }
);

API_NODE_FILE.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Axios error:", error.message);
    }
    return Promise.reject(error);
  }
);
