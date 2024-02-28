import { ChangeEvent, useState } from 'react';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { useBoard } from 'src/store/useBoard';
import { Subtask, Task } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

export const useAddNewTaskModal = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { title: '', completed: false, id: uuidv4() },
  ]);
  const [status, setStatus] = useState<string>('');

  const { activeBoardId, boards, addNewTask } = useBoard(state => ({
    boards: state.boards,
    activeBoardId: state.activeBoardId,
    addNewTask: state.addNewTask,
  }));

  const activeBoard = getActiveBoard(boards, activeBoardId);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value);
  };

  const handleAddSubtask = (): void => {
    setSubtasks(prev => [...prev, { title: '', completed: false, id: uuidv4() }]);
  };

  const handleRemoveSubtask = (subtaskId: string): (() => void) => {
    return () => setSubtasks(prev => prev.filter(({ id }) => subtaskId !== id));
  };

  const handleSubtasksChange = (event: ChangeEvent<HTMLInputElement>, subtaskId: string): void => {
    setSubtasks(prev => {
      return prev.map(subtask => {
        if (subtask.id !== subtaskId) return subtask;
        return { ...subtask, title: event.target.value };
      });
    });
  };

  const handleStatusChange = (value: string): void => setStatus(value);

  const handleAddNewTask = (): void => {
    const newTask: Task = {
      title: title,
      description: description || 'No description',
      subtasks,
      status,
      id: uuidv4(),
    };

    addNewTask(newTask);
    setTitle('');
    setDescription('');
    setSubtasks([{ title: '', completed: false, id: uuidv4() }]);
    setStatus('');
  };

  return {
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
  };
};
