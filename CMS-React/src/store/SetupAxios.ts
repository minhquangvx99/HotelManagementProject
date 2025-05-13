import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import store from './Store';

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_LOCAL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AxiosInstanceTypeBlob = axios.create({
  baseURL: process.env.REACT_APP_API_URL_LOCAL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'blob',
});

AxiosInstanceTypeBlob.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const {
      auth: { access_token },
    } = store.getState();

    if (access_token) config.headers['Token'] = `${access_token}`;

    return config;
  },
  (err: Error | AxiosError) => Promise.reject(err),
);

AxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const {
      auth: { access_token },
    } = store.getState();

    if (access_token) config.headers['Token'] = `${access_token}`;

    return config;
  },
  (err: Error | AxiosError) => Promise.reject(err),
);

export { AxiosInstanceTypeBlob };
export default AxiosInstance;
