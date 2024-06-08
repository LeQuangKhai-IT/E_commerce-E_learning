"use client";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/redux/auth/hooks";
import { refreshAccessToken, logout } from "@/redux/auth/authSlice";

const api = axios.create({
  baseURL: "/api",
});

const dispatch = useAppDispatch();

api.interceptors.request.use(
  (config) => {
    const accessToken = useAppSelector((state) => state.auth);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = useAppSelector((state) => state.auth.refreshToken);
      if (refreshToken) {
        try {
          const response = await dispatch(refreshAccessToken(refreshToken));
          api.defaults.headers.common.Authorization = `Bearer ${response.payload.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          dispatch(logout());
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
