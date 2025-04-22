import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
console.log(process.env.NEXT_PUBLIC_API_URL);
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

const handleError = (error: AxiosError) => {
  if (error.response) {
    const message =
      (error.response.data as { message: string })?.message ||
      "伺服器錯誤，請稍後再試";
    throw new Error(message);
  } else if (error.request) {
    // 请求未到达服务器
    throw new Error("無法連線到伺服器，請檢查網路");
  } else {
    // 其他未知错误
    throw new Error(error.message || "發生未知錯誤");
  }
};

const api = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    apiClient
      .get<T>(url, { params, ...config })
      .then((res) => res.data as T)
      .catch((error) => handleError(error as AxiosError)),

  post: <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    apiClient
      .post<T>(url, data, config)
      .then((res) => res.data as T)
      .catch((error) => handleError(error as AxiosError)),

  put: <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    apiClient
      .put<T>(url, data, config)
      .then((res) => res.data as T)
      .catch((error) => handleError(error as AxiosError)),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient
      .delete<T>(url, config)
      .then((res) => res.data as T)
      .catch((error) => handleError(error as AxiosError)),
};

export default api;
