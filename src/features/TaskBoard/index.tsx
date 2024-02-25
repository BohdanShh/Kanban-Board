import { FC } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

const TaskBoard: FC = () => {
  return (
    <div className="flex-1 overflow-hidden bg-[#f4f7fd] dark:bg-[#18181b]">
      <ScrollContainer
        className="scroll-container h-full"
        vertical
        horizontal
      >
        123123
      </ScrollContainer>
    </div>
  );
};

export default TaskBoard;
