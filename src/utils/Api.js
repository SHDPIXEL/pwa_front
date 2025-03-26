// api.js
import axios from "axios";

export const API_BASE_URL = "https://2ej9ufdjyb.ap-south-1.awsapprunner.com/";
// export const API_BASE_URL = "http://192.168.1.11:4040"; // Replace with your server's base URL


export const BASE_IMAGE_URL = "https://2ej9ufdjyb.ap-south-1.awsapprunner.com"




const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
