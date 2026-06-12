import axios from "axios";

const api = axios.create({
  baseURL:
    "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem(
        "accessToken"
      );

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );

        const response = await axios.post(
          "https://employee-app-backend-4vve.onrender.com/auth/refresh",
          {
            refreshToken,
          }
        );

        const newAccessToken =
          response.data.accessToken;

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.clear();

        window.location.href =
          "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;