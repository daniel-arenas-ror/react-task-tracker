import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from '../TaskList';
import * as tasksApi from '../../api/repositories/tasks';

jest.mock('../../api/repositories/tasks');

// Mock TaskForm to expose a button that calls onTaskCreated when clicked.
// This lets tests simulate task creation without depending on TaskForm implementation.
jest.mock('../TaskForm', () => (props: any) => {
  return (
    <button
      data-testid="mock-create-button"
      onClick={() =>
        props.onTaskCreated({ title: 'New Task', description: 'Created from test' })
      }
    >
      Create task (mock)
    </button>
  );
});

// Mock TaskItem to render a simple li containing the task title.
jest.mock('./TaskItem', () => ({ task }: any) => <li data-testid="task-item">{task.title}</li>);

const mockedFetchTasks = tasksApi.fetchTasks as jest.MockedFunction<typeof tasksApi.fetchTasks>;
const mockedCreateTask = tasksApi.createTask as jest.MockedFunction<typeof tasksApi.createTask>;

beforeEach(() => {
  jest.resetAllMocks();
});

test('shows loading state then renders tasks from fetchTasks', async () => {
  mockedFetchTasks.mockResolvedValue([
    { id: 1, description: 'desc A', created_at: '', updated_at: '' },
    { id: 2, description: 'desc B', created_at: '', updated_at: '' },
  ]);

  render(<TaskList />);

  // initial loading message
  expect(screen.getByText(/Loading tasks.../i)).toBeInTheDocument();

  // wait for loading to finish and tasks to appear
  await waitFor(() => {
    expect(screen.queryByText(/Loading tasks.../i)).not.toBeInTheDocument();
  });

  // both mocked tasks should render via our mocked TaskItem
  expect(screen.getByText('Task A')).toBeInTheDocument();
  expect(screen.getByText('Task B')).toBeInTheDocument();
  expect(mockedFetchTasks).toHaveBeenCalledTimes(1);
});

test('shows error message when fetchTasks fails', async () => {
  mockedFetchTasks.mockRejectedValue(new Error('Network error'));

  render(<TaskList />);

  await waitFor(() => {
    expect(screen.getByText(/Failed to load tasks. Is the Rails backend running\?/i)).toBeInTheDocument();
  });

  expect(mockedFetchTasks).toHaveBeenCalledTimes(1);
});

test('when TaskForm triggers onTaskCreated, createTask is called and new task is prepended', async () => {
  // initial tasks
  mockedFetchTasks.mockResolvedValue([{ id: 1, description: 'x', created_at: '', updated_at: '' }]);

  // createTask will return the created task
  mockedCreateTask.mockResolvedValue({ id: 2, description: 'Created from test', created_at: '', updated_at: '' });

  render(<TaskList />);

  // wait until initial tasks have rendered
  await waitFor(() => expect(screen.queryByText(/Loading tasks.../i)).not.toBeInTheDocument());

  // click the mocked TaskForm button to simulate creation
  userEvent.click(screen.getByTestId('mock-create-button'));

  // ensure createTask was called with the payload we provided in the mocked TaskForm
  await waitFor(() => {
    expect(mockedCreateTask).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'Created from test',
    });
  });

  // the newly created task should be prepended (appear first)
  const items = screen.getAllByTestId('task-item').map((el) => el.textContent);
  expect(items[0]).toBe('New Task');
  expect(items).toContain('Existing Task');
});
