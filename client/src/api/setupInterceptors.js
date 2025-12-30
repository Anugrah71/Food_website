import api from "./axios";

let isRefreshing = false;
let failedQueue = [];
let requestInterceptorId;
let responseInterceptorId;

const processQueue = (error, token = null) => {
  failedQueue.forEach(p =>
    error ? p.reject(error) : p.resolve(token)
  );
  failedQueue = [];
};

export const setupInterceptors = (getToken, setToken) => {
  //  Prevent duplicate interceptors
  if (requestInterceptorId !== undefined) {
    api.interceptors.request.eject(requestInterceptorId);
  }
  if (responseInterceptorId !== undefined) {
    api.interceptors.response.eject(responseInterceptorId);
  }

  requestInterceptorId = api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
      console.log("Token",token)
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  responseInterceptorId = api.interceptors.response.use(
    res => res,
    async err => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await api.post("/api/refresh");
          setToken(res.data.accessToken);
          processQueue(null, res.data.accessToken);

          originalRequest.headers.Authorization =
            `Bearer ${res.data.accessToken}`;

          return api(originalRequest);
        } catch (error) {
          processQueue(error, null);
          throw error;
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(err);
    }
  );
};
