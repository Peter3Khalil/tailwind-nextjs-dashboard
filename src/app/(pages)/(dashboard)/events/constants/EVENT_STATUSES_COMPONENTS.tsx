import { Badge } from '@/components/ui/badge';
import { EventStatusWithOutAll } from '@/types/event.types';

type EventStatusesComponentType = Record<
  EventStatusWithOutAll,
  { component: JSX.Element }
>;

export const EVENT_STATUSES_COMPONENTS: EventStatusesComponentType = {
  rejected: {
    component: (
      <Badge className="capitalize" variant={'destructive'}>
        <p className="text-[12px] font-normal">rejected</p>
      </Badge>
    ),
  },
  pending: {
    component: (
      <Badge className="capitalize" variant={'outline'}>
        <p className="text-[12px] font-normal">Pending</p>
      </Badge>
    ),
  },
  accepted: {
    component: (
      <Badge className="text-xs capitalize opacity-40" variant={'secondary'}>
        <p className="text-[12px] font-normal">accepted</p>
      </Badge>
    ),
  },
};
