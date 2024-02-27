import { Cross1Icon } from '@radix-ui/react-icons';
import { ChangeEvent, FC, useState } from 'react';
import { Button } from 'src/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { useBoard } from 'src/store/useBoard';

const EditBoardModal: FC = () => {
  const { boards, activeBoardId, editActiveBoard } = useBoard(state => ({
    boards: state.boards,
    activeBoardId: state.activeBoardId,
    editActiveBoard: state.editActiveBoard,
  }));
  const activeBoard = getActiveBoard(boards, activeBoardId);

  const [name, setName] = useState<string>(activeBoard?.name || '');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handleEditBoard = (): void => {
    editActiveBoard(name);
    setName('');
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit board</DialogTitle>
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
            onClick={handleEditBoard}
          >
            Save changes
          </Button>
        </DialogClose>
      </DialogDescription>
    </>
  );
};

export default EditBoardModal;
