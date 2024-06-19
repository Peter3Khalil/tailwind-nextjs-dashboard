import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectLimitProps extends React.ComponentProps<typeof Select> {}
const SelectLimit: FC<SelectLimitProps> = ({ ...props }) => {
  return (
    <Select {...props}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="70">70</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectLimit;
