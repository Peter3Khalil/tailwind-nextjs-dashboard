'use client';
import CustomBreadcrumb, {
  BreadcrumbItemType,
} from '@/components/shared/CustomBreadcrumb';
import { usePathname } from 'next/navigation';
import React from 'react';
import { EventsProvider } from './providers/events-provider';

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    name: 'Dashboard',
    link: '/dashboard',
  },
  { name: 'Events', link: '/events' },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <section className="flex h-14 w-full shrink-0 items-center justify-between">
        <CustomBreadcrumb
          breadcrumbPage={
            pathname === '/events' ? 'All Events' : pathname.split('/').pop()!
          }
          breadcrumbItems={breadcrumbItems}
        />
      </section>
      {children}
    </div>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <EventsProvider>
      <Layout>{children}</Layout>
    </EventsProvider>
  );
};

export default Wrapper;
