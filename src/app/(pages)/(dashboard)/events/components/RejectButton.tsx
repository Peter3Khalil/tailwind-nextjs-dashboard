import EventsApi from '@/app/(pages)/(dashboard)/events/services/EventsApi';
import { Event } from '@/app/(pages)/(dashboard)/events/types/event.types';
import { CancelIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
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
    <MyTooltip content="Reject" className="text-xs">
      <Button
        variant={'secondary'}
        onClick={handleReject}
        disabled={isLoading}
        className="h-auto p-1"
        {...props}
      >
        <CancelIcon size={16} />
      </Button>
    </MyTooltip>
  );
};

export default RejectButton;
