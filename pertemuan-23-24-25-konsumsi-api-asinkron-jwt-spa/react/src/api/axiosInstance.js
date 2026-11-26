// Mini Project - Pertemuan 23-24-25: Instance Axios + interceptor token JWT
// TODO 1: lengkapi interceptor di bawah ini.

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    // TODO: baca token dari localStorage.getItem('token')
    const token = localStorage.getItem("token");

    // TODO: jika token ada, set config.headers.Authorization = `Bearer ${token}`
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;