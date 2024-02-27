import { FC } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Button } from 'src/components/ui/button';
import ColumnItem from 'src/features/ColumnItem';
import { CreateNewBoardModal } from 'src/features/Modals';
import styles from 'src/features/TaskBoard/styles.module.css';
import { useTaskBoard } from 'src/features/TaskBoard/useTaskBoard';
import { cn } from 'src/lib/cn';

const TaskBoard: FC = () => {
  const { boards, activeBoard, handleDragEnd } = useTaskBoard();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ScrollContainer
        className={cn('cursor-move flex-1 bg-[#f4f7fd] dark:bg-[#18181b]', styles.scrollContainer)}
        hideScrollbars={false}
        nativeMobileScroll={true}
        ignoreElements=".task-card"
      >
        {boards.length ? (
          <div className="p-[30px] flex gap-[30px] h-full">
            {activeBoard?.columns.map(({ name, id, tasks }, index) => (
              <ColumnItem
                name={name}
                tasks={tasks}
                id={id}
                index={index}
                key={id}
              />
            ))}
            {activeBoard && activeBoard.columns.length <= 5 && (
              <Button
                className="w-[280px] flex-shrink-0 flex flex-col items-center justify-center h-full bg-gradient-to-b from-[#dce1e8] dark:from-[#2c2c30] to-transparent font-medium text-3xl hover:no-underline"
                variant="link"
              >
                + New column
              </Button>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-3 overflow-hidden">
            <div className="font-semibold text-2xl">
              Looks like you have run out of boards for tasks! How about creating a new one?
            </div>
            <CreateNewBoardModal modalTriggerElement={<Button>+ Create new board</Button>} />
          </div>
        )}
      </ScrollContainer>
    </DragDropContext>
  );
};

export default TaskBoard;
