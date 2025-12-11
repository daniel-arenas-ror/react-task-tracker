import type { Task } from '../../types/Task';
import { styles } from './TaskItem.styles';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
const isDone = task.done;

const listItemStyle = {
    ...styles.listItem,
    ...(isDone ? styles.listItemDone : {}),
  };

  const textContainerStyle = {
    ...styles.textContainer,
    ...(isDone ? styles.textContainerDone : {}),
  };

  return (
    <li style={listItemStyle}>
      <div style={textContainerStyle}>
        <p style={styles.description}>
          {task.description}
        </p>
      </div>
    </li>
  )
}

export default TaskItem;
