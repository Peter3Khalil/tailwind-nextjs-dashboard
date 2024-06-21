'use client';
import { useAuth } from '@/providers/auth-provider';
import React, { useEffect, useState } from 'react';
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isError, isSuccess, isLoading, user } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      const isAdmin = user.role === 'admin';
      if (!isAdmin) {
        window.location.href = '/login';
      }
      setIsAuthenticated(isAdmin);
    }
  }, [isSuccess, user.role]);

  useEffect(() => {
    if (isError) {
      setIsAuthenticated(false);
      window.location.href = '/login';
    }
  }, [isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
