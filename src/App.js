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

  const onDelete = (id) => {
    const newTodoLists = data.filter((item) => item.id !== id);

    setData(newTodoLists);

    console.log("success delete");
  };

  return (
    <div className="todos-container">
      <TodosHeader onCreate={onCreate} />
      <TodosList onDelete={onDelete} todosList={data} />
    </div>
  );
}

export default App;
