import React, { useState } from 'react';
import type { FormEvent } from 'react';
import type { NewTaskData } from '../../types/Task';
import { styles } from './TaskForm.styles';
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

  const buttonStyle = {
    ...styles.button,
    ...(isSubmitting ? styles.buttonDisabled : {}),
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description here..."
        required
        disabled={isSubmitting}
        style={styles.input}
      />
      <button 
        type="submit" 
        disabled={isSubmitting || !description.trim()}
        style={buttonStyle}
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}

export default TaskForm;
