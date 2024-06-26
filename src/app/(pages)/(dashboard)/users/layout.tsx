import { UsersProvider } from '@/app/(pages)/(dashboard)/users/providers/users-provider';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <UsersProvider>{children}</UsersProvider>;
};

export default Layout;
