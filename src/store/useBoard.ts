import { DEFAULT_BOARD } from 'src/constants';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { Board, Task } from 'src/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BoardStore = {
  boards: Board[];
  activeBoardId: string;
  addNewTask: (activeBoardId: string, task: Task) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  createNewBoard: (board: Board) => void;
  setActiveBoardId: (id: string) => void;
  deleteActiveBoard: () => void;
  editActiveBoard: (name: string) => void;
};

export const useBoard = create<BoardStore>()(
  persist(
    (set, get) => ({
      boards: [DEFAULT_BOARD],
      activeBoardId: DEFAULT_BOARD.id,
      addNewTask: (activeBoardId, task) => {
        const boards = get().boards;
        const activeBoard = getActiveBoard(boards, activeBoardId);
        activeBoard?.tasks.push(task);

        set({ boards });
      },
      updateTask: (id: string, updatedTask: Task) => {
        const boards = get().boards;
        const activeBoard = getActiveBoard(boards, get().activeBoardId);

        if (activeBoard) {
          const updatedTasks = activeBoard.tasks.map(task => {
            return task.id === id ? updatedTask : task;
          });

          activeBoard.tasks = updatedTasks;

          set({ boards });
        }
      },
      deleteTask: id => {
        const boards = get().boards;
        const activeBoard = getActiveBoard(boards, get().activeBoardId);

        if (!activeBoard) return;

        activeBoard.tasks = activeBoard?.tasks.filter(task => task.id !== id);

        set({ boards });
      },
      createNewBoard: board => {
        set({ boards: [...get().boards, board], activeBoardId: board.id });
      },
      setActiveBoardId: id => set({ activeBoardId: id }),
      deleteActiveBoard: () => {
        const boards = get().boards;

        set({
          activeBoardId: boards[0].id || '',
          boards: boards.filter(board => board.id !== get().activeBoardId),
        });
      },
      editActiveBoard: (name: string) => {
        const boards = get().boards;
        const activeBoard = getActiveBoard(boards, get().activeBoardId);

        if (!activeBoard) return;

        const editedActiveBoard: Board = { ...activeBoard, name };

        set({
          boards: [...boards.filter(({ id }) => id !== get().activeBoardId), editedActiveBoard],
        });
      },
    }),
    { name: 'kanban-state' }
  )
);
