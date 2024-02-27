import { Cross1Icon } from '@radix-ui/react-icons';
import { ChangeEvent, FC, useState } from 'react';
import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { ModalProps } from 'src/features/Modals/types';
import { useBoard } from 'src/store/useBoard';
import { Board } from 'src/types';
import { Status } from 'src/types/enums';
import { v4 as uuidv4 } from 'uuid';

const CreateNewBoardModal: FC<ModalProps> = ({ modalTriggerElement }) => {
  const [name, setName] = useState<string>('');

  const createNewBoard = useBoard(state => state.createNewBoard);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handleCreateBoard = (): void => {
    const newBoard: Board = {
      name,
      columns: [Status.TODO, Status.DOING, Status.DONE],
      tasks: [],
      id: uuidv4(),
    };

    createNewBoard(newBoard);
    setName('');
  };

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
            <Input
              id="name"
              value={name}
              onChange={handleNameChange}
            />
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
            <Button
              className="mt-4"
              variant="outline"
            >
              + Add new column
            </Button>
          </div>
          <DialogClose>
            <Button
              className="w-full"
              onClick={handleCreateBoard}
            >
              Create new board
            </Button>
          </DialogClose>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewBoardModal;
