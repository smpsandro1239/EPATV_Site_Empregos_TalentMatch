import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async <T>(promise: Promise<T>, successMessage?: string): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await promise;
      if (successMessage) {
        toast.success(successMessage);
      }
      return result;
    } catch (err: any) {
      const message = err.message || 'Ocorreu um erro inesperado';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute };
}
