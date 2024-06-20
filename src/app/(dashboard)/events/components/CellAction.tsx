import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from '@/components/shared/Icons';
import { FC, useCallback } from 'react';
import { Event } from '@/types/event.types';
import EventsApi from '@/features/EventsApi';
import { useQueryClient } from 'react-query';
import { useToast } from '@/components/ui/use-toast';
import { toastError } from '@/lib/utils';

interface CellActionProps
  extends React.ComponentProps<typeof DropdownMenuContent> {
  event: Event;
}
const CellAction: FC<CellActionProps> = ({ event, ...props }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const printError = useCallback(
    (error: unknown) => toastError(error, toast),
    [toast],
  );

  const handleDelete = async () => {
    try {
      await EventsApi.delete(event._id);
    } catch (error) {
      printError(error);
    } finally {
      queryClient.invalidateQueries('events');
    }
  };
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

        <Link href={`/events/${event._id}`}>
          <DropdownMenuItem>
            <EditIcon className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={handleDelete}
          className="cursor-pointer text-destructive hover:text-destructive focus:text-destructive"
        >
          <TrashIcon className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
