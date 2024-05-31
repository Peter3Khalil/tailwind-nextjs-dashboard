import { request } from '@/lib/request';

export interface LoginResponse {
  data: User;
  token: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  location: string;
  gender: string;
  phone: string;
  interestes: string[];
  slug: string;
  isOAuthUser: boolean;
  emailVerifyCode: string;
  emailVerifyExpires: string;
  emailVerified: boolean;
  role: string;
  active: boolean;
  __v: number;
}

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await request<
    { email: string; password: string },
    LoginResponse
  >({
    url: '/auth/login',
    method: 'POST',
    data: { email, password },
  });
  return response;
};

export const getMe = async (): Promise<Omit<LoginResponse, 'token'>> => {
  const response = await request<Omit<LoginResponse, 'token'>>({
    url: '/users/getMe',
  });
  return response;
};
