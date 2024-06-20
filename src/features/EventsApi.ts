import client from '@/features/client';
import type {
  Event,
  EventAction,
  GetAllEventsResponse,
  GetAllParamsType,
} from '@/types/event.types';

class EventsApi {
  private static instance: EventsApi;

  private constructor() {}

  public static getInstance(): EventsApi {
    if (!EventsApi.instance) {
      EventsApi.instance = new EventsApi();
    }
    return EventsApi.instance;
  }

  public async getAll(params?: Partial<GetAllParamsType>) {
    return await client.get<GetAllEventsResponse>('/events', {
      params: {
        ...params,
        eventStatus:
          params?.eventStatus === 'all' ? undefined : params?.eventStatus,
      } as Partial<GetAllParamsType>,
    });
  }

  public async getOne(id: string) {
    return await client.get<Event>(`/events/${id}`);
  }

  public async create(event: Event) {
    return await client.post<Event>('/events', event);
  }

  public async update(id: string, event: Partial<Event>) {
    return await client.put<Event>(`/events/${id}`, event);
  }

  public async delete(id: string) {
    return await client.delete(`/events/${id}`);
  }

  public async accept(id: string) {
    return await client.put<EventAction>(`/events/${id}/accept`);
  }

  public async reject(id: string) {
    return await client.put<EventAction>(`/events/${id}/reject`);
  }
}

export default EventsApi.getInstance();
