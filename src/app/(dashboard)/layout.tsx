import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-svh w-full flex-col">
      <Header />
      <div className="flex w-full flex-1 overflow-auto bg-muted/40">
        <Sidebar />
        <ScrollArea className="flex-1">
          <main className="h-full w-full px-4 py-6 sm:px-8">{children}</main>
        </ScrollArea>
      </div>
      <MobileNav />
    </div>
  );
};

export default Layout;
