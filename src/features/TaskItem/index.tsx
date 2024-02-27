import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from 'src/types';

type TaskItemProps = {
  task: Task;
  index: number;
};

const TaskItem: FC<TaskItemProps> = ({ task, index }) => {
  const subtasksCount = task.subtasks.length;
  const completedSubtasksCount = task.subtasks.filter(subtask => subtask.completed).length;

  return (
    <Draggable
      draggableId={task.id}
      index={index}
    >
      {provided => (
        <div
          className="py-6 px-4 my-3 flex flex-col text-left gap-2 shadow-md rounded-md bg-white dark:bg-[#2c2c30]"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h3 className="font-bold">{task.title}</h3>
          {!!subtasksCount && (
            <div className="font-semibold text-sm">
              {completedSubtasksCount} of {subtasksCount} subtasks
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
