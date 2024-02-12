import { renderHook } from "@testing-library/react";
import useTask from "./useTask";
import { TasksContext } from "../context/Tasks";
import { useState } from "react";
import ITask from "../interface/ITask";
import { act } from "react-dom/test-utils";

describe("addTask", () => {
    it("should receive alert if input 'task' is empty", () => {
        // Arrange
        const { result } = renderHook(() => useTask(), {
            wrapper: ({ children }: { children: React.ReactNode }) => {
                const [tasks, setTasks] = useState<ITask[]>([]);
                return (
                    <TasksContext.Provider value={{ tasks, setTasks }}>
                        {children}
                    </TasksContext.Provider>
                );
            },
        });

        const data: ITask = {
            id: 200,
            task: "",
        }
        const mockAlert = jest.fn();
        jest.spyOn(window, "alert").mockImplementation(mockAlert)

        //act
        act(() => result.current.addTask(data))

        //Assert
        expect(mockAlert).toHaveBeenCalled();
    })


    it("Should create task with successfuly", () => {
        
        // Arrange
        let taskList: ITask[] = [{
            id: 100,
            task: "Tarefa 1",
        }];
        const mockSetItem = jest.fn();

        const { result } = renderHook(() => useTask(), {
            wrapper: ({ children }: { children: React.ReactNode }) => {
                return (
                    <TasksContext.Provider value={{ tasks: taskList, setTasks: jest.fn((newTaskList: any) => {
                        taskList = newTaskList;
                    }) }}>
                        {children}
                    </TasksContext.Provider>
                );
            },
        });
        
        jest.spyOn(Storage.prototype, "setItem").mockImplementation(mockSetItem);

        const data: ITask = {
            id: 300,
            task: "Tarefa 2",
        } 

        // act
        act(() => result.current.addTask(data))

        // Assert
        expect(mockSetItem).toHaveBeenCalled();
        expect(taskList[taskList.length  - 1]).toEqual(data);

    })
})


describe("deleteTask", () => {
    it("Should delete task with sucessfuly", () => {
        // Arrange
        let taskList: ITask[] = [
            {id: 100, task: "Tarefa 1"},
            {id: 200, task: "Tarefa 2"},
            {id: 300, task: "Tarefa 3"}
        ];

        const mockSetItem = jest.fn()

        const { result } = renderHook(() => useTask(), {
            wrapper: ({ children }: { children: React.ReactNode }) => {
                return (
                    <TasksContext.Provider value={{ tasks: taskList, setTasks: jest.fn((newTaskList: any) => {
                        taskList = newTaskList;
                    }) }}>
                        {children}
                    </TasksContext.Provider>
                );
            },
        });
        
        jest.spyOn(Storage.prototype, "setItem").mockImplementation(mockSetItem);

        // act
        act(() => {
            result.current.deleteTask(200);
        })

        expect(mockSetItem).toHaveBeenCalled();
        expect(taskList).toHaveLength(2);



    })

    afterAll(() => {
        jest.clearAllMocks();
    })
})

