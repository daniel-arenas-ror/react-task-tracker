import React, { useState } from 'react';
import type { FormEvent } from 'react';
import type { NewTaskData } from '../../types/Task';

interface TaskFormProps {
  onTaskCreated: (data: NewTaskData) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {

  return (
    <form>
      <input
        type="text"
        placeholder="Enter task description here..."
        required
        style={{ flexGrow: 1, padding: '10px', fontSize: '16px', marginRight: '10px', border: '1px solid #ccc' }}
      />
    </form>
  )
}

export default TaskForm;
