import { LoginResponse } from '@/app/(pages)/(dashboard)/users/types/users.types';
import client from '@/lib/client';

class UsersApi {
  private static instance: UsersApi;

  private constructor() {}

  public static getInstance(): UsersApi {
    if (!UsersApi.instance) {
      UsersApi.instance = new UsersApi();
    }
    return UsersApi.instance;
  }

  public getAll() {
    return client.get('/users');
  }

  public getOne(id: string) {
    return client.get(`/users/${id}`);
  }

  public getMe() {
    return client.get<Omit<LoginResponse, 'token'>>('/users/getMe');
  }

  public login({ email, password }: { email: string; password: string }) {
    return client.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
  }
}

export default UsersApi.getInstance();
