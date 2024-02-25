import { Cross1Icon } from '@radix-ui/react-icons';
import { FC } from 'react';
import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Textarea } from 'src/components/ui/textarea';
import { ModalProps } from 'src/features/Modals/types';

const AddNewTaskModal: FC<ModalProps> = ({ modalTriggerElement }) => {
  return (
    <Dialog>
      <DialogTrigger>{modalTriggerElement}</DialogTrigger>
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="doing">Doing</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button>Create task</Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTaskModal;
