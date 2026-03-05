import { useState } from "react";
import axios, { type AxiosError } from "axios";

interface PostResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  post: (apiEndpoint: string, email: string) => Promise<void>;
}

export const usePost = <T,>(url: string): PostResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (apiEndpoint: string, email: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Response from API:", url);
      const response = await axios.post<T>(url, { url: apiEndpoint, email });

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
