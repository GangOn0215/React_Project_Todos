import "./App.css";
import React, { useState, useRef } from "react";
import TodosHeader from "./Components/TodosHeader";
import TodosList from "./Components/TodosList";
import LifeCycle from "./Study/LifeCycle";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, todos) => {
    const create_date = new Date().getTime();
    const newData = {
      author,
      todos,
      create_date,
      check: false,
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

  const onCheck = (targetId) => {
    const newTodoLists = data.map((item) =>
      item.id === targetId ? { ...item, check: !item.check } : item
    );

    setData(newTodoLists);
  };

  return (
    <div className="todos-container">
      <LifeCycle />
      <TodosHeader onCreate={onCreate} />
      <TodosList
        onCheck={onCheck}
        onEdit={onEdit}
        onRemove={onRemove}
        todosList={data}
      />
    </div>
  );
}

export default App;
