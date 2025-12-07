import { render, screen } from '@testing-library/react';
import TaskItem from '../../components/TaskItem';
import type { Task } from '../../types/Task';

const mockTask: Task = {
  id: 1,
  description: 'This is the description for the test task.',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe('TaskItem', () => {
  it('renders the task description in a list item', () => {
    render(<TaskItem task={mockTask} />);

    const taskElement = screen.getByText(mockTask.description);

    expect(taskElement).toBeInTheDocument();
    expect(taskElement.tagName).toBe('LI');
  });

  it('renders a different task description correctly', () => {
    const anotherTask: Task = {
      ...mockTask,
      id: 2,
      description: 'The second task needs to be checked.',
    };

    render(<TaskItem task={anotherTask} />);
    
    const taskElement = screen.getByText('The second task needs to be checked.');
    
    expect(taskElement).toBeInTheDocument();
  });
});
