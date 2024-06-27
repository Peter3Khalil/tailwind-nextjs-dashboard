'use client';
import { EventsProvider } from '@/providers/events/events-provider';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <EventsProvider>{children}</EventsProvider>;
};

export default Layout;
