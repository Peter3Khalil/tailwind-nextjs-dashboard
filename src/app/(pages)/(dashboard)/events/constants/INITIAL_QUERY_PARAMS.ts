import type { EventsQueryParams } from '@/app/(pages)/(dashboard)/events/types/event.types';

export const INITIAL_QUERY_PARAMS: EventsQueryParams = {
  limit: 5,
  keyword: '',
  page: 1,
  eventStatus: 'all',
};
