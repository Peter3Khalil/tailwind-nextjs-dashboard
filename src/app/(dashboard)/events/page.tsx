'use client';
import { EventsTableProvider } from '@/app/(dashboard)/events/providers/events-table-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EventsTable from './components/EventsTable';
import PaginationControl from './components/PaginationControl';
import { useEvents } from './providers/events-provider';
import Search from './components/Search';

const Events = () => {
  const {
    queryResult: { data },
  } = useEvents();
  const numberOfPages = data?.data.paginationResult.numberOfPages || 0;
  const limit = data?.data.paginationResult.limit || 0;
  const total = numberOfPages * limit;
  return (
    <section className="flex w-full flex-1 flex-col gap-3 overflow-auto rounded-md border">
      <div className="flex items-center justify-between px-4">
        <h1 className="p-4 text-2xl font-bold">Events({total})</h1>
        <Button asChild>
          <Link href="/events/create">Create Event</Link>
        </Button>
      </div>
      <div className="px-4">
        <Search />
      </div>
      <EventsTable />
      <PaginationControl />
    </section>
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
