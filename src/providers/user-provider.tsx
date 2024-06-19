'use client';
import UsersApi from '@/features/UsersApi';
import useCustomQuery from '@/hooks/useCustomQuery';
import type { User } from '@/types/users.types';
import { createContext, useContext } from 'react';
const initialUser: User = {
  email: '',
  __v: 0,
  _id: '',
  active: false,
  calendar: [],
  emailVerified: false,
  gender: '',
  interests: [],
  isOAuthUser: false,
  location: '',
  name: '',
  password: '',
  phone: '',
  profileImg: '',
  role: 'user',
  slug: '',
  wishlist: [],
};

type ContextType = {
  user: User;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
};
const UserContext = createContext<ContextType>({
  user: initialUser,
  isLoading: true,
  isError: false,
  isSuccess: false,
  error: undefined,
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isError, isSuccess, isLoading, error } = useCustomQuery(
    'getUser',
    UsersApi.getMe,
  );

  return (
    <UserContext.Provider
      value={{
        user: data?.data.data || initialUser,
        isError,
        isLoading,
        isSuccess,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { UserProvider, useUser };
