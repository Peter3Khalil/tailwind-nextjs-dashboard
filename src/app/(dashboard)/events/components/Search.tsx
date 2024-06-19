import { Input } from '@/components/ui/input';
import React, { FC, useCallback } from 'react';
import { useEvents } from '../providers/events-provider';
import { cn } from '@/lib/utils';
interface SearchProps extends React.ComponentProps<typeof Input> {}
const Search: FC<SearchProps> = ({ className, ...props }) => {
  const { setParams } = useEvents();

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
