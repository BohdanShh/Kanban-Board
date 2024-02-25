import { FC } from 'react';
import { Task } from 'src/types';

type TaskItemProps = {
  task: Task;
};

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const subtasksCount = task.subtasks.length;
  const completedSubtasksCount = task.subtasks.filter(subtask => subtask.completed).length;

  return (
    <div className="py-6 px-4 flex flex-col gap-2 shadow-md rounded-md bg-white dark:bg-[#2c2c30]">
      <h3 className="font-bold">{task.title}</h3>
      {!!subtasksCount && (
        <div className="font-semibold text-sm">
          {completedSubtasksCount} of {subtasksCount} subtasks
        </div>
      )}
    </div>
  );
};

export default TaskItem;
