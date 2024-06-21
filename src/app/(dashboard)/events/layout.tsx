'use client';
import {
  BreadcrumbProvider,
  useBreadcrumb,
} from '@/app/(dashboard)/events/providers/breadcrumb-provider';
import { Page, PageLayout, PageSection } from '@/components/layouts/PageLayout';
import CustomBreadcrumb from '@/components/shared/CustomBreadcrumb';
import React from 'react';
import { EventsProvider } from './providers/events-provider';
const EventsBreadcrumb = () => {
  const { breadcrumbItems, breadcrumbPage } = useBreadcrumb();
  return (
    <CustomBreadcrumb
      breadcrumbPage={breadcrumbPage}
      breadcrumbItems={breadcrumbItems}
    />
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <EventsProvider>
      <BreadcrumbProvider>
        <PageLayout>
          <Page>
            <PageSection>
              <EventsBreadcrumb />
            </PageSection>
            {children}
          </Page>
        </PageLayout>
      </BreadcrumbProvider>
    </EventsProvider>
  );
};

export default Layout;
