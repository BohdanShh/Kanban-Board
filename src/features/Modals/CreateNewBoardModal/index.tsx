import { Cross1Icon } from '@radix-ui/react-icons';
import { FC } from 'react';
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
import { useCreateNewBoardModal } from 'src/features/Modals/CreateNewBoardModal/useCreateNewBoardModal';
import { ModalProps } from 'src/features/Modals/types';

const CreateNewBoardModal: FC<ModalProps> = ({ modalTriggerElement }) => {
  const {
    name,
    columns,
    handleBoardNameChange,
    handleAddColumn,
    handleColumnNameChange,
    handleDeleteColumn,
    handleCreateBoard,
  } = useCreateNewBoardModal();

  return (
    <Dialog>
      <DialogTrigger>{modalTriggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new board</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label
                className="font-semibold"
                htmlFor="name"
              >
                Name
              </label>
              <div>{name.length} / 20</div>
            </div>
            <Input
              id="name"
              maxLength={20}
              value={name}
              onChange={handleBoardNameChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="font-semibold"
              htmlFor="subtask"
            >
              Columns
            </label>
            {columns.map(({ name, id }) => (
              <div
                className="flex items-center gap-2"
                key={id}
              >
                <Input
                  className="flex-1"
                  id="subtask"
                  maxLength={20}
                  value={name}
                  onChange={event => handleColumnNameChange(event, id)}
                />
                <Button
                  className="p-0 hover:no-underline"
                  variant="link"
                  onClick={handleDeleteColumn(id)}
                >
                  <Cross1Icon className="w-[25px] h-[25px] cursor-pointer" />
                </Button>
              </div>
            ))}
            {columns.length <= 5 && (
              <Button
                className="mt-4"
                variant="outline"
                onClick={handleAddColumn}
              >
                + Add new column
              </Button>
            )}
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
