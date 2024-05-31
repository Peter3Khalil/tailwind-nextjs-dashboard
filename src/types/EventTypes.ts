export interface EventResponse {
  results: number;
  paginationResult: PaginationResult;
  data: Event[];
}

export interface PaginationResult {
  currentPage: number;
  limit: number;
  numberOfPages: number;
}

export interface Event {
  _id: string;
  organizer: Organizer;
  organizationName: string;
  organizationWebsite: string;
  organizerPlan: string;
  eventName: string;
  eventAddress: string;
  eventCategory: EventCategory;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventImages: string[];
  ticketEventLink: string;
  eventPrice: number;
  eventDescription: string;
  eventStatus: EventStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Organizer {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface EventCategory {
  _id: string;
  title: string;
}

export interface CreateEvent {
  organizationName: string;
  organizationWebsite: string;
  organizerPlan: string;
  eventName: string;
  eventAddress: string;
  eventCategory: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventImages: string[];
  ticketEventLink: string;
  eventPrice: number;
  eventDescription: string;
}

export interface DeleteErrorResponse {
  errors: {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
  }[];
}

export interface EventAction {
  status: EventStatus;
  event: Event;
  message: string;
}

export type EventStatus = 'pending' | 'accepted' | 'rejected';
