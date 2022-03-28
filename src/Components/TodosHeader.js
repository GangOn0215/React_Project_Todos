import React, { useState, useRef, useEffect, useContext } from "react";
import {TodosDispatchContext} from '../App';

const TodosHeader = () => {
  const {onCreate} = useContext(TodosDispatchContext);
  useEffect(() => {
    console.log("Rerender :: TodoHeader");
  });

  const inputAuthor = useRef();
  const inputTodos = useRef();

  const [state, setState] = useState({
    author: "",
    todos: "",
    importance: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 3) {
      inputAuthor.current.focus();

      return;
    } else if (state.todos.length < 5) {
      inputTodos.current.focus();

      return;
    }

    onCreate(state.author, state.todos, state.importance);

    setState({
      author: "",
      todos: "",
      importance: 1,
    });
  };

  return (
    <div className="todos-header">
      <input
        ref={inputAuthor}
        id="author"
        name="author"
        value={state.author}
        onChange={handleChangeState}
        placeholder="author"
      />
      <input
        ref={inputTodos}
        name="todos"
        value={state.todos}
        onChange={handleChangeState}
        placeholder="todos"
      />
      <select
        name={"importance"}
        value={state.importance}
        onChange={handleChangeState}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default React.memo(TodosHeader);
