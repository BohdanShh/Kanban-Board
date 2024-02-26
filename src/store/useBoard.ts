import { DEFAULT_BOARD } from 'src/constants';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { Board, Task } from 'src/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BoardStore = {
  boards: Board[];
  activeBoardId: string;
  addNewTask: (activeBoardId: string, task: Task) => void;
  createNewBoard: (board: Board) => void;
  setActiveBoardId: (id: string) => void;
  deleteBoard: (id: string) => void;
};

export const useBoard = create<BoardStore>()(
  persist(
    (set, get) => ({
      boards: [DEFAULT_BOARD],
      activeBoardId: DEFAULT_BOARD.id,
      addNewTask: (activeBoardId, task) => {
        const activeBoard = getActiveBoard(get().boards, activeBoardId);
        activeBoard?.tasks.push(task);

        set({ boards: get().boards });
      },
      createNewBoard: board => {
        set({ boards: [...get().boards, board], activeBoardId: board.id });
      },
      setActiveBoardId: id => set({ activeBoardId: id }),
      deleteBoard: id =>
        set({
          activeBoardId: get().boards[0].id || '',
          boards: get().boards.filter(board => board.id !== id),
        }),
    }),
    { name: 'kanban-state' }
  )
);
