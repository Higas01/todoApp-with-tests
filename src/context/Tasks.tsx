import React, { createContext, useState } from 'react';
import ITask from '../interface/ITask';

interface TasksContextType {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
};
export const TasksContext = createContext<TasksContextType>({} as TasksContextType);

interface TasksProviderProps {
  children: React.ReactNode;
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  
  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};