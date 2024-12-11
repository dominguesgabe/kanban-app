import axios from "axios";
import Router from "next/router";
import { useAuthStore } from "../store/auth";
import { ApiRoute } from "../enums";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      Router.push(ApiRoute.login);
    }

    return Promise.reject(error);
  }
);
