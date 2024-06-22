'use client';
import React from 'react';
import { EventsProvider } from './providers/events-provider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <EventsProvider>{children}</EventsProvider>;
};

export default Layout;
