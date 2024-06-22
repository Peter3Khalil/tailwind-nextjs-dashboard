'use client';
import {
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import { useBreadcrumb } from '@/providers/breadcrumb-provider';
import { useEffect } from 'react';

const EventDetails = () => {
  const { setBreadcrumbPage } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbPage('Event Details');
  }, [setBreadcrumbPage]);
  return (
    <PageContent>
      <PageHeader>
        <PageTitle>Event Details</PageTitle>
      </PageHeader>
    </PageContent>
  );
};

export default EventDetails;
