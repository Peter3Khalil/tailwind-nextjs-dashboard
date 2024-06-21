import { CancelIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import EventsApi from '@/features/EventsApi';
import { Event } from '@/types/event.types';
import React, { FC, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
interface RejectButtonProps extends React.ComponentProps<typeof Button> {
  event: Event;
}
const RejectButton: FC<RejectButtonProps> = ({ event, ...props }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(EventsApi.reject, {
    onSettled: () => {
      queryClient.invalidateQueries('events');
    },
  });
  const handleReject = useCallback(async () => {
    mutate(event._id);
  }, [event._id, mutate]);

  return (
    <Button
      variant={'secondary'}
      onClick={handleReject}
      className="h-auto p-1"
      {...props}
    >
      <CancelIcon size={16} />
    </Button>
  );
};

export default RejectButton;
