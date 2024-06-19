'use client';
import PrivateRoute from '@/components/PrivateRoute';
import Sidebar from '@/components/Sidebar';
import { UserProvider } from '@/providers/user-provider';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <PrivateRoute>
        <div className="flex h-svh w-full">
          <Sidebar className="shrink-0" />
          <main className="h-full w-full overflow-auto px-6 py-4 sm:px-8">
            {children}
          </main>
        </div>
      </PrivateRoute>
    </UserProvider>
  );
};

export default Layout;
