'use client';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className="flex h-svh w-full flex-col gap-4 bg-muted/40 sm:pl-20 sm:pr-6">
        <Header />
        <ScrollArea>
          <main className="px-3 sm:px-0">{children}</main>
        </ScrollArea>
      </div>
    </>
  );
};

export default Layout;
