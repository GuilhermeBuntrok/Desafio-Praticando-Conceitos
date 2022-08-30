import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Tasks } from './components/Tasks';

const LOCAL_STORAGE_KEY = "todo:savedTasks";

export interface Itask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App(): JSX.Element {
  const [tasks, setTasks] = useState<Itask[]>([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function setTasksAndSave(newTasks: Itask[]) {
    setTasks(newTasks)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
      }
    ])
  }

  function deleteTaskById(taskId: string) {
    const newTask = tasks.filter((task) => task.id !== taskId)
    setTasksAndSave(newTask)
  }

  function toggleTaskCompletedByiD(taskId: string) {
    const newTasks = tasks.map((task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      } return task;

    }))
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header onAddTask={addTask} />
      <Tasks tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedByiD} />

    </>
  )
}
