'use client';
import { useBreadcrumb } from '@/app/(dashboard)/events/providers/breadcrumb-provider';
import {
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import React, { useEffect } from 'react';

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
