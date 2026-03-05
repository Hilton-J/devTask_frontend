import { useState } from "react";
import axios, { type AxiosRequestConfig, AxiosError } from "axios";

interface PostResult<T, B> {
  data: T | null;
  error: string | null;
  loading: boolean;
  post: (body: B) => Promise<void>;
}

export const usePost = <T, B>(
  url: string,
  config?: AxiosRequestConfig,
): PostResult<T, B> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (body: B) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post<T>(url, body, config);

      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      // Accessing the custom error message from your Express server if available
      setError(axiosError.response?.data?.message || axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
};
