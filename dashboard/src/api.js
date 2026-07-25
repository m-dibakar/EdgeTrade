import axios from "axios";
import { API_URL, LANDING_URL } from "./config";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.replace(`${LANDING_URL}/login`);
    }
    return Promise.reject(err);
  }
);

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.replace(`${LANDING_URL}/login`);
}

export default api;
