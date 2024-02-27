import { FC } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Button } from 'src/components/ui/button';
import styles from 'src/features/Board/styles.module.css';
import { CreateNewBoardModal } from 'src/features/Modals';
import { EditTaskModal } from 'src/features/Modals';
import TaskItem from 'src/features/TaskItem';
import { cn } from 'src/lib/cn';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { useBoard } from 'src/store/useBoard';
import { Status } from 'src/types/enums';

const Board: FC = () => {
  const { boards, activeBoardId } = useBoard(state => ({
    boards: state.boards,
    activeBoardId: state.activeBoardId,
  }));

  const activeBoard = getActiveBoard(boards, activeBoardId);

  const todoTasks = activeBoard?.tasks.filter(task => task.status === Status.TODO);
  const doingTasks = activeBoard?.tasks.filter(task => task.status === Status.DOING);
  const doneTasks = activeBoard?.tasks.filter(task => task.status === Status.DONE);

  return (
    <div className="flex-1 overflow-hidden bg-[#f4f7fd] dark:bg-[#18181b]">
      <ScrollContainer
        className={cn('scroll-container h-full cursor-move', styles.scrollContainer)}
        vertical
        horizontal
        hideScrollbars={false}
      >
        {boards.length ? (
          <div className="p-[30px] flex gap-[30px] h-full">
            <div className="w-[280px] flex-shrink-0 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <div className="w-[15px] h-[15px] rounded-full bg-[#49c4e5]" />
                <div className="font-bold">Todo ({todoTasks?.length})</div>
              </div>
              <div
                className={cn(
                  'h-full flex flex-col gap-5',
                  !todoTasks?.length && 'border-dashed border-[2px] border-[#626262] rounded-md'
                )}
              >
                {todoTasks?.map(task => (
                  <EditTaskModal
                    task={task}
                    modalTriggerElement={<TaskItem task={task} />}
                    key={task.id}
                  />
                ))}
              </div>
            </div>
            <div className="w-[280px] flex-shrink-0 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <div className="w-[15px] h-[15px] rounded-full bg-[#67e2ae]" />
                <div className="font-bold">Doing ({doingTasks?.length})</div>
              </div>
              <div
                className={cn(
                  'h-full flex flex-col gap-5',
                  !doingTasks?.length && 'border-dashed border-[2px] border-[#626262] rounded-md'
                )}
              >
                {doingTasks?.map(task => (
                  <EditTaskModal
                    task={task}
                    modalTriggerElement={<TaskItem task={task} />}
                    key={task.id}
                  />
                ))}
              </div>
            </div>
            <div className="w-[280px] flex-shrink-0 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <div className="w-[15px] h-[15px] rounded-full bg-[#8471f2]" />
                <div className="font-bold">Done ({doneTasks?.length})</div>
              </div>
              <div
                className={cn(
                  'h-full flex flex-col gap-5',
                  !doneTasks?.length && 'border-dashed border-[2px] border-[#626262] rounded-md'
                )}
              >
                {doneTasks?.map(task => (
                  <EditTaskModal
                    task={task}
                    modalTriggerElement={<TaskItem task={task} />}
                    key={task.id}
                  />
                ))}
              </div>
            </div>
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
    </div>
  );
};

export default Board;
