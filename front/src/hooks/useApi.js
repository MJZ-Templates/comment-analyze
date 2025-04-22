import { useState, useCallback } from "react";
import instance from "../apis/instance";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (axiosConfig) => {
    setLoading(true);
    setError(null);

    try {
      const res = await instance(axiosConfig);
      const response = res.data;

      if (response.success) {
        return response.data;
      } else {
        setError(response.error?.message || "request error");
        return null;
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "server error");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};

export default useApiRequest;
