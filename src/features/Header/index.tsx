import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import kanban from 'src/assets/kanban.png';
import { Button } from 'src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { AddNewTaskModal } from 'src/features/Modals';

const Header: FC = () => {
  return (
    <div className="flex border-solid border-y-[1px]">
      <div className="basis-[300px] flex items-center gap-2 p-[30px] border-t-white border-solid border-r-[1px]">
        <div className="p-1 bg-white rounded-md">
          <img
            src={kanban}
            alt="Logo"
          />
        </div>
        <h1 className="text-[#171717] dark:text-[#fafafa] text-4xl font-bold">kanban</h1>
      </div>
      <div className="flex-1 p-[30px] flex items-center justify-between gap-2">
        <h2 className="text-[#171717] dark:text-[#fafafa] text-2xl font-bold">Marketing Plan</h2>
        <div className="flex items-center gap-2">
          <AddNewTaskModal modalTriggerElement={<Button>+ Add new task</Button>} />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsVerticalIcon className="w-[25px] h-[25px] cursor-pointer transition-colors" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit board</DropdownMenuItem>
              <DropdownMenuItem className="text-[red]">Delete board</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
