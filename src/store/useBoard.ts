import { DEFAULT_BOARD } from 'src/constants';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { Board, Column, Task } from 'src/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BoardStore = {
  boards: Board[];
  activeBoardId: string;
  addNewTask: (task: Task) => void;
  updateTask: (columnId: string, taskId: string, updatedTask: Task) => void;
  deleteTask: (task: Task) => void;
  reorderTasks: (columnId: string, updatedColumn: Column) => void;
  createNewBoard: (board: Board) => void;
  setActiveBoardId: (boardId: string) => void;
  deleteActiveBoard: () => void;
  editActiveBoard: (name: string) => void;
};

export const useBoard = create<BoardStore>()(
  persist(
    (set, get) => ({
      boards: [DEFAULT_BOARD],
      activeBoardId: DEFAULT_BOARD.id,
      addNewTask: task => {
        const { boards, activeBoardId } = get();
        const activeBoard = getActiveBoard(boards, activeBoardId);
        const column = activeBoard?.columns.find(({ name }) => name === task.status);

        if (column) {
          column.tasks.push(task);

          set({ boards });
        }
      },
      updateTask: (columnId, taskId, updatedTask) => {
        const { boards, activeBoardId } = get();
        const activeBoard = getActiveBoard(boards, activeBoardId);
        const currentColumn = activeBoard?.columns.find(column => column.id === columnId);

        if (currentColumn) {
          const newColumn = activeBoard?.columns.find(column => column.name === updatedTask.status);

          if (updatedTask.status !== currentColumn.name && newColumn) {
            currentColumn.tasks = currentColumn.tasks.filter(task => task.id !== taskId);

            newColumn.tasks.push(updatedTask);
          } else {
            const index = currentColumn.tasks.findIndex(task => task.id === taskId);

            if (index !== -1) {
              currentColumn.tasks[index] = updatedTask;
            }
          }

          set({ boards });
        }
      },
      deleteTask: task => {
        const { boards, activeBoardId } = get();
        const activeBoard = getActiveBoard(boards, activeBoardId);
        const column = activeBoard?.columns.find(({ name }) => name === task.status);

        if (column) {
          column.tasks = column.tasks.filter(({ id }) => id !== task.id);

          set({ boards });
        }
      },
      reorderTasks: (columnId, updatedColumn) => {
        const { boards, activeBoardId } = get();
        const activeBoard = getActiveBoard(boards, activeBoardId);

        if (activeBoard) {
          const columnIndex = activeBoard.columns.findIndex(({ id }) => id === columnId);

          if (columnIndex !== -1) {
            activeBoard.columns.splice(columnIndex, 1, updatedColumn);

            set({
              boards: boards.map(board => (board.id === activeBoardId ? activeBoard : board)),
            });
          }
        }
      },
      createNewBoard: board => {
        set({ boards: [...get().boards, board], activeBoardId: board.id });
      },
      setActiveBoardId: boardId => set({ activeBoardId: boardId }),
      deleteActiveBoard: () => {
        const { boards, activeBoardId } = get();

        set({
          activeBoardId: boards[0].id || '',
          boards: boards.filter(board => board.id !== activeBoardId),
        });
      },
      editActiveBoard: (name: string) => {
        const { boards, activeBoardId } = get();
        const activeBoard = getActiveBoard(boards, activeBoardId);

        if (activeBoard) {
          const editedActiveBoard: Board = { ...activeBoard, name };

          set({
            boards: [...boards.filter(({ id }) => id !== activeBoardId), editedActiveBoard],
          });
        }
      },
    }),
    { name: 'kanban-state' }
  )
);
