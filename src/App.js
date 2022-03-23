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

  return (
    <div className="todos-container">
      <TodosHeader onCreate={onCreate} />
      <TodosList todosList={data} />
    </div>
  );
}

export default App;
