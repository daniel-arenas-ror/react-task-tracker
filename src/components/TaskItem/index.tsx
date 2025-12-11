import React, { useState } from 'react';
import type { Task } from '../../types/Task';
import { styles } from './TaskItem.styles';

interface TaskItemProps {
  task: Task;
  updateDoneStatus: (taskId: number, done: boolean) => void;
  handleTaskDeleted: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, updateDoneStatus, handleTaskDeleted }) => {
  const [isHovering, setIsHovering] = useState(false);

  const isDone = task.done;

  const listItemStyle = {
    ...styles.listItem,
    ...(isDone ? styles.listItemDone : {}),
  };

  const textContainerStyle = {
    ...styles.textContainer,
    ...(isDone ? styles.textContainerDone : {}),
  };

  const deleteButtonStyle = {
    ...styles.deleteButton,
    ...(isHovering ? styles.deleteButtonHover : {}),
  };

  const handleDeleteClick = () => {
    handleTaskDeleted(task.id);
  };

  const handleUpdateClick = () => {
    updateDoneStatus(task.id, !task.done);
  };

  return (
    <li style={listItemStyle}>
      <div onClick={handleUpdateClick} style={textContainerStyle}>
        <p style={styles.description}>
          {task.description}
        </p>
      </div>

      <div style={styles.actionsContainer}>
        <button
          style={deleteButtonStyle}
          onClick={handleDeleteClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          title="Delete Task"
        >
          🗑️
        </button>
      </div>
    </li>
  )
}

export default TaskItem;
