'use client';
import {
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';

const EventDetails = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/events/Event Details' });
  return (
    <PageContent>
      <PageHeader>
        <PageTitle>Event Details</PageTitle>
      </PageHeader>
    </PageContent>
  );
};

export default EventDetails;
