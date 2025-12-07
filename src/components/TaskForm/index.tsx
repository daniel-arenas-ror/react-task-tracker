import React, { useState } from 'react';
import type { FormEvent } from 'react';
import type { NewTaskData } from '../../types/Task';

interface TaskFormProps {
  onTaskCreated: (data: NewTaskData) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!description.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const taskData: NewTaskData = {
      description: description.trim(),
    };

    try {
      // Call the function passed down from the parent (TaskList)
      await onTaskCreated(taskData);
      setDescription(''); // Clear the input on success
    } catch (error) {
      // Error handling is delegated back to the parent component/API call
      console.error('Task creation failed in form:', error);
      // We could add local state to show an error message here if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description here..."
        required
        disabled={isSubmitting}
      />
      <button 
        type="submit" 
        disabled={isSubmitting || !description.trim()}
        style={{ padding: '10px 15px', fontSize: '16px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none' }}
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}

export default TaskForm;
