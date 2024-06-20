import { CancelIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

const RejectButton: FC<React.ComponentProps<typeof Button>> = ({
  ...props
}) => {
  return (
    <Button variant={'secondary'} className="h-auto p-1" {...props}>
      <CancelIcon size={16} />
    </Button>
  );
};

export default RejectButton;
