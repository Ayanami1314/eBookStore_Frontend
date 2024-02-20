import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "../auth/useAuthStore";
const apiClientInstance = axios.create({
  baseURL: "https://wrong_backend.com", // TODO: change it to the backend URL
  params: {
    // TODO: change it what needs
    token: "",
  },
});

class apiClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (params?: any) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "GET",
      params: params,
    };
    const data = apiClientInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
    return data;
  };
  login = (callback: CallableFunction, params?: any) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "GET",
      params: params,
    };
    const data = apiClientInstance
      .get<T>(this.endpoint, config)
      .then((res) => callback(res.data));
    return data;
  };
  getById = (id: string, params?: any) => {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/${id}`,
      method: "GET",
      params: params,
    };
    const data = apiClientInstance
      .get<T>(this.endpoint, config)
      .then((res) => res.data);
    return data;
  };
  post = (data: T) => {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      method: "POST",
      data: data,
    };
    const response = apiClientInstance
      .post<T>(this.endpoint, config)
      .then((res) => res.data);
    return response;
  };
  logout = () => {
    const { clearAuth } = useAuthStore();
    clearAuth();
  };
}

export default apiClient;
