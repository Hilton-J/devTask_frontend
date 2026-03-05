import { useState } from "react";
import axios, { type AxiosError } from "axios";

interface PostResult {
  data: { message: string } | null;
  error: string | null;
  loading: boolean;
  post: (apiEndpoint: string, email: string) => Promise<void>;
}

export const usePost = (url: string): PostResult => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (apiEndpoint: string, email: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${url}?url=${apiEndpoint}&email=${email}`,
      );

      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      setError(axiosError.response?.data.error || axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
};
