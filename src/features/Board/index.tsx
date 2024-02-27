import { FC } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Button } from 'src/components/ui/button';
import styles from 'src/features/Board/styles.module.css';
import ColumnItem from 'src/features/ColumnItem';
import { CreateNewBoardModal } from 'src/features/Modals';
import { cn } from 'src/lib/cn';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { useBoard } from 'src/store/useBoard';
import { Column } from 'src/types';

const Board: FC = () => {
  const { boards, activeBoardId, reorderTasks } = useBoard(state => ({
    boards: state.boards,
    activeBoardId: state.activeBoardId,
    reorderTasks: state.reorderTasks,
  }));

  const activeBoard = getActiveBoard(boards, activeBoardId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = activeBoard?.columns.find(({ id }) => id === source.droppableId);

    if (!column) return;

    const newTasks = column.tasks.slice();
    const draggableTask = newTasks.find(({ id }) => id === draggableId);

    if (!draggableTask) return;

    newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, draggableTask);

    const newColumn: Column = {
      ...column,
      tasks: newTasks,
    };

    reorderTasks(column.id, newColumn);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ScrollContainer
        className={cn(
          'scroll-container h-full cursor-move flex-1 overflow-hidden bg-[#f4f7fd] dark:bg-[#18181b]',
          styles.scrollContainer
        )}
        vertical
        horizontal
        hideScrollbars={false}
      >
        {boards.length ? (
          <div className="p-[30px] flex gap-[30px] h-full">
            {activeBoard?.columns.map(({ name, id, tasks }) => (
              <ColumnItem
                name={name}
                tasks={tasks}
                id={id}
                key={id}
              />
            ))}
            <Button
              className="w-[280px] flex-shrink-0 flex flex-col items-center justify-center h-full bg-gradient-to-b from-[#dce1e8] dark:from-[#2c2c30] to-transparent font-medium text-3xl hover:no-underline"
              variant="link"
            >
              + New column
            </Button>
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

export default Board;
