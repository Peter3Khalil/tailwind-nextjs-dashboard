'use client';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import React from 'react';

const Users = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/users' });
  return <div>Users</div>;
};

export default Users;
