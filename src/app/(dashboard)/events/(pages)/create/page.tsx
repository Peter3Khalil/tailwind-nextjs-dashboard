'use client';
import EventForm from '@/app/(dashboard)/events/components/EventForm';
import { useBreadcrumb } from '@/app/(dashboard)/events/providers/breadcrumb-provider';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const Create = () => {
  const { setBreadcrumbPage } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbPage('Create Event');
  }, [setBreadcrumbPage]);
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
