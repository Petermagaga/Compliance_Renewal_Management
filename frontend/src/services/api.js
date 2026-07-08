import axios from "axios";

import authService from "./authService";
import env from "../config/env";
import tokenService from "./tokenService";

const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const processQueue = (
    error,
    token = null
) => {

    failedQueue.forEach((promise) => {

        if (error) {

            promise.reject(error);

        } else {

            promise.resolve(token);

        }

    });

    failedQueue = [];

};

let isRefreshing = false;

let failedQueue = [];

api.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);
api.interceptors.response.use(

    response => response,

    async error => {

        const originalRequest = error.config;

        if (

            error.response?.status === 401 &&

            !originalRequest._retry

        ) {

            if (isRefreshing) {

                return new Promise((resolve, reject) => {

                    failedQueue.push({

                        resolve,

                        reject,

                    });

                })

                .then(token => {

                    originalRequest.headers.Authorization =
                        `Bearer ${token}`;

                    return api(originalRequest);

                });

            }

            originalRequest._retry = true;

            isRefreshing = true;

            try {

                const newToken =
                    await authService.refreshToken();

                processQueue(null, newToken);

                originalRequest.headers.Authorization =
                    `Bearer ${newToken}`;

                return api(originalRequest);

            }

            catch (err) {

                processQueue(err);

                authService.logout();

                return Promise.reject(err);

            }

            finally {

                isRefreshing = false;

            }

        }

        return Promise.reject(error);

    }

);
export default api;