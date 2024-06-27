import { Rubik } from 'next/font/google';
import { EventIcon, HomeIcon, UsersIcon } from '@/components/shared/Icons';
import { LucideIcon } from 'lucide-react';
import { GetAllQueryParams } from '@/types/global.types';

export const APP_FONT = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['italic', 'normal'],
  fallback: ['sans-serif'],
});

type NavigationItem = {
  readonly href: string;
  readonly icon: LucideIcon;
  readonly name: string;
};
type NavigationsKeys = 'dashboard' | 'events' | 'users';

export const NAVIGATION_ITEMS: Readonly<
  Record<NavigationsKeys, NavigationItem>
> = {
  dashboard: { href: '/dashboard', icon: HomeIcon, name: 'Dashboard' },
  events: { href: '/events', icon: EventIcon, name: 'Events' },
  users: { href: '/users', icon: UsersIcon, name: 'Users' },
};

export const DEFAULT_QUERY_PARAMS: GetAllQueryParams = {
  limit: 10,
  page: 1,
  keyword: '',
};
