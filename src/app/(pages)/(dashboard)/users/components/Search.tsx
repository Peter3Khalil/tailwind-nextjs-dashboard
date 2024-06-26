import { useUsers } from '@/app/(pages)/(dashboard)/users/providers/users-provider';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { FC, useCallback } from 'react';
interface SearchProps extends React.ComponentProps<typeof Input> {}
const Search: FC<SearchProps> = ({ className, ...props }) => {
  const { setParams } = useUsers();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setParams((prev) => ({
        ...prev,
        keyword: e.target.value,
        limit: prev.limit,
        page: 1,
      }));
    },
    [setParams],
  );
  return (
    <Input
      className={cn('w-full md:w-[300px]', className)}
      placeholder="Search"
      onChange={handleSearch}
      {...props}
    />
  );
};

export default Search;
