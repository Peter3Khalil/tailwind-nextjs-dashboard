'use client';
import EventForm from '@/components/events/EventForm';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import { Button } from '@/components/ui/button';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';

const Create = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/events/Create Event' });
  return (
    <PageContent>
      <PageHeader>
        <div>
          <PageTitle>Create Event</PageTitle>
          <PageDescription>
            Create a new event, fill in the details and publish it
          </PageDescription>
        </div>
        <Button>Save</Button>
      </PageHeader>
      {/* Form goes here */}

      <EventForm />
    </PageContent>
  );
};

export default Create;
