'use client';
import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageSection,
  PageTitle,
} from '@/components/layouts/PageLayout';
import CustomBreadcrumb, {
  BreadcrumbItemType,
} from '@/components/shared/CustomBreadcrumb';
import { Button } from '@/components/ui/button';

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    name: 'Dashboard',
    link: '/dashboard',
  },
  { name: 'Events', link: '/events' },
];

const Create = () => {
  return (
    <Page>
      <PageSection>
        <CustomBreadcrumb
          breadcrumbPage={'Create Event'}
          breadcrumbItems={breadcrumbItems}
        />
      </PageSection>
      <PageHeader>
        <div>
          <PageTitle>Create Event</PageTitle>
          <PageDescription>
            Create a new event, fill in the details and publish it
          </PageDescription>
        </div>
        <Button>Save</Button>
      </PageHeader>
      <PageContent>
        {/* Form goes here */}
      </PageContent>
    </Page>
  );
};

export default Create;
