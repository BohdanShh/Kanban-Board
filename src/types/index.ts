import { Status } from 'src/types/enums';

export type Subtask = {
  title: string;
  completed: boolean;
  id: string;
};

export type Task = {
  title: string;
  description: string;
  status: Status;
  subtasks: Subtask[];
  id: string;
};

export type Board = {
  name: string;
  columns: string[];
  tasks: Task[];
  id: string;
};
