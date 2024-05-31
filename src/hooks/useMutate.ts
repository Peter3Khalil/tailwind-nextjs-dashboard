'use client';
import React from 'react';

// eslint-disable-next-line no-unused-vars
const useMutate = <T, U>(fn: (data: U) => Promise<T>) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);
  const mutate = async (data: U) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn(data);
      return res;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, mutate };
};
export default useMutate;
