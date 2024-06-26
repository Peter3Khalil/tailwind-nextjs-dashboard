import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { GetAllQueryParams } from '@/types/global.types';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
interface SearchProps<T extends GetAllQueryParams>
  extends React.ComponentProps<typeof Input> {
  setParams: Dispatch<SetStateAction<T>>;
}
const Search = <T extends GetAllQueryParams>({
  className,
  setParams,
  ...props
}: SearchProps<T>) => {
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
      className={cn(
        'w-full focus:border-primary focus-visible:ring-0 focus-visible:ring-transparent md:w-[300px]',
        className,
      )}
      placeholder="Search"
      onChange={handleSearch}
      {...props}
    />
  );
};

export default Search;
