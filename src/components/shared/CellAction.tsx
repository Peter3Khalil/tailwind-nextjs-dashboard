import Link from 'next/link';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { EditIcon, MoreHorizontalIcon, TrashIcon } from './Icons';
import { FC } from 'react';
interface CellActionProps {
  updateHref: string;
  deleteFn: () => void;
}
const CellAction: FC<CellActionProps> = ({ deleteFn, updateHref }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <Link href={updateHref}>
          <DropdownMenuItem>
            <EditIcon className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={deleteFn}
          className="cursor-pointer text-destructive hover:text-destructive focus:text-destructive"
        >
          <TrashIcon className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
