import { DEFAULT_BOARD } from 'src/constants';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { Board, Task } from 'src/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BoardStore = {
  boards: Board[];
  activeBoardId: string;
  addNewTask: (activeBoardId: string, task: Task) => void;
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
    }),
    { name: 'kanban-state' }
  )
);
