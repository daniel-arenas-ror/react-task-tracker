import type { Task } from '../../types/Task';
import { styles } from './TaskItem.styles';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <li style={styles.listItem}>
      <div style={styles.textContainer}>
        <p style={styles.description}>
          {task.description}
        </p>
      </div>
    </li>
  )
}

export default TaskItem;
