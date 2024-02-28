import { Cross1Icon } from '@radix-ui/react-icons';
import { FC } from 'react';
import { Button } from 'src/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { useEditBoardModal } from 'src/features/Modals/EditBoardModal/useEditBoardModal';

type EditBoardModalProps = {
  columnEditMode?: boolean;
};

const EditBoardModal: FC<EditBoardModalProps> = ({ columnEditMode }) => {
  const {
    name,
    columns,
    handleNameChange,
    handleAddColumn,
    handleColumnNameChange,
    handleDeleteColumn,
    handleEditBoard,
  } = useEditBoardModal();

  return (
    <>
      <DialogHeader>
        <DialogTitle>{columnEditMode ? 'Add new column' : 'Edit board'}</DialogTitle>
      </DialogHeader>
      <DialogDescription className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
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
            disabled={columnEditMode}
            maxLength={20}
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-base"
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
            disabled={!name.trim().length}
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
