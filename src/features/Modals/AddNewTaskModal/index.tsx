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

const AddNewTaskModal: FC<ModalProps> = ({ modalTriggerElement }) => {
  const {
    activeBoard,
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
    handleAddNewTask,
  } = useAddNewTaskModal();

  return (
    <Dialog>
      <DialogTrigger>{modalTriggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label
                className="font-semibold"
                htmlFor="title"
              >
                Title
              </label>
              <div>{title.length} / 80</div>
            </div>
            <Input
              id="title"
              maxLength={80}
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label
                className="font-semibold"
                htmlFor="description"
              >
                Description
              </label>
              <div>{description.length} / 200</div>
            </div>
            <Textarea
              id="description"
              maxLength={200}
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="font-semibold"
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
                    maxLength={50}
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
                variant="outline"
                onClick={handleAddSubtask}
              >
                + Add new subtask
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="font-semibold"
              htmlFor="status"
            >
              Status
            </label>
            <Select
              value={status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {activeBoard?.columns.map(({ name, id }) => (
                    <SelectItem
                      value={name}
                      key={id}
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogClose>
            <Button
              className="w-full"
              onClick={handleAddNewTask}
            >
              Create task
            </Button>
          </DialogClose>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTaskModal;
