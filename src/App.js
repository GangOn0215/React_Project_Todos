import "./App.css";
import React, {useEffect, useState, useRef} from "react";
import axios from 'axios';
import TodosHeader from "./Components/TodosHeader";
import TodosList from "./Components/TodosList";
import LifeCycle from "./Study/LifeCycle";

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const url = 'https://jsonplaceholder.typicode.com/comments';
  const getData = async () => {
    const getFakeJsonData = await axios(url).then((res) => res.data);

    const processedData = getFakeJsonData.slice(0, 19).map((item) => {
      return {
        author: item.email,
        todos: item.body,
        create_date: new Date().getTime(),
        id: dataId.current++
      }
    });
    
    setData(processedData);
  }

  useEffect(() => {
    getData();
  }, [])

  const onCreate = (author, todos) => {
    const create_date = new Date().getTime();
    const newData = {
      author,
      todos,
      create_date,
      check: false,
      id: dataId.current
    };

    dataId.current += 1;

    setData([
      newData,
      ...data
    ]);
  };

  const onRemove = (id) => {
    const newTodoLists = data.filter((item) => item.id !== id);

    setData(newTodoLists);

    console.log("success delete");
  };

  const onEdit = (targetId, newTodo) => {
    const newTodoLists = data.map((item) => item.id === targetId ? {
      ...item,
      todos: newTodo
    } : item);

    setData(newTodoLists);
  };

  const onCheck = (targetId) => {
    const newTodoLists = data.map((item) => item.id === targetId ? {
      ...item,
      check: !item.check
    } : item);

    setData(newTodoLists);
  };

  return (
    <div className="todos-container">
      <LifeCycle/>
      <TodosHeader onCreate={onCreate}/>
      <TodosList onCheck={onCheck}
        onEdit={onEdit}
        onRemove={onRemove}
        todosList={data}/>
    </div>
  );
}

export default App;
