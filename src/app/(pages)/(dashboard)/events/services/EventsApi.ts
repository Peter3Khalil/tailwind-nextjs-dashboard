import type {
  Event,
  EventAction,
  GetAllEventsResponse,
  GetAllParamsType,
} from '@/app/(pages)/(dashboard)/events/types/event.types';
import client from '@/lib/client';

class EventsApi {
  private static instance: EventsApi;

  private constructor() {}

  public static getInstance(): EventsApi {
    if (!EventsApi.instance) {
      EventsApi.instance = new EventsApi();
    }
    return EventsApi.instance;
  }

  public getAll(params?: Partial<GetAllParamsType>) {
    return client.get<GetAllEventsResponse>('/events', {
      params: {
        ...params,
        eventStatus:
          params?.eventStatus === 'all' ? undefined : params?.eventStatus,
      } as Partial<GetAllParamsType>,
    });
  }

  public getOne(id: string) {
    return client.get<Event>(`/events/${id}`);
  }

  public create(event: Event) {
    return client.post<Event>('/events', event);
  }

  public update(id: string, event: Partial<Event>) {
    return client.put<Event>(`/events/${id}`, event);
  }

  public delete(id: string) {
    return client.delete(`/events/${id}`);
  }

  public accept(id: string) {
    return client.put<EventAction>(`/events/${id}/accept`);
  }

  public reject(id: string) {
    return client.put<EventAction>(`/events/${id}/reject`);
  }
}

export default EventsApi.getInstance();
