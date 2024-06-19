import client from '@/features/client';
import { LoginResponse } from '@/types/users.types';

class UsersApi {
  private static instance: UsersApi;

  private constructor() {}

  public static getInstance(): UsersApi {
    if (!UsersApi.instance) {
      UsersApi.instance = new UsersApi();
    }
    return UsersApi.instance;
  }

  public async getAll() {
    return await client.get('/users');
  }

  public async getOne(id: string) {
    return await client.get(`/users/${id}`);
  }

  public async getMe() {
    return await client.get<Omit<LoginResponse, 'token'>>('/users/getMe');
  }

  public async login({ email, password }: { email: string; password: string }) {
    return await client.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
  }
}

export default UsersApi.getInstance();
