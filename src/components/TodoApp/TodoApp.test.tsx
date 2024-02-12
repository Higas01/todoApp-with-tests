import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import TodoApp from "./TodoApp";
import ITask from "../../interface/ITask";
import { TasksContext } from "../../context/Tasks";
import useTask from "../../hooks/useTask";


jest.mock('../Button/Button.tsx', () => {
    return ({ children, onClick }: {children: React.ReactNode, onClick: () => void}) => (
      <button onClick={onClick}>{children}</button>
    );
  });

  jest.spyOn(window, "alert").mockImplementation(() => jest.fn());

describe("TodoApp", () => {
    it("should correctly render 'taskList' when entering the page", () => { 
        // Arrange
        let taskList: ITask[] = [];
        const localStorageTaskList: ITask[] = [
            {id: 100, task: "tarefa 1"},
            {id: 200, task: "tarefa 2"},
            {id: 300, task: "tarefa 3"},
        ] 


        const mockGetItems = jest.fn(() => {
            if (localStorageTaskList.length > 0) {
               taskList = localStorageTaskList;
            }
            return JSON.stringify(taskList);
        });

        jest.spyOn(React, "useEffect").mockImplementation(callback => callback());
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation(mockGetItems);
        // act
       const {getByText} = render(
       <TasksContext.Provider value={{tasks: taskList, setTasks: jest.fn((newTaskList: any) => taskList = newTaskList)}}>
       <TodoApp/>
       </TasksContext.Provider>
       );

       // Assert
       waitFor(() => {
        expect(taskList).toHaveLength(3);
        expect(taskList).toEqual(localStorageTaskList); 
       expect(getByText("tarefa 1")).toBeInTheDocument()
       })
 })


    it("should call 'handleSubmit' correctly", () => {
        // Arrange
        let taskList: ITask[] = [];
        const mockAddTask = jest.fn((task: ITask) => {
            const newTaskList: ITask[] = [...taskList, task];
            taskList = newTaskList;
        });

        
        const {getByText} = render(
            <TasksContext.Provider value={{tasks: taskList, setTasks: jest.fn((newTaskList: any) => taskList = newTaskList)}}>
            <TodoApp/>
            </TasksContext.Provider>
            );

            waitFor(() => {
                jest.spyOn(useTask(), "addTask").mockImplementationOnce(mockAddTask);
            })
            const addButton = getByText("Adicionar");
            // act
            fireEvent.click(addButton);

            // Assert
            waitFor(() => {
                expect(taskList).toHaveLength(1);
                expect(mockAddTask).toHaveBeenCalled();
   
            })

    })

    it("should call 'handleRemove' correctly", () => {
        //Arrange
        let taskList: ITask[] = [
            {id: 100, task: "Tarefa 1"},
            {id: 200, task: "Tarefa 2"},
            {id: 300, task: "Tarefa 3"},
        ];

        const mockDeleteTask = jest.fn((id: number) => {
            const newTasks = taskList.filter(task => task.id !== id);
            taskList = newTasks;
        })

        const { getAllByText    } = render(
            <TasksContext.Provider value={{tasks: taskList, setTasks: jest.fn((newTaskList: any) => taskList = newTaskList)}}>
            <TodoApp/>
            </TasksContext.Provider>
            );

            waitFor(() => {
                jest.spyOn(useTask(), "deleteTask").mockImplementationOnce(mockDeleteTask);
            })
            // act
            fireEvent.click(getAllByText('Remover')[0]);

            // Assert
            waitFor(() => {
                expect(taskList).toHaveLength(2);
                expect(mockDeleteTask).toHaveBeenCalled();    
            })
          
    })

    
})