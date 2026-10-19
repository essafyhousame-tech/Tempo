import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type Task = {
  id?: string;
  title: string;
  category: string;
  time: string;
  priority: string;
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (idOrTitle: string, currentCompleted?: boolean) => void;
  fetchTasks: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/tasks`;

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const addTask = async (task: Task) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task)
      });
      if (res.ok) {
        const newTask = await res.json();
        setTasks(prev => [newTask, ...prev]);
      }
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const toggleTask = async (idOrTitle: string, currentCompleted?: boolean) => {
    const isId = idOrTitle.length > 20; 
    setTasks(prev =>
      prev.map(task =>
        (isId ? task.id === idOrTitle : task.title === idOrTitle)
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    
    if (isId) {
      try {
        await fetch(`${API_URL}/${idOrTitle}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ completed: !currentCompleted })
        });
      } catch (err) {
        console.error("Failed to toggle task in DB", err);
      }
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
