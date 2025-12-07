import type { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <li> {task.description} </li>
  )
}

export default TaskItem;
