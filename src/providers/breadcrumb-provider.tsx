'use client';
import { BreadcrumbItemType } from '@/components/shared/CustomBreadcrumb';
import React, { Dispatch, SetStateAction } from 'react';

const INITIAL_BREADCRUMB_ITEMS: BreadcrumbItemType[] = [
  {
    name: 'Dashboard',
    link: '/dashboard',
  },
];

type ContextType = {
  breadcrumbPage: string;
  breadcrumbItems: BreadcrumbItemType[];
  setBreadcrumbPage: Dispatch<SetStateAction<string>>;
  setBreadcrumbItems: Dispatch<SetStateAction<BreadcrumbItemType[]>>;
};

const BreadcrumbContext = React.createContext<ContextType>({
  breadcrumbPage: '',
  breadcrumbItems: INITIAL_BREADCRUMB_ITEMS,
  setBreadcrumbPage: () => {},
  setBreadcrumbItems: () => {},
});

const BreadcrumbProvider = ({ children }: { children: React.ReactNode }) => {
  const [breadcrumbPage, setBreadcrumbPage] = React.useState('');
  const [breadcrumbItems, setBreadcrumbItems] = React.useState(
    INITIAL_BREADCRUMB_ITEMS,
  );

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbPage,
        breadcrumbItems,
        setBreadcrumbPage,
        setBreadcrumbItems,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

const useBreadcrumb = () => {
  const context = React.useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};

export { BreadcrumbProvider, useBreadcrumb };
