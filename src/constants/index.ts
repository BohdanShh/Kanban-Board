import { Board } from 'src/types';
import { Status } from 'src/types/enums';
import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_BOARD: Board = {
  name: 'Platform Launch',
  columns: [Status.TODO, Status.DOING, Status.DONE],
  tasks: [
    {
      title: 'Build UI for onboarding flow',
      description: '',
      id: uuidv4(),
      status: Status.TODO,
      subtasks: [
        { title: 'Sign up page', completed: true, id: uuidv4() },
        { title: 'Sign in page', completed: false, id: uuidv4() },
        { title: 'Welcome page', completed: false, id: uuidv4() },
      ],
    },
    {
      title: 'Build UI for search',
      description: '',
      id: uuidv4(),
      status: Status.TODO,
      subtasks: [{ title: 'Search page', completed: false, id: uuidv4() }],
    },
    {
      title: 'QA and test all major user journeys',
      description:
        'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
      id: uuidv4(),
      status: Status.TODO,
      subtasks: [
        { title: 'Internal testing', completed: false, id: uuidv4() },
        { title: 'External testing', completed: false, id: uuidv4() },
      ],
    },
    {
      title: 'Add account management endpoints',
      description: '',
      id: uuidv4(),
      status: Status.TODO,
      subtasks: [
        { title: 'Upgrade plan', completed: true, id: uuidv4() },
        { title: 'Cancel plan', completed: true, id: uuidv4() },
        { title: 'Update payment method', completed: true, id: uuidv4() },
      ],
    },
    {
      title: 'Design settings and search pages',
      description: '',
      id: uuidv4(),
      status: Status.DOING,
      subtasks: [
        { title: 'Settings - Account page', completed: true, id: uuidv4() },
        { title: 'Settings - Billing page', completed: true, id: uuidv4() },
        { title: 'Search page', completed: false, id: uuidv4() },
      ],
    },
    {
      title: 'Design onboarding flow',
      description: '',
      id: uuidv4(),
      status: Status.DOING,
      subtasks: [
        { title: 'Sign up page', completed: true, id: uuidv4() },
        { title: 'Sign in page', completed: false, id: uuidv4() },
        { title: 'Welcome page', completed: false, id: uuidv4() },
      ],
    },
    {
      title: 'Add search endpoints',
      description: '',
      id: uuidv4(),
      status: Status.DOING,
      subtasks: [
        { title: 'Add search endpoint', completed: false, id: uuidv4() },
        { title: 'Define search filters', completed: false, id: uuidv4() },
      ],
    },
    {
      title: 'Add authentication endpoints',
      description: '',
      id: uuidv4(),
      status: Status.DOING,
      subtasks: [
        { title: 'Define user model', completed: true, id: uuidv4() },
        { title: 'Add auth endpoints', completed: false, id: uuidv4() },
      ],
    },
    {
      title: 'Research pricing points of various competitors and trial different business models',
      description:
        'We know what we are planning to build for version one. Now we need to finalize the first pricing model we will use. Keep iterating the subtasks until we have a coherent proposition.',
      id: uuidv4(),
      status: Status.DOING,
      subtasks: [
        { title: 'Research competitor pricing and business models', completed: true, id: uuidv4() },
        {
          title: 'Outline a business model that works for our solution',
          completed: false,
          id: uuidv4(),
        },
        {
          title:
            'Talk to potential customers about our proposed solution and ask for fair price expectancy',
          completed: false,
          id: uuidv4(),
        },
      ],
    },
    {
      title: 'Conduct 5 wireframe tests',
      description:
        'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
      id: uuidv4(),
      status: Status.DONE,
      subtasks: [{ title: 'Complete 5 wireframe prototype tests', completed: true, id: uuidv4() }],
    },
    {
      title: 'Create wireframe prototype',
      description:
        'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
      id: uuidv4(),
      status: Status.DOING,
      subtasks: [
        {
          title: 'Create clickable wireframe prototype in Balsamiq',
          completed: true,
          id: uuidv4(),
        },
      ],
    },
    {
      title: 'Review results of usability tests and iterate',
      description:
        'Keep iterating through the subtasks until we are clear on the core concepts for the app.',
      id: uuidv4(),
      status: Status.DONE,
      subtasks: [
        {
          title: 'Meet to review notes from previous tests and plan changes',
          completed: true,
          id: uuidv4(),
        },
        {
          title: 'Make changes to paper prototypes',
          completed: true,
          id: uuidv4(),
        },
        {
          title: 'Conduct 5 usability tests',
          completed: true,
          id: uuidv4(),
        },
      ],
    },
    {
      title: 'Create paper prototypes and conduct 10 usability tests with potential customers',
      description: '',
      id: uuidv4(),
      status: Status.DONE,
      subtasks: [
        {
          title: 'Create paper prototypes for version one',
          completed: true,
          id: uuidv4(),
        },
        {
          title: 'Complete 10 usability tests',
          completed: true,
          id: uuidv4(),
        },
      ],
    },
    {
      title: 'Market discovery',
      description:
        'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
      id: uuidv4(),
      status: Status.DONE,
      subtasks: [
        {
          title: 'Interview 10 prospective customers',
          completed: true,
          id: uuidv4(),
        },
      ],
    },
    {
      title: 'Competitor analysis',
      description: '',
      id: uuidv4(),
      status: Status.DONE,
      subtasks: [
        {
          title: 'Find direct and indirect competitors',
          completed: true,
          id: uuidv4(),
        },
        {
          title: 'SWOT analysis for each competitor',
          completed: true,
          id: uuidv4(),
        },
      ],
    },
    {
      title: 'Research the market',
      description:
        'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
      id: uuidv4(),
      status: Status.DONE,
      subtasks: [
        {
          title: 'Write up research analysis',
          completed: true,
          id: uuidv4(),
        },
        {
          title: 'Calculate TAM',
          completed: true,
          id: uuidv4(),
        },
      ],
    },
  ],
  id: uuidv4(),
};
