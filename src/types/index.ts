export type Subtask = {
  title: string;
  completed: boolean;
  id: string;
};

export type Task = {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
  id: string;
};

export type Column = {
  name: string;
  tasks: Task[];
  id: string;
};

export type Board = {
  name: string;
  columns: Column[];
  id: string;
};
