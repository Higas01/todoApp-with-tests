import "./TodoApp.css"
import Button from '../Button/Button'
import Input from '../Input/Input'
import { FormEvent, useContext, useEffect, useState } from "react"
import useTask from "../../hooks/useTask"
import { TasksContext } from "../../context/Tasks"

const TodoApp = () => {
    const [task, setTask] = useState<string>("");
    const {     addTask, deleteTask    } = useTask();
    const {tasks, setTasks} = useContext(TasksContext);

    useEffect(() => {
        const tasks = localStorage.getItem("tasks");

        if (tasks) {
            setTasks(JSON.parse(tasks));
        }

    }, [])

        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const taskObj = {
            id: Math.floor(Math.random() * 1000),
            task,
        }
        addTask(taskObj)
        setTask("");           

    }

    const handleRemove = (id: number) => {
        deleteTask(id);

    }

       return (
        <div className="container">
        <form className="input-container" onSubmit={handleSubmit}>
        <Input value={task} setValue={setTask}>Digite sua tarefa:</Input>
        <Button background="green">Adicionar</Button>
        </form>
        <ul>
            {tasks.length > 0 && <>
                {tasks.map(task => (
                    <li key={task.id}>
                        <span>{task.task}</span>
                        <Button background="red" handleClick={() => handleRemove(task.id)}>Remover</Button>
                    </li>
                ))}
            </>}
        </ul>
        </div>
      )
}

export default TodoApp