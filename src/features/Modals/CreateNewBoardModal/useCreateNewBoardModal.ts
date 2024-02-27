import { ChangeEvent, useState } from 'react';
import { useBoard } from 'src/store/useBoard';
import { Board, Column } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

export const useCreateNewBoardModal = () => {
  const [name, setName] = useState<string>('');
  const [columns, setColumns] = useState<Column[]>([{ name: '', tasks: [], id: uuidv4() }]);

  const createNewBoard = useBoard(state => state.createNewBoard);

  const handleBoardNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
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

  const handleCreateBoard = (): void => {
    const newBoard: Board = {
      name,
      columns,
      id: uuidv4(),
    };

    createNewBoard(newBoard);
    setName('');
    setColumns([{ name: '', tasks: [], id: uuidv4() }]);
  };

  return {
    name,
    columns,
    handleBoardNameChange,
    handleAddColumn,
    handleColumnNameChange,
    handleDeleteColumn,
    handleCreateBoard,
  };
};
