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
  sortTasksInOneColumn: (columnId: string, updatedColumn: Column) => void;
  sortTasksBetweenColumns: (
    sourceColumnId: string,
    targetColumnId: string,
    updatedSourceColumn: Column,
    updatedTargetColumn: Column
  ) => void;
  createNewBoard: (board: Board) => void;
  setActiveBoardId: (boardId: string) => void;
  deleteActiveBoard: () => void;
  editActiveBoard: (board: Board) => void;
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
      sortTasksInOneColumn: (columnId, updatedColumn) => {
        const { boards, activeBoardId } = get();
        const activeBoard = getActiveBoard(boards, activeBoardId);

        if (activeBoard) {
          const columnIndex = activeBoard.columns.findIndex(({ id }) => id === columnId);

          activeBoard.columns.splice(columnIndex, 1, updatedColumn);

          set({ boards });
        }
      },
      sortTasksBetweenColumns: (
        sourceColumnId,
        targetColumnId,
        updatedSourceColumn,
        updatedTargetColumn
      ) => {
        const { boards, activeBoardId } = get();
        const activeBoard = getActiveBoard(boards, activeBoardId);

        if (activeBoard) {
          const sourceColumnIndex = activeBoard.columns.findIndex(
            ({ id }) => id === sourceColumnId
          );
          const targetColumnIndex = activeBoard.columns.findIndex(
            ({ id }) => id === targetColumnId
          );

          activeBoard.columns[sourceColumnIndex] = updatedSourceColumn;
          activeBoard.columns[targetColumnIndex] = updatedTargetColumn;

          set({ boards });
        }
      },
      createNewBoard: board => {
        set({ boards: [...get().boards, board], activeBoardId: board.id });
      },
      setActiveBoardId: boardId => set({ activeBoardId: boardId }),
      deleteActiveBoard: () => {
        const { boards, activeBoardId } = get();

        const newBoards = boards.filter(board => board.id !== activeBoardId);

        set({
          activeBoardId: newBoards.at(-1)?.id || '',
          boards: newBoards,
        });
      },
      editActiveBoard: board => {
        const { boards } = get();

        const newBoardColumns = board.columns.map(column => {
          return {
            ...column,
            tasks: column.tasks.map(task => ({ ...task, status: column.name })),
          };
        });

        board.columns = newBoardColumns;

        set({ boards: [...boards.filter(({ id }) => id !== board.id), board] });
      },
    }),
    { name: 'kanban-state' }
  )
);
