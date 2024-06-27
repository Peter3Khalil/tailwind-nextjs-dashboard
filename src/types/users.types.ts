import { PaginationResult } from '@/types/global.types';

export type LoginResponse = {
  data: User;
  token: string;
};

export type GetAllUsersResponse = {
  results: number;
  totlaCount: number;
  paginationResult: PaginationResult;
  data: User[];
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  location: string;
  gender: string;
  phone: string;
  interests: Interest[];
  slug?: string;
  isOAuthUser: boolean;
  emailVerifyCode?: string;
  emailVerifyExpires?: string;
  emailVerified?: boolean;
  role: string;
  active?: boolean;
  wishlist: unknown[];
  calendar: unknown[];
  profileImg?: string;
  token?: string;
};

type Interest = {
  _id: string;
  title: string;
};
