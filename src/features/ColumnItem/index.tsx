import 'src/styles/color-circles.css';

import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { EditTaskModal } from 'src/features/Modals';
import TaskItem from 'src/features/TaskItem';
import { cn } from 'src/lib/cn';
import { Task } from 'src/types';

type ColumnItemProps = {
  name: string;
  tasks: Task[];
  index: number;
  id: string;
};

const ColumnItem: FC<ColumnItemProps> = ({ name, tasks, id, index }) => {
  return (
    <div className="w-[280px] flex-shrink-0 flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <div className={cn('w-[15px] h-[15px] rounded-full', `circle-${index}`)} />
        <div className="font-bold">
          {name} ({tasks.length})
        </div>
      </div>
      <Droppable droppableId={id}>
        {provided => (
          <div
            className={cn(
              'h-full flex flex-col',
              !tasks.length && 'border-dashed border-[2px] border-[#626262] rounded-md'
            )}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <EditTaskModal
                columnId={id}
                task={task}
                modalTriggerElement={
                  <TaskItem
                    task={task}
                    index={index}
                  />
                }
                key={task.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ColumnItem;
