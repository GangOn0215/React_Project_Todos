import React, { useState, useRef } from "react";

const TodosHeader = ({ onCreate }) => {
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
    if (state.author.length < 3) {
      inputAuthor.current.focus();

      return;
    } else if (state.todos.length < 5) {
      inputTodos.current.focus();

      return;
    }

    onCreate(state.author, state.todos);

    setState({
      author: "",
      todos: "",
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
      <br />
      <input
        ref={inputTodos}
        name="todos"
        value={state.todos}
        onChange={handleChangeState}
        placeholder="todos"
      />
      <br />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default TodosHeader;
