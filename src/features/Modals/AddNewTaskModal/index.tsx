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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Textarea } from 'src/components/ui/textarea';
import { useAddNewTaskModal } from 'src/features/Modals/AddNewTaskModal/useAddNewTaskModal';
import { ModalProps } from 'src/features/Modals/types';
import { Status } from 'src/types/enums';

const AddNewTaskModal: FC<ModalProps> = ({ modalTriggerElement }) => {
  const {
    title,
    description,
    subtasks,
    status,
    handleTitleChange,
    handleDescriptionChange,
    handleAddSubtask,
    handleRemoveSubtask,
    handleSubtasksChange,
    handleStatusChange,
    createTask,
  } = useAddNewTaskModal();

  return (
    <Dialog modal>
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
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base"
              htmlFor="description"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base"
              htmlFor="subtask"
            >
              Subtasks
            </label>
            <div className="flex flex-col gap-2">
              {subtasks.map(subtask => (
                <div
                  className="flex items-center gap-2"
                  key={subtask.id}
                >
                  <Input
                    className="flex-1"
                    id="subtask"
                    onChange={event => handleSubtasksChange(event, subtask.id)}
                  />
                  <Button
                    className="p-0 hover:no-underline"
                    variant="link"
                    onClick={handleRemoveSubtask(subtask.id)}
                  >
                    <Cross1Icon className="w-[25px] h-[25px] cursor-pointer" />
                  </Button>
                </div>
              ))}
            </div>
            {subtasks.length <= 5 && (
              <Button
                className="mt-4"
                onClick={handleAddSubtask}
              >
                + Add new subtask
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base"
              htmlFor="status"
            >
              Status
            </label>
            <Select
              value={status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={Status.TODO}>Todo</SelectItem>
                  <SelectItem value={Status.DOING}>Doing</SelectItem>
                  <SelectItem value={Status.DONE}>Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogClose>
            <Button onClick={createTask}>Create task</Button>
          </DialogClose>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTaskModal;
