// api.js
import {useAuth} from '@clerk/clerk-expo';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {API_BASE_URL} from '#/lib/constants';

import {ApiError, ApiResponse, AxiosMethodKeys} from './types';
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('token');

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  //   error => {
  //     return Promise.reject(error);
  //   },
);

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

// Utility function to handle API requests
export default function useRequest() {
  const {getToken} = useAuth();

  async function fetchData<T>(
    method: AxiosMethodKeys,
    endpoint: string,
    data?: {[key: string]: any},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const callableMethod = api[method] as unknown as (
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
      ) => Promise<AxiosResponse<ApiResponse<T>>>;

      const token = await getToken();

      // Build the headers with the Authorization token
      const headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'User-Type': 'passenger',
      };

      // Handle GET and non-GET requests differently
      const response: AxiosResponse<ApiResponse<T>> =
        method === 'get'
          ? await callableMethod(endpoint, {
              ...config,
              headers,
              params: data, // For GET, pass data as params
            })
          : await callableMethod(endpoint, data, {
              ...config,
              headers, // For POST/PUT, pass data in body and headers in config
            });

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

  return {fetchData};
}
