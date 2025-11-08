import axios from 'axios';
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    // Handle specific error cases
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Internal server error');
          break;
        default:
          console.error(`API Error: ${status}`);
      }
    } else if (error.request) {
      console.error('No response from server');
    } else {
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Helper function to handle API errors
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data?.message || 'An error occurred';
    } else if (error.request) {
      return 'No response from server. Please check your connection.';
    }
  }
  return 'An unexpected error occurred';
};

// Generic GET request
export const get = async <T>(url: string, config?: Record<string, unknown>): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};

// Generic POST request
export const post = async <T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

// Generic PUT request
export const put = async <T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

// Generic PATCH request
export const patch = async <T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> => {
  const response = await apiClient.patch<T>(url, data, config);
  return response.data;
};

// Generic DELETE request
export const del = async <T>(url: string, config?: Record<string, unknown>): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

export default apiClient;
