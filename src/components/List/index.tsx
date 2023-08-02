import { EmptyList } from "../EmptyList";
import styles from "./List.module.css";
import { Task } from "../Task";


interface ListProps {
  tasks: Task[];
  deleteTask: (task: Task) => void;
  completeTask: (task: Task) => void;
  completedTasks: number;
}

export function List({ 
  tasks, 
  deleteTask,
  completedTasks,
  completeTask 
}: ListProps) {
  
  return (
    <div className={styles.list}>
      <div className={styles.tasksCount}>
        <strong className={styles.createdTasks}>
          Tarefas criadas {' '}
          <span>{tasks.length}</span>
        </strong>
        <strong className={styles.completedTasks}>
          Concluídas {' '}
          <span>
            { 
              tasks.length === 0 
              ? tasks.length 
              : `${completedTasks} de ${tasks.length}`
            }
          </span>
        </strong>
      </div>
      <div className={styles.tasksContainer}>
        {
          tasks.length === 0
          ? <EmptyList /> 
          : tasks.map((task) => (
            <Task 
              key={task.id} 
              task={task} 
              deleteTask={deleteTask} 
              completeTask={completeTask}
            />
          ))
        }
      </div>
    </div>
  )
}