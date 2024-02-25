import { FC } from 'react';

const TaskItem: FC = () => {
  return (
    <div className="py-6 px-4 shadow-md rounded-md bg-white dark:bg-[#2c2c30]">
      <h3 className="mb-2 font-bold">Plan product hunt launch</h3>
      <div className="font-semibold text-sm">0 of 6 subtasks</div>
    </div>
  );
};

export default TaskItem;
