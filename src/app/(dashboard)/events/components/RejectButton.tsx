import EventsApi from '@/app/(dashboard)/events/services/EventsApi';
import { Event } from '@/app/(dashboard)/events/types/event.types';
import { CancelIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import React, { FC, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
interface RejectButtonProps extends React.ComponentProps<typeof Button> {
  event: Event;
}
const RejectButton: FC<RejectButtonProps> = ({ event, ...props }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(EventsApi.reject, {
    onSettled: () => {
      queryClient.invalidateQueries('events');
    },
  });
  const handleReject = useCallback(() => {
    mutate(event._id);
  }, [event._id, mutate]);

  return (
    <Button
      variant={'secondary'}
      onClick={handleReject}
      disabled={isLoading}
      className="h-auto p-1"
      {...props}
    >
      <CancelIcon size={16} />
    </Button>
  );
};

export default RejectButton;
