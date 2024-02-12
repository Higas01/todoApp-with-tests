import { useContext } from "react";
import ITask from "../interface/ITask";
import { TasksContext } from "../context/Tasks";

const useTask = () => {
    const {tasks, setTasks} = useContext(TasksContext);

    const addTask = (data: ITask): void => {
        if(!data.task) {
        alert("Preencha o campo com alguma tarefa!");
        return; 
        }
        const newTaskList: ITask[] = [... tasks, data];
        setTasks(newTaskList);
        localStorage.setItem("tasks", JSON.stringify(newTaskList));
    }

    const deleteTask = (id: number) => {
        const newTaskList = tasks.filter(data => data.id !== id);
        setTasks(newTaskList);
        localStorage.setItem("tasks", JSON.stringify(newTaskList));
    }

    return {
        addTask,
        deleteTask
    }

}


export default useTask;