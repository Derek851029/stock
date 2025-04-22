import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_KEY = process.env.APIKEY;

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.STOCK_URL,
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
    (config) => {
      config.params = {
        ...config.params,
        apikey: API_KEY,
      };

      return config;
    },
    (error) => Promise.reject(error)
  );


const api = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, { params, ...config }).then((res) => res.data),

  post: <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

export default api;
