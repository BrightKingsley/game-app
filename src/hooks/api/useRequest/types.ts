import {AxiosInstance} from 'axios';

export interface ApiResponse<T> {
  data: T;
  message: string;
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
export type AxiosMethodKeys = {
  [K in keyof AxiosInstance]: AxiosInstance[K] extends (...args: any[]) => any
    ? K
    : never;
}[keyof AxiosInstance];
