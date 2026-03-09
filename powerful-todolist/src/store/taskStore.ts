import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Task, TaskCategory } from '../types';

// 自定义存储对象，处理 Date 对象的序列化/反序列化
const localStorageWithDates = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    
    const parsed = JSON.parse(str);
    // 将日期字符串转换回 Date 对象
    if (parsed.state?.tasks) {
      parsed.state.tasks = parsed.state.tasks.map((task: any) => ({
        ...task,
        createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      }));
    }
    return parsed;
  },
  
  setItem: (name: string, value: any) => {
    // 直接存储，zustand 会处理序列化
    localStorage.setItem(name, JSON.stringify(value));
  },
  
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

interface TaskState {
  tasks: Task[];
  currentFilter: TaskCategory | '全部';
  searchQuery: string;
  editingTaskId: string | null;
  
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  deleteTask: (id: string) => void;
  deleteCompletedTasks: () => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: TaskCategory | '全部') => void;
  setSearchQuery: (query: string) => void;
  setEditingTaskId: (id: string | null) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      currentFilter: '全部',
      searchQuery: '',
      editingTaskId: null,
      
      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: uuidv4(),
          createdAt: new Date(),
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },
      
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      
      updateTask: (id, updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        }));
      },
      
      toggleTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }));
      },
      
      deleteCompletedTasks: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.completed),
        }));
      },
      
      setFilter: (filter) => {
        set({ currentFilter: filter });
      },
      
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      setEditingTaskId: (id) => {
        set({ editingTaskId: id });
      },
    }),
    {
      name: 'taskstore-storage', // localStorage 的 key
      storage: createJSONStorage(() => localStorageWithDates),
    }
  )
);
