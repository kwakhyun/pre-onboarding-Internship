import axios from "axios";

export const api = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
});

api.interceptors.request.use((config) => {
  if (config.url === "/auth/signup" || config.url === "/auth/signin") {
    return config;
  }

  if (localStorage.getItem("token") && config.headers) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
});
