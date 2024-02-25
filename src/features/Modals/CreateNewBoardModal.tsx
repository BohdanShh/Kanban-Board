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
import { ModalProps } from 'src/features/Modals/types';

const CreateNewBoardModal: FC<ModalProps> = ({ modalTriggerElement }) => {
  return (
    <Dialog>
      <DialogTrigger>{modalTriggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new board</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label
              className="text-base"
              htmlFor="name"
            >
              Name
            </label>
            <Input id="name" />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base"
              htmlFor="subtask"
            >
              Columns
            </label>
            <div className="flex items-center gap-2">
              <Input
                className="flex-1"
                id="subtask"
              />
              <Cross1Icon className="w-[25px] h-[25px] cursor-pointer" />
            </div>
            <Button className="mt-4">+ Add new column</Button>
          </div>
          <Button>Create new board</Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewBoardModal;
