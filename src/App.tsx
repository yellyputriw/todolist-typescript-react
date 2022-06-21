import React, { FC, useState, ChangeEvent } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./interface";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const deleteTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };
  return (
    <div className="App">
      <header>
        <div className="input-container">
          <input
            type="text"
            placeholder="Task ..."
            name="task"
            onChange={handleChange}
            value={task}
          />
          <input
            type="number"
            placeholder="Deadline (in days) ..."
            onChange={handleChange}
            name="deadline"
            value={deadline}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </header>
      <main>
        <section className="todo-list">
          {todoList.map((task: ITask, key: number) => {
            return <TodoTask key={key} task={task} deleteTask={deleteTask} />;
          })}
        </section>
      </main>
    </div>
  );
};

export default App;
