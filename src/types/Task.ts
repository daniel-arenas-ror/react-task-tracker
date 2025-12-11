export interface Task {
  id: number;
  done: boolean;
  description: string;
  created_at: string;
  updated_at: string;
}

// Type for the data submitted via the creation form
export interface NewTaskData {
  description: string;
  // We'll let the backend set the status, but include other required fields
}
