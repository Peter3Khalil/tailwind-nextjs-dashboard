'use client';
import UsersApi from '@/app/(pages)/(dashboard)/users/services/UsersApi';
import type { User } from '@/app/(pages)/(dashboard)/users/types/users.types';
import useCustomQuery from '@/hooks/useCustomQuery';
import { createContext, useContext } from 'react';
const initialUser: User = {
  email: '',
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
const AuthContext = createContext<ContextType>({
  user: initialUser,
  isLoading: true,
  isError: false,
  isSuccess: false,
  error: undefined,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isError, isSuccess, isLoading, error } = useCustomQuery(
    'getUser',
    UsersApi.getMe,
  );

  return (
    <AuthContext.Provider
      value={{
        user: data?.data.data || initialUser,
        isError,
        isLoading,
        isSuccess,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
