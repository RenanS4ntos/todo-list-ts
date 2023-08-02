import { Check, Trash } from "@phosphor-icons/react";
import styles from "./Task.module.css";

export interface Task {
  id: number;
  content: string;
  hasCompleted: boolean;
}

interface TaskProps {
  task: Task;
  deleteTask: (task: Task) => void;
  completeTask: (task: Task) => void;
}

export function Task({ task, deleteTask, completeTask }: TaskProps) {

  function handleDeleteTask() {
    deleteTask(task);
  }

  function handleCompleteTask() {
    completeTask(task);
  }

  return (
    <div className={styles.Task}>
      <div className={styles.content}>
        <button
          className={`${styles.radioButton} ${task.hasCompleted ? styles.radioButtonChecked : null }`}
          onClick={handleCompleteTask}
        >
          { task.hasCompleted ? <Check size={16} weight="bold" /> : null }
        </button>
        <p>{task.content}</p>
      </div>
      <button
        className={styles.deleteTaskButton}
        type="button"
        onClick={handleDeleteTask}
      >
        <Trash size={20}/>
      </button>
    </div>
  )
}