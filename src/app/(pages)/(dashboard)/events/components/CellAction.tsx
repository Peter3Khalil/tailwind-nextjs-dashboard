import EventsApi from '@/app/(pages)/(dashboard)/events/services/EventsApi';
import { Event } from '@/app/(pages)/(dashboard)/events/types/event.types';
import {
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { FC, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

interface CellActionProps
  extends React.ComponentProps<typeof DropdownMenuContent> {
  event: Event;
}
const CellAction: FC<CellActionProps> = ({ event, ...props }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(EventsApi.delete, {
    onSettled: () => {
      queryClient.invalidateQueries('events');
    },
  });

  const handleDelete = useCallback(() => {
    mutate(event._id);
  }, [event._id, mutate]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" {...props}>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Button variant={'ghost'} className="size-auto p-1 text-xs" asChild>
            <Link href={`/events/${event._id}`}>
              <EditIcon className="mr-2 size-4 shrink-0" /> Update
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant={'ghost'}
            className="size-auto p-1 text-xs text-destructive hover:text-destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <TrashIcon className="mr-2 size-4 shrink-0" /> Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
