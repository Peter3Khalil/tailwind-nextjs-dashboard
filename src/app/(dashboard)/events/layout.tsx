import React from 'react';
import { EventsProvider } from './providers/events-provider';
import { PageLayout } from '@/components/layouts/PageLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <EventsProvider>
      <PageLayout>{children}</PageLayout>
    </EventsProvider>
  );
};

export default Layout;
