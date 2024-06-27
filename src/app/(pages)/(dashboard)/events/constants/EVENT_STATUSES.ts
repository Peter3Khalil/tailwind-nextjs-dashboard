import { EventStatus } from '@/types/event.types';

type EventStatusesType = {
  value: EventStatus;
  label: EventStatus;
}[];
export const EVENT_STATUSES: EventStatusesType = [
  {
    value: 'all',
    label: 'all',
  },
  {
    value: 'pending',
    label: 'pending',
  },
  {
    value: 'rejected',
    label: 'rejected',
  },
  {
    value: 'accepted',
    label: 'accepted',
  },
];
