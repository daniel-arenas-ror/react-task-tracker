import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/repositories/tasks';
import type { Task, NewTaskData } from '../types/Task';
import { styles } from './TaskList.styles';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Spinner from './Spinner';
import Footer from './Footer';

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

  const handleTaskCreated = async (taskData: NewTaskData) => {
    try {
      const createdTask = await createTask(taskData);
      setTasks([createdTask, ...tasks]); 

      setError(null);
    } catch (err) {
      console.error("Error creating task:", err);
      setError('Failed to create task. Please try again.');
      throw err;
    }
  };

  const updateDoneStatus = async (taskId: number, done: boolean) => {
    const taskUpdate = await updateTask(taskId, { done });
    setTasks(tasks.map(t => t.id === taskId ? taskUpdate : t));
  };

  const handleTaskDeleted = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError('Failed to delete task. Please try again.');
    }
  }

  return (
    <div style={styles.outerContainer}>
      <div style={styles.appContainer}>
        <h1>📝 Task Tracker</h1>

        <TaskForm onTaskCreated={handleTaskCreated} />
        <hr style={styles.divider} />

        {error && <p style={styles.errorMessage}>Error: {error}</p>}

        {loading ? (
          <Spinner />
        ) : (
          <ul style={styles.taskList}>
            {tasks.length === 0 ? (
              <p style={styles.noTasksMessage}>
                🎉 You don't have any tasks! Time to create one.
              </p>
            ) : (
              tasks.map(task => (
                <TaskItem key={task.id} task={task} updateDoneStatus={updateDoneStatus} handleTaskDeleted={handleTaskDeleted} />
              ))
            )}
          </ul>
        )}
        <Footer />
      </div>
    </div>
  )
}
