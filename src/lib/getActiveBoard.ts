import { Board } from 'src/types';

export const getActiveBoard = (boards: Board[], activeBoardId: string): Board | null => {
  const activeBoard = boards.find(({ id }) => id === activeBoardId);

  if (!activeBoard) return null;

  return activeBoard;
};
