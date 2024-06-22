import { META_DATA } from '@/app/(pages)/login/constants/META_DATA';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = META_DATA;
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-svh w-full items-center justify-center px-6 md:px-0">
      {children}
    </div>
  );
};

export default Layout;
