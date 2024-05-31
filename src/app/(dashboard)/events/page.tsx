'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllEvents, rejectEvent } from '@/features/events';
import useFetch from '@/hooks/useFetch';
import useMutate from '@/hooks/useMutate';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useDeferredValue, useEffect } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';

export default function Events() {
  const { data, error, refetch } = useFetch(getAllEvents);
  const deferredValue = useDeferredValue(data?.data || []);
  const { mutate } = useMutate(rejectEvent);
  useEffect(() => {
    setTimeout(() => {
      mutate({
        id: '6657ad063a9b8210e054ffba',
      }).then(() => {
        refetch();
      });
    }, 5000);
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <section className="flex w-full items-center justify-between">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/events">Events</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Events</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </section>
      <section className="prose prose-lg flex w-full max-w-full items-center justify-between">
        <article className="*:m-0">
          <h2>Events</h2>
          <p className="text-sm text-muted-foreground">
            Manage all your events here
          </p>
        </article>
        <div className="flex items-center gap-2">
          <Button>Create Event</Button>
        </div>
      </section>
      <section className="flex-1">
        <DataTable columns={columns} data={deferredValue} />
      </section>
    </div>
  );
}
