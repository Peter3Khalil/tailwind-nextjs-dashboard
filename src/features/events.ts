import { request } from '@/lib/request';
import type {
  CreateEvent,
  DeleteErrorResponse,
  Event,
  EventAction,
  EventResponse,
} from '@/types/EventTypes';

export const getAllEvents = async (): Promise<EventResponse> => {
  const response = await request<EventResponse>({ url: '/events' });
  return response;
};
export const getEvent = async (id: string): Promise<Event> => {
  const response = await request<Event>({ url: `/events/${id}` });
  return response;
};
export const createEvent = async (event: CreateEvent): Promise<Event> => {
  const response = await request<CreateEvent, Event>({
    url: '/events',
    method: 'POST',
    data: event,
  });
  return response;
};

export const updateEvent = async ({
  id,
  updatedEvent,
}: {
  id: string;
  updatedEvent: Partial<CreateEvent>;
}): Promise<Event> => {
  const response = await request<Partial<CreateEvent>, Event>({
    url: `/events/${id}`,
    method: 'PUT',
    data: updatedEvent,
  });
  return response;
};

export const deleteEvent = async ({
  id,
}: {
  id: string;
}): Promise<DeleteErrorResponse> => {
  const response = await request<undefined, DeleteErrorResponse>({
    url: `/events/${id}`,
    method: 'DELETE',
  });
  if (response.errors) {
    throw new Error(response.errors[0].msg);
  } else {
    return response;
  }
};

export const acceptEvent = async ({
  id,
}: {
  id: string;
}): Promise<EventAction> => {
  const response = await request<undefined, EventAction>({
    url: `/events/${id}/accept`,
    method: 'PUT',
  });
  return response;
};

export const rejectEvent = async ({
  id,
}: {
  id: string;
}): Promise<EventAction> => {
  const response = await request<undefined, EventAction>({
    url: `/events/${id}/reject`,
    method: 'PUT',
  });
  return response;
};
