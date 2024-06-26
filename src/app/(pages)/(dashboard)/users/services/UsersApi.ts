import {
  GetAllUsersResponse,
  LoginResponse,
} from '@/app/(pages)/(dashboard)/users/types/users.types';
import client from '@/lib/client';
import { GetAllQueryParams } from '@/types/global.types';
import { AxiosRequestConfig } from 'axios';

class UsersApi {
  private static instance: UsersApi;

  private constructor() {}

  public static getInstance(): UsersApi {
    if (!UsersApi.instance) {
      UsersApi.instance = new UsersApi();
    }
    return UsersApi.instance;
  }

  public getAll(
    params?: Partial<GetAllQueryParams>,
    config?: AxiosRequestConfig,
  ) {
    return client.get<GetAllUsersResponse>('/users', {
      params,
      ...config,
    });
  }

  public getOne(id: string, config?: AxiosRequestConfig) {
    return client.get(`/users/${id}`, config);
  }

  public getMe(config?: AxiosRequestConfig) {
    return client.get<Omit<LoginResponse, 'token'>>('/users/getMe', config);
  }

  public login({
    email,
    password,
    config,
  }: {
    email: string;
    password: string;
    config?: AxiosRequestConfig;
  }) {
    return client.post<LoginResponse>(
      '/auth/login',
      {
        email,
        password,
      },
      config,
    );
  }
}

export default UsersApi.getInstance();
