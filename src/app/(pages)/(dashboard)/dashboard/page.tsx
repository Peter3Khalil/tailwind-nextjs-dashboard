'use client';

import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';

const Dashboard = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard' });
  return <div>Dashboard</div>;
};

export default Dashboard;
