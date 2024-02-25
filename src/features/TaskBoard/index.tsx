import { FC } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Button } from 'src/components/ui/button';
import TaskItem from 'src/features/TaskItem';

const TaskBoard: FC = () => {
  return (
    <div className="flex-1 overflow-hidden bg-[#f4f7fd] dark:bg-[#18181b]">
      <ScrollContainer
        className="scroll-container h-full cursor-move"
        vertical
        horizontal
      >
        <div className="p-[30px] flex gap-[30px] h-full">
          <div className="w-[280px] flex-shrink-0 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-[15px] h-[15px] rounded-full bg-[#124432]" />
              <div className="font-bold">Todo (1)</div>
            </div>
            <TaskItem />
          </div>
          <Button
            className="w-[280px] flex-shrink-0 flex flex-col items-center justify-center h-full bg-gradient-to-b from-[#dce1e8] dark:from-[#2c2c30] to-transparent font-medium text-3xl hover:no-underline"
            variant="link"
          >
            + New column
          </Button>
        </div>
      </ScrollContainer>
    </div>
  );
};

export default TaskBoard;
