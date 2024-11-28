// api.js
import axios, {
  Axios,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import {API_BASE_URL} from '#/lib/constants';
import store from '#/store';
import {clearUser} from '#/store/slices/auth';
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(
//   config => {
//     // const token = localStorage.getItem('token');
//     const token = 'okayyyyy';
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   //   error => {
//   //     return Promise.reject(error);
//   //   },
// );

// // Add a response interceptor
// api.interceptors.response.use(
//   response => {
//     // You can modify the response data here, e.g., handling pagination

//     return response;
//   },
//   (error: AxiosError) => {
//     // console.log("INTERCEPTOR_ERROR: ", error.code);
//     if (error.response?.status === 401) {
//       console.log('REMOVING_USER');
//       //   store.dispatch(clearUser());
//       //   toast.info('Logged out');
//     }
//     return Promise.reject(error);
//   },
// );

export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Define a custom error type
export class ApiError extends Error {
  public status: number;
  public statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// Extract only method keys from Axios
type AxiosMethodKeys = {
  [K in keyof AxiosInstance]: AxiosInstance[K] extends (...args: any[]) => any
    ? K
    : never;
}[keyof AxiosInstance];

// Utility function to handle API requests
export default async function fetchData<T>(
  method: AxiosMethodKeys,
  endpoint: string,
  data?: {[key: string]: any},
  config: AxiosRequestConfig = {},
): Promise<T> {
  try {
    const callableMethod = api[method] as unknown as (
      url: string,
      config?: AxiosRequestConfig,
    ) => Promise<AxiosResponse<ApiResponse<T>>>;

    const response: AxiosResponse<ApiResponse<T>> = await callableMethod(
      endpoint,
      {...data, ...config},
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const statusText = error.response?.statusText ?? 'Unknown error';
      throw new ApiError(
        `API request failed with status ${status}: ${statusText}`,
        status,
        statusText,
      );
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
