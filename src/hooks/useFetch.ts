import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const useFetch = <T>(asyncFunction: () => Promise<T>): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await asyncFunction();
      setData(data);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
