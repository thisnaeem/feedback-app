import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '../types/task';    

type TaskStore = {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => 
        set((state) => ({
          tasks: [...state.tasks, {
            ...task,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          }],
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
); 