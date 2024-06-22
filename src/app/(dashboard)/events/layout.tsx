'use client';
import { Page, PageLayout, PageSection } from '@/components/layouts/PageLayout';
import CustomBreadcrumb from '@/components/shared/CustomBreadcrumb';
import { useBreadcrumb } from '@/providers/breadcrumb-provider';
import React, { useEffect } from 'react';
import { EventsProvider } from './providers/events-provider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { breadcrumbPage, setBreadcrumbItems, breadcrumbItems } =
    useBreadcrumb();
  useEffect(() => {
    setBreadcrumbItems([
      {
        name: 'Dashboard',
        link: '/',
      },
      {
        name: 'Events',
        link: '/events',
      },
    ]);
  }, [setBreadcrumbItems]);
  return (
    <EventsProvider>
      <PageLayout>
        <Page>
          <PageSection>
            <CustomBreadcrumb
              breadcrumbPage={breadcrumbPage}
              breadcrumbItems={breadcrumbItems}
            />
          </PageSection>
          {children}
        </Page>
      </PageLayout>
    </EventsProvider>
  );
};

export default Layout;
