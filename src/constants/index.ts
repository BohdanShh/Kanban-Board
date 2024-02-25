import { Board } from 'src/types';
import { Status } from 'src/types/enums';
import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_BOARD: Board = {
  name: 'Marketing Plan',
  columns: [Status.TODO, Status.DOING, Status.DONE],
  tasks: [
    {
      title: 'Plan Product Hunt launch',
      description: 'Implementing a daring launch at Product Hunt',
      id: uuidv4(),
      status: Status.DONE,
      subtasks: [
        { title: 'Find hunter', completed: false, id: uuidv4() },
        { title: 'Notify network', completed: false, id: uuidv4() },
      ],
    },
    {
      title: 'Write launch article to publish on multiple channels',
      description: 'Implementing a daring launch at Product Hunt',
      id: uuidv4(),
      status: Status.DOING,
      subtasks: [
        { title: 'Write article', completed: false, id: uuidv4() },
        { title: 'Publish on linkedin', completed: false, id: uuidv4() },
        { title: 'Publish on Medium', completed: false, id: uuidv4() },
      ],
    },
    {
      title: 'Share on Show HN',
      description: 'Implementing a daring launch at Product Hunt',
      id: uuidv4(),
      status: Status.DOING,
      subtasks: [
        { title: 'Draft out NH post', completed: false, id: uuidv4() },
        { title: 'Get feedback and refine', completed: false, id: uuidv4() },
        { title: 'Publish post', completed: false, id: uuidv4() },
      ],
    },
  ],
  id: uuidv4(),
};
