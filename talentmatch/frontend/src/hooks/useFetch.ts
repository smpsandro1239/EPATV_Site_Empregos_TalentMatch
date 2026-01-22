'use client';

import { useState, useEffect } from 'react';
import { axiosInstance } from '@/services/api';

interface UseFetchOptions {
  skip?: boolean;
}

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFetch = <T,>(
  url: string,
  options?: UseFetchOptions
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!options?.skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (options?.skip) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<T>(url);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [url, options?.skip]);

  return { data, loading, error, refetch };
};
