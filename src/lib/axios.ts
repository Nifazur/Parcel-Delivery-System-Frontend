import config from "@/config";
import axios, {type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

let isRefreshing = false;

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  pendingQueue = [];
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle network errors first
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(error);
    }

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check for authentication errors - Updated to match your backend
    const isAuthError = 
      error.response.status === 401 || // Changed from 500 to 401
      (error.response.status === 403 && error.response.data?.message === "No Token Received");

    const isTokenExpired = 
      error.response.data?.message === "jwt expired" ||
      error.response.data?.message === "No Token Received" ||
      error.response.data?.message?.includes("expired");

    if (isAuthError && isTokenExpired && !originalRequest._retry) {
      console.log("Token expired, attempting refresh...");

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      isRefreshing = true;
      
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log("New Token arrived", res);

        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        processQueue(refreshError);
        
        // Clear any stored auth data and redirect to login
        if (typeof window !== 'undefined') {
          // If you're using localStorage for any auth data
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          
          
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For all other errors
    return Promise.reject(error);
  }
);