import { ChangeEvent, useState } from 'react';
import { getActiveBoard } from 'src/lib/getActiveBoard';
import { useBoard } from 'src/store/useBoard';
import { Board, Column } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

export const useEditBoardModal = () => {
  const { boards, activeBoardId, editActiveBoard } = useBoard(state => ({
    boards: state.boards,
    activeBoardId: state.activeBoardId,
    editActiveBoard: state.editActiveBoard,
  }));
  const activeBoard = getActiveBoard(boards, activeBoardId);

  const [name, setName] = useState<string>(activeBoard?.name || '');
  const [columns, setColumns] = useState<Column[]>(activeBoard?.columns || []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handleAddColumn = (): void => {
    setColumns(prev => [...prev, { name: '', tasks: [], id: uuidv4() }]);
  };

  const handleColumnNameChange = (event: ChangeEvent<HTMLInputElement>, id: string): void => {
    setColumns(prev => {
      return prev.map(column => {
        if (column.id !== id) return column;

        return { ...column, name: event.target.value };
      });
    });
  };

  const handleDeleteColumn = (columnId: string): (() => void) => {
    return () => setColumns(prev => prev.filter(column => column.id !== columnId));
  };

  const handleEditBoard = (): void => {
    if (activeBoard) {
      const updatedBoard: Board = {
        ...activeBoard,
        name,
        columns,
      };

      editActiveBoard(updatedBoard);
      setName('');
    }
  };

  return {
    name,
    columns,
    handleNameChange,
    handleAddColumn,
    handleColumnNameChange,
    handleDeleteColumn,
    handleEditBoard,
  };
};
