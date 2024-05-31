import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import PrivateRoute from '@/components/PrivateRoute';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <div className="flex h-svh w-full flex-col">
        <Header />
        <div className="flex w-full flex-1">
          <Sidebar />
          <main className="w-full flex-1 overflow-auto px-6 py-4 sm:px-8">
            {children}
          </main>
        </div>
        <MobileNav />
      </div>
    </PrivateRoute>
  );
};

export default Layout;
