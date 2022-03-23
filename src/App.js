import "./App.css";
import React, { useState, useRef } from "react";
import TodosHeader from "./Components/TodosHeader";
import TodosList from "./Components/TodosList";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, todos) => {
    const create_date = new Date().getTime();
    const newData = {
      author,
      todos,
      create_date,
      id: dataId.current,
    };

    dataId.current += 1;

    setData([newData, ...data]);
  };

  const onRemove = (id) => {
    const newTodoLists = data.filter((item) => item.id !== id);

    setData(newTodoLists);

    console.log("success delete");
  };

  const onEdit = (targetId, newTodo) => {
    const newTodoLists = data.map((item) =>
      item.id === targetId ? { ...item, todos: newTodo } : item
    );

    setData(newTodoLists);
  };
  return (
    <div className="todos-container">
      <TodosHeader onCreate={onCreate} />
      <TodosList onEdit={onEdit} onRemove={onRemove} todosList={data} />
    </div>
  );
}

export default App;
