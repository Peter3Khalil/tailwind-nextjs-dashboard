import { Button } from '@/components/ui/button';
import React, { FC } from 'react';
import { CheckIcon } from '@/components/shared/Icons';

const AcceptButton: FC<React.ComponentProps<typeof Button>> = ({
  ...props
}) => {
  return (
    <Button variant={'secondary'} className="h-auto p-1" {...props}>
      <CheckIcon size={16} />
    </Button>
  );
};

export default AcceptButton;
