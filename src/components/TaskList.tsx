import { useState, useEffect } from 'react';
import { fetchTasks, createTask } from '../api/repositories/tasks';
import type { Task, NewTaskData } from '../types/Task';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    setLoading(true);

    try {
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Is the Rails backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h1>📝 Task Tracker</h1>

      <hr />

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.id}</strong>: {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
