import { CheckedState } from '@radix-ui/react-checkbox';
import { ChangeEvent, useEffect, useState } from 'react';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { useBoard } from 'src/store/useBoard';
import { Subtask, Task } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

export const useEditTaskModal = (task: Task) => {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [status, setStatus] = useState<string>(task.status);
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks);

  const { boards, activeBoardId, deleteTask, updateTask } = useBoard(state => ({
    boards: state.boards,
    activeBoardId: state.activeBoardId,
    deleteTask: state.deleteTask,
    updateTask: state.updateTask,
  }));

  const activeBoard = getActiveBoard(boards, activeBoardId);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (value: string): void => setStatus(value);

  const handleAddSubtask = (): void => {
    setSubtasks(prev => [...prev, { title: '', completed: false, id: uuidv4() }]);
  };

  const handleSubtaskTitleChange = (
    event: ChangeEvent<HTMLInputElement>,
    subtaskId: string
  ): void => {
    setSubtasks(prev => {
      return prev.map(subtask => {
        if (subtask.id !== subtaskId) return subtask;
        return { ...subtask, title: event.target.value };
      });
    });
  };

  const handleSubtaskCompletedChange = (checked: CheckedState, subtaskId: string): void => {
    setSubtasks(prev => {
      return prev.map(subtask => {
        if (subtask.id !== subtaskId) return subtask;
        return { ...subtask, completed: checked as boolean };
      });
    });
  };

  const handleRemoveSubtask = (subtaskId: string): (() => void) => {
    return () => setSubtasks(prev => prev.filter(({ id }) => subtaskId !== id));
  };

  const handleUpdateTask = (columnId: string): void => {
    const updatedTask: Task = {
      ...task,
      title,
      description,
      status,
      subtasks,
    };

    updateTask(columnId, task.id, updatedTask);
  };

  useEffect(() => {
    setStatus(task.status);
  }, [task.status]);

  return {
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
  };
};
