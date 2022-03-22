import React, { useState, useRef } from "react";

const TodosHeader = () => {
  const inputAuthor = useRef();
  const inputTodos = useRef();

  const [state, setState] = useState({
    author: "",
    todos: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      inputAuthor.current.focus();
    } else if (state.todos.length < 1) {
      inputTodos.current.focus();
    }

    console.log(state);
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
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default TodosHeader;
