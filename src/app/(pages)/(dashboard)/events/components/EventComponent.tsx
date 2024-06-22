import { Event } from '@/app/(pages)/(dashboard)/events/types/event.types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { FC } from 'react';

interface EventComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}
const EventComponent: FC<EventComponentProps> = ({
  event,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden text-ellipsis text-xs',
        className,
      )}
      {...props}
    >
      <Button
        variant={'link'}
        className="size-auto items-start justify-start p-0"
      >
        <span className="overflow-hidden text-ellipsis font-semibold">
          <Link href={`/events/${event._id}`}>{event.eventName}</Link>
        </span>
      </Button>
      <Record label="organization name" value={event.organizationName} />
      <Record label="location" value={event.eventAddress} />
      <Record label="Description" value={event.eventDescription} />
    </div>
  );
};

export default EventComponent;

interface RecordProps extends React.HTMLAttributes<HTMLParagraphElement> {
  label: string;
  value: string | number;
}
const Record = ({ label, value, className, ...props }: RecordProps) => (
  <p
    className={cn(
      'w-full overflow-hidden text-ellipsis text-[0.9em] text-muted-foreground',
      className,
    )}
    title={value.toString()}
    {...props}
  >
    <span className="mr-1 capitalize">{label}: </span>
    <span className="font-medium">{value}</span>
  </p>
);
