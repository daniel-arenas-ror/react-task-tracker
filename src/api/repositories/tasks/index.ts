import connector from "../../connector";
import type { Task, NewTaskData } from "../../../types/Task";

export const fetchTasks = (): Promise<Task[]> => {
  return connector.get('/tasks') as Promise<Task[]>;
};

export const createTask = (taskData: NewTaskData): Promise<Task> => {
  return connector.post('/tasks', { task: taskData }) as Promise<Task>;
};
