import rocket_logo from './assets/rocket.svg';
import styles from './App.module.css';

import './global.css'
import { PlusCircle } from '@phosphor-icons/react';
import { List } from './components/List';
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [completedTasks, setCompletedTasks] = useState(0);


  function createNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask: Task = {
      id: tasks.length + 1,
      content: newTaskContent,
      hasCompleted: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskContent("");
  }

  function handleChangeNewTaskContent(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskContent(event.target.value);
  }

  function handleNewTaskContentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório!");
  }

  function verifyQuantityOfCompletedTasks(tasksArray: Task[]) {
    const countCompletedTasks = tasksArray.reduce((count, task) => {
      if(task.hasCompleted) {
        count++;
      }

      return count;
    }, 0)

    setCompletedTasks(countCompletedTasks);
  }

  function deleteTask(taskToDelete: Task) {
    const newTaskArrayWithoutThatOne = tasks.filter(
      task => task.id !== taskToDelete.id
    );
    
    verifyQuantityOfCompletedTasks(newTaskArrayWithoutThatOne);
    setTasks(newTaskArrayWithoutThatOne);
  }

  function completeTask(taskCompleted: Task) {
    const newTaskArray = tasks.map(task => {
      if (task.id === taskCompleted.id) {
        return {
        ...task,
          hasCompleted: !task.hasCompleted,
        };
      }

      return task;
    });

    verifyQuantityOfCompletedTasks(newTaskArray);
    setTasks(newTaskArray);
  }

  return (
   <div>
    <div className={styles.header}>
      <img src={rocket_logo} alt="ToDo Logo" />
      <span>todo</span>
    </div>

    <div className={styles.main}>
      <form onSubmit={createNewTask} className={styles.inputContainer}>
        <input 
          name="content" 
          type="text"
          value={newTaskContent}
          placeholder="Adicione uma nova tarefa"
          onInvalid={handleNewTaskContentInvalid}
          onChange={handleChangeNewTaskContent}
          required
        />
        <button type="submit">
          Criar
          <PlusCircle size={20} weight="bold"/>
        </button>
      </form>
      <List
        tasks={tasks}
        completedTasks={completedTasks}
        deleteTask={deleteTask} 
        completeTask={completeTask}
      />
    </div>
   </div>
  )
}
