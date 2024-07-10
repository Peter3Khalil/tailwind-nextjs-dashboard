'use client';
import { CategoriesProvider } from '@/providers/categories/categories-provider';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <CategoriesProvider>{children}</CategoriesProvider>;
};

export default Layout;
