import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from '../TaskList';
import * as tasksApi from '../../api/repositories/tasks';
import type { Task } from '../../types/Task'; // Import the Task type

jest.mock('../../api/repositories/tasks');

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

jest.mock('../TaskItem', () => ({ task }: any) => <li data-testid="task-item">{task.title}</li>);

const mockedFetchTasks = tasksApi.fetchTasks as jest.MockedFunction<typeof tasksApi.fetchTasks>;
const mockedCreateTask = tasksApi.createTask as jest.MockedFunction<typeof tasksApi.createTask>;

const createMockTask = (id: number, description: string): Task => ({
  id,
  description,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

beforeEach(() => {
  jest.resetAllMocks();
});

test('shows loading state then renders tasks from fetchTasks', async () => {
  const tasks = [
    createMockTask(1, 'desc A'),
    createMockTask(2, 'desc B'),
  ];
  mockedFetchTasks.mockResolvedValue(tasks);

  render(<TaskList />);

  // initial loading message
  expect(screen.getByText(/Loading tasks.../i)).toBeInTheDocument();

  // wait for loading to finish and tasks to appear
  await waitFor(() => {
    expect(screen.queryByText(/Loading tasks.../i)).not.toBeInTheDocument();
  });

  // both mocked tasks should render via our mocked TaskItem (asserting against task.title)
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
  const existingTask = createMockTask(1, 'Existing Task');
  mockedFetchTasks.mockResolvedValue([existingTask]);

  // createTask will return the created task (must match the structure passed in mock TaskForm)
  const createdTask = createMockTask(2, 'Created from test');
  mockedCreateTask.mockResolvedValue(createdTask);

  render(<TaskList />);

  // wait until initial tasks have rendered
  await waitFor(() => expect(screen.queryByText(/Loading tasks.../i)).not.toBeInTheDocument());

  // click the mocked TaskForm button to simulate creation
  await userEvent.click(screen.getByTestId('mock-create-button'));

  // ensure createTask was called with the payload we provided in the mocked TaskForm
  await waitFor(() => {
    expect(mockedCreateTask).toHaveBeenCalledWith({
      description: 'Created from test',
    });
  });

  // the newly created task should be prepended (appear first)
  const items = screen.getAllByTestId('task-item').map((el) => el.textContent);
  expect(items[0]).toBe('New Task');
  expect(items).toContain('Existing Task'); // Ensure the original task is still there
  expect(items).toHaveLength(2); // Total of two tasks
});
