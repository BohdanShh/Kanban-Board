import { DialogClose } from '@radix-ui/react-dialog';
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

type EditTaskModalProps = { task: Task; columnId: string } & ModalProps;

const EditTaskModal: FC<EditTaskModalProps> = ({ modalTriggerElement, task, columnId }) => {
  const {
    activeBoard,
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
          <DialogTitle className="leading-7">{task.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2">
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
                  maxLength={50}
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
                onDelete={() => deleteTask(task)}
              />
            </DialogContent>
          </Dialog>
          <DialogClose>
            <Button
              className="w-full"
              onClick={() => handleUpdateTask(columnId)}
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
