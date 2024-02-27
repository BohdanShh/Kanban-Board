import { Cross1Icon } from '@radix-ui/react-icons';
import { FC } from 'react';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
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
import { ConfirmDeletionModal } from 'src/features/Modals';
import { useEditTaskModal } from 'src/features/Modals/EditTaskModal/useEditTaskModal';
import { ModalProps } from 'src/features/Modals/types';
import { cn } from 'src/lib/cn';
import { Task } from 'src/types';
import { Status } from 'src/types/enums';

type EditTaskModalProps = { task: Task } & ModalProps;

const EditTaskModal: FC<EditTaskModalProps> = ({ modalTriggerElement, task }) => {
  const {
    title,
    description,
    status,
    subtasks,
    handleTitleChange,
    handleDescriptionChange,
    handleStatusChange,
    handleAddSubtask,
    handleRemoveSubtask,
    handleSubtaskTitleChange,
    handleSubtaskCompletedChange,
    deleteTask,
    handleUpdateTask,
  } = useEditTaskModal(task);

  return (
    <Dialog>
      <DialogTrigger>{modalTriggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold"
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
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold"
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
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold"
              htmlFor="description"
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
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold"
              htmlFor="subtask"
            >
              Subtasks
            </label>
            {subtasks.map(({ title, completed, id }) => (
              <div
                className="flex items-center gap-2"
                key={id}
              >
                <Checkbox
                  checked={completed}
                  onCheckedChange={checked => handleSubtaskCompletedChange(checked, id)}
                />
                <Input
                  className={cn(completed && 'line-through')}
                  id="subtask"
                  value={title}
                  onChange={event => handleSubtaskTitleChange(event, id)}
                />
                <Button
                  className="p-0 hover:no-underline"
                  variant="link"
                  onClick={handleRemoveSubtask(id)}
                >
                  <Cross1Icon className="w-[25px] h-[25px] cursor-pointer" />
                </Button>
              </div>
            ))}
            {subtasks.length <= 5 && (
              <Button
                className="mt-2"
                variant="outline"
                onClick={handleAddSubtask}
              >
                + Add new subtask
              </Button>
            )}
          </div>
          <Dialog>
            <DialogTrigger>
              <Button
                className="w-full"
                variant="destructive"
              >
                Delete task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ConfirmDeletionModal
                title="Delete this task?"
                description={`Are you sure you want to delete the '${task.title}' task? This action will remove all info and cannot be reversed.`}
                onDelete={() => deleteTask(task.id)}
              />
            </DialogContent>
          </Dialog>
          <Button onClick={handleUpdateTask}>Save changes</Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
