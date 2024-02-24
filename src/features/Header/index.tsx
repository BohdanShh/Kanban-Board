import { Cross1Icon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import kanban from 'src/assets/kanban.png';
import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';

const Header: FC = () => {
  return (
    <div className="flex bg-black border-t-white border-solid border-y-[1px]">
      <div className="basis-[300px] flex items-center gap-2 p-[30px] border-t-white border-solid border-r-[1px]">
        <div className="p-1 bg-white rounded-sm">
          <img
            src={kanban}
            alt="Logo"
          />
        </div>
        <h1 className="text-white text-4xl font-bold">kanban</h1>
      </div>
      <div className="flex-1 p-[30px] flex items-center justify-end gap-2">
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary">+ Add new task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new task</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label
                  className="text-base"
                  htmlFor="title"
                >
                  Title
                </label>
                <Input id="title" />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-base"
                  htmlFor="description"
                >
                  Description
                </label>
                <Textarea id="description" />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-base"
                  htmlFor="subtask"
                >
                  Subtasks
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    className="flex-1"
                    id="subtask"
                  />
                  <Cross1Icon className="w-[25px] h-[25px] cursor-pointer" />
                </div>
                <Button className="mt-4">+ Add new subtask</Button>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-base"
                  htmlFor="status"
                >
                  Status
                </label>
                <Textarea id="status" />
              </div>
              <Button>Create task</Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsVerticalIcon
              className="w-[25px] h-[25px] cursor-pointer"
              color="white"
            />
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
  );
};

export default Header;
