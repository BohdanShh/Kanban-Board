import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { FC, useState } from 'react';
import kanban from 'src/assets/kanban.png';
import { Button } from 'src/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { AddNewTaskModal, ConfirmDeletionModal } from 'src/features/Modals';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { useBoard } from 'src/store/useBoard';
import { DialogVariant } from 'src/types/enums';

const Header: FC = () => {
  const [dialog, setDialog] = useState<DialogVariant>();

  const { boards, activeBoardId, deleteBoard } = useBoard(state => ({
    boards: state.boards,
    activeBoardId: state.activeBoardId,
    deleteBoard: state.deleteBoard,
  }));

  const activeBoard = getActiveBoard(boards, activeBoardId);

  const handleDeleteBoard = (): void => deleteBoard(activeBoardId);

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
        <h2 className="text-[#171717] dark:text-[#fafafa] text-2xl font-bold">
          {activeBoard?.name || 'No board found'}
        </h2>
        {!!boards.length && (
          <div className="flex items-center gap-2">
            <AddNewTaskModal modalTriggerElement={<Button>+ Add new task</Button>} />
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsVerticalIcon className="w-[25px] h-[25px] cursor-pointer transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="flex flex-col gap-2">
                    <DialogTrigger>
                      <DropdownMenuItem onClick={() => setDialog(DialogVariant.EDIT)}>
                        Edit board
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogTrigger>
                      <DropdownMenuItem
                        className="text-[red] w-full"
                        onClick={() => setDialog(DialogVariant.DELETE)}
                      >
                        Delete board
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                {dialog === DialogVariant.DELETE ? (
                  <ConfirmDeletionModal
                    title="Delete this board?"
                    description={`Are you sure you want to delete the '${activeBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`}
                    onDelete={handleDeleteBoard}
                  />
                ) : (
                  ''
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
