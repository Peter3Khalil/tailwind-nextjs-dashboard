'use client';
import { EventsTableProvider } from '@/app/(dashboard)/events/providers/events-table-provider';
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
import Link from 'next/link';
import EventsTable from './components/EventsTable';
import PaginationControl from './components/PaginationControl';
import Search from './components/Search';
import { useEvents } from './providers/events-provider';

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    name: 'Dashboard',
    link: '/dashboard',
  },
  { name: 'Events', link: '/events' },
];

const Events = () => {
  const {
    queryResult: { data },
  } = useEvents();

  return (
    <Page>
      <PageSection>
        <CustomBreadcrumb
          breadcrumbPage={'All Events'}
          breadcrumbItems={breadcrumbItems}
        />
      </PageSection>
      <PageContent>
        <PageHeader>
          <div>
            <PageTitle>Events ({data?.data.totlaCount || 0})</PageTitle>
            <PageDescription>Manage all events in one place</PageDescription>
          </div>
          <Button asChild>
            <Link href="/events/create">Create Event</Link>
          </Button>
        </PageHeader>
        <Search className="focus:border-primary focus-visible:ring-0 focus-visible:ring-transparent" />
        <EventsTable />
        <PaginationControl />
      </PageContent>
    </Page>
  );
};

const Wrapper = () => {
  const {
    queryResult: { data },
  } = useEvents();
  return (
    <EventsTableProvider events={data?.data.data || []}>
      <Events />
    </EventsTableProvider>
  );
};

export default Wrapper;
