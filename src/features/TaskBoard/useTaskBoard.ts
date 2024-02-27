import { getActiveBoard } from 'src/lib/getActiveBoard';
import { useBoard } from 'src/store/useBoard';
import { Column } from 'src/types';

export const useTaskBoard = () => {
  const { boards, activeBoardId, sortTasksInOneColumn, sortTasksBetweenColumns } = useBoard(
    state => ({
      boards: state.boards,
      activeBoardId: state.activeBoardId,
      sortTasksInOneColumn: state.sortTasksInOneColumn,
      sortTasksBetweenColumns: state.sortTasksBetweenColumns,
    })
  );

  const activeBoard = getActiveBoard(boards, activeBoardId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceColumn = activeBoard?.columns.find(({ id }) => id === source.droppableId);
    const targetColumn = activeBoard?.columns.find(({ id }) => id === destination.droppableId);

    if (!sourceColumn || !targetColumn) return;

    if (sourceColumn === targetColumn) {
      const newTasks = sourceColumn.tasks.slice();
      const draggableTask = newTasks.find(({ id }) => id === draggableId);

      if (!draggableTask) return;

      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggableTask);

      const newColumn: Column = {
        ...sourceColumn,
        tasks: newTasks,
      };

      sortTasksInOneColumn(sourceColumn.id, newColumn);
    }

    const tasksFromSourceColumn = sourceColumn.tasks.slice();
    const draggableTask = tasksFromSourceColumn.find(({ id }) => id === draggableId);

    tasksFromSourceColumn.splice(source.index, 1);

    const updatedSourceColumn: Column = {
      ...sourceColumn,
      tasks: tasksFromSourceColumn,
    };

    const tasksFromTargetColumn = targetColumn.tasks.slice();

    if (!draggableTask) return;

    tasksFromTargetColumn.splice(destination.index, 0, draggableTask);

    const updatedTargetColumn: Column = {
      ...targetColumn,
      tasks: tasksFromTargetColumn,
    };

    sortTasksBetweenColumns(
      sourceColumn.id,
      targetColumn.id,
      updatedSourceColumn,
      updatedTargetColumn
    );
  };

  return { boards, activeBoard, handleDragEnd };
};
